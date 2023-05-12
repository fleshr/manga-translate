from PIL import Image
import jaconv
import re
from transformers import BertJapaneseTokenizer, VisionEncoderDecoderModel, ViTImageProcessor, MarianMTModel, MarianTokenizer
from flask import Flask, request
from flask_cors import CORS
import json


class ImageToText:
    def __init__(self):
        self._model_name = "kha-white/manga-ocr-base"
        self._model = VisionEncoderDecoderModel.from_pretrained(
            self._model_name)
        self._tokenizer = BertJapaneseTokenizer.from_pretrained(
            self._model_name)
        self._image_processor = ViTImageProcessor.from_pretrained(
            self._model_name)

    def __call__(self, image):
        pixel_values = self._image_processor(
            image, return_tensors="pt").pixel_values
        generated_ids = self._model.generate(pixel_values)[0]
        generated_text = self._tokenizer.decode(
            generated_ids, skip_special_tokens=True)
        return self._normalize_text(generated_text)

    def _normalize_text(self, text):
        text = re.sub(r"\s+", '', text)
        text = jaconv.h2z(text, ascii=True, digit=True)
        return text


class Translate:
    def __init__(self):
        self._model_name = "Helsinki-NLP/opus-mt-ja-en"
        self._model = MarianMTModel.from_pretrained(self._model_name)
        self._tokenizer = MarianTokenizer.from_pretrained(self._model_name)

    def __call__(self, text):
        inputs = self._tokenizer(text, return_tensors="pt")
        generated_tokens = self._model.generate(**inputs)[0]
        text = self._tokenizer.decode(
            generated_tokens, skip_special_tokens=True)
        return text


img_to_txt = ImageToText()
translate = Translate()

app = Flask(__name__)
CORS(app)


@app.post("/")
def hello_world_post():
    image = Image.open(request.files['image']).convert('RGB')
    raw_text = img_to_txt(image)
    print(raw_text)
    translated_text = translate(raw_text)
    print(translated_text)
    result = {'rawText': raw_text, 'translatedText': translated_text}
    return json.dumps(result)
