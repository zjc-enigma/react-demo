#coding=utf-8
import sys
#reload(sys)
#sys.setdefaultencoding('UTF8')
from os import path
from flask import Flask
from flask import redirect
from flask import jsonify
from flask import url_for
from flask import send_from_directory, request, Response
from flask import render_template
import json, random
import re
from flask import make_response
from functools import wraps, update_wrapper
from datetime import datetime
from wtforms import Form, BooleanField, StringField, PasswordField, validators, IntegerField, FloatField
from flask_restful import Resource, Api, fields, marshal_with, reqparse
sys.path.append('../lib')
sys.path.append('/Users/Patrick/Git/')
from utils import myutils3
from data import random_select_titles
from data import search_title
from data import search_title_by_class
from data import random_select_ad
from data import label2value, value2label
from lib import word_by_ad
import pdb

import jieba.posseg as pseg


import gensim
word_model = gensim.models.Word2Vec.load_word2vec_format("../data/model2", binary=False)


app = Flask(__name__, static_folder="../static", template_folder="../templates")
api = Api(app)

#state = {}
# class HelloRestful(Resource):
#     def get(self, hi):
#         return {hi: "world"}

#     def put(self, hi):
#         state[hi] = request.json['hehe']
#         #request.form['hehe']
#         return state
#api.add_resource(HelloRestful, '/<string:hi>')

class SimWords(Resource):

    def post(self):
        """
        word: unicode format
        """

        sim_words = []
        try:
            base_word = request.json['base_word']

            for item in word_model.most_similar(base_word):
                sim_words.append(item[0])
        except Exception as e:
            print(e)

        print("sim words:", sim_words)
        return sim_words

api.add_resource(SimWords, '/simwords')


class Title(Resource):

    def get(self, num=10):
        # fake_titles = {
        # "body1":["123", "asdf", "njjjk"],
        # "body2":["sadf", "ioij", "vcxv"],
        # "body3":["123", "435", "909"]
        # }
        # fake_titles
        return random_select_titles(10)



api.add_resource(Title, '/rand_titles')

def write_csv(data_list, csv_path):
    wfd = open(csv_path, 'w')
    for item in data_list:
        wfd.write(item+"\n")

    wfd.close()


class Download(Resource):

    def post(self):
        sentence_list = request.json['sentences']
        print(sentence_list)
        #df.to_excel('/Users/Patrick/Git/react-demo/test.xlsx', sheet_name='sheet1', index=False)
        #print request
        write_csv(sentence_list, 'test.csv')
        return send_from_directory('.', 'test.csv')

api.add_resource(Download, '/download')

# for word, flag in words:
class TokenSentence(Resource):

    def post(self):
        res = []
        sentence_list = request.json['sentences']
        print(sentence_list)
        for sentence in sentence_list:
            tokened = []
            #tokened = myutils.tokenize_zh_line(sentence.decode('utf8'))
            words = pseg.cut(sentence.encode('utf-8'))
            for word, flag in words:
                tokened.append({"word": word, "flag": flag})
            print(sentence)
            print(type(sentence))
            print(tokened)
            res.append(tokened)

        return res

api.add_resource(TokenSentence, '/token')

class Search(Resource):

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('key', type=str)
        query = parser.parse_args()['key']

        return search_title(query)

    def post(self):
        query = request.json['key']
        return search_title(query)

api.add_resource(Search, '/query')

class SearchByClass(Resource):

    def post(self):
        query = request.json['key']
        try:
            selectionArray = request.json['class_name']
        except Exception as e:
            selectionArray = []

        class_name_list = []
        print("selectionArray", selectionArray)

        for item in selectionArray:
            print("item:", item, type(item))
            class_name_list.append(item['value'])

        return search_title_by_class(query, class_name_list)

api.add_resource(SearchByClass, '/query_by_class')


class ExportTextWithEntity(Resource):
    ''' example entity json:
    {'entityMap': {'0': {'mutability': 'SEGMENTED', 'data': {}, 'type': 'TOKEN'}}, 'blocks': [{'entityRanges': [{'offset': 23, 'length': 8, 'key': 0}], 'depth': 0, 'key': '7qct2', 'inlineStyleRanges': [], 'data': {}, 'text': '苹果iPhone输入法现“击沉中国”：真相彻底全方位|理性|每无语！', 'type': 'unstyled'}]}
    '''


    def _extract_entity_content(self, entity_text, entity_type):
        entity_word_list = entity_text.split('|')
        return entity_word_list


    def _update_text_with_content(self, origin_text_list, content_list, offset, length):

        updated_list = []
        for index, origin_text in enumerate(origin_text_list):
            for content in content_list:

                updated = origin_text[:offset] + content + origin_text[offset+length:]
                updated_list.append(updated)

        return updated_list



    def get(self):
        pass


    def post(self):
        raw_json = request.json['raw']
        print(raw_json)
        entity_map = raw_json['entityMap']

        for block in raw_json['blocks']:
            block_text = block['text']
            block_text_list = [ block_text ]

            entity_list = block['entityRanges']

            sorted_entity_list = sorted(entity_list, key=lambda x: x['offset'], reverse=True)

            for entity in sorted_entity_list:
                entity_offset = entity['offset']
                entity_length = entity['length']
                entity_text = block_text[entity_offset: entity_offset+entity_length]
                entity_type = entity_map[str(entity['key'])]['type']
                content_list = self._extract_entity_content(entity_text, entity_type)
                updated_list = self._update_text_with_content(block_text_list,
                                                              content_list,
                                                              entity_offset,
                                                              entity_length)
                block_text_list = updated_list

            print(block_text_list)

        return []


api.add_resource(ExportTextWithEntity, '/export_raw')

class MultiselectionOptions(Resource):

    def get(self):
        res = []
        label_list = label2value.keys()
        for label in label_list:
            res.append({"label":label, "value":label2value[label]})

        return res

api.add_resource(MultiselectionOptions, '/multiselect_options')

def nocache(view):
    @wraps(view)
    def no_cache(*args, **kwargs):
        response = make_response(view(*args, **kwargs))
        response.headers['Last-Modified'] = datetime.now()
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '-1'
        return response

    return update_wrapper(no_cache, view)


@app.route("/select_table") #for test
@app.route("/select_list") #for test
@app.route("/editor") #for test
@app.route("/result")
@app.route("/selection")
@app.route("/writer")
@app.route("/")
@nocache
def index():
    return render_template("index.html")


# @app.route("/restful")
# def restful():
#     aa = {"a": 123,
#           "b": "big"}
#     return json.dumps(aa)

# @app.route("/post", methods=['POST', 'GET'])
# def poste():
#     #form = RegistrationForm(request.form)
#     #form = RegistrationForm.fro
#     if request.method == 'POST':
#         pid = form.pid.data
#         return "form encoded :" +pid

#     return '{}'



if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=7777, threaded=True)

    
