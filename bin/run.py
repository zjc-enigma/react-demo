import sys
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
from data import all_classname_list
from data import class_name_remap
from data import flatten
from lib import word_by_ad
import pickle
import pdb
import pandas as pd

import jieba.posseg as pseg


import gensim
word_model = gensim.models.Word2Vec.load_word2vec_format("../data/model2", binary=False)
word_importance_model = pd.read_pickle("../data/res.plk")
industry_word_model = pd.read_csv("../data/words/class_dict", sep="\t", header=None)
industry_word_model.columns = ["classname", "word", "attr", "score"]

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



class SaveToCSV(Resource):

    def _flatten(self, items, ignore_types=(str, bytes)):
        """flatten a nested list

        test case:

        items = [1, 2, [3, 4, [5, 6], 7], 8]
        # Produces 1 2 3 4 5 6 7 8
        for x in flatten(items):
            print(x)

        items = ['Dave', 'Paula', ['Thomas', 'Lewis']]
            for x in flatten(items):
                print(x)


        """
        from collections import Iterable

        for x in items:
            if isinstance(x, Iterable) and not isinstance(x, ignore_types):
                yield from self._flatten(x)
            else:
                yield x



    def post(self):
        selected_res_data = list(self._flatten(request.json['selectedRes']))
        print("generate SaveToCsv:", selected_res_data)
        result_file_content = "\n".join(selected_res_data)

        return Response(result_file_content,
                        mimetype="text/plain",
                        headers={"Content-Disposition":
                                 "attachment;filename=result.txt"})

api.add_resource(SaveToCSV, '/save_to_csv')

class AllClassname(Resource):
    def get(self):
        return all_classname_list

api.add_resource(AllClassname, '/all_classname')


class SearchByClass(Resource):

    def post(self):
        query = request.json['key']
        try:
            classname_list = request.json['class_name']
        except Exception as e:
            classname_list = []

        print("classname_list", classname_list)

        return search_title_by_class(query, classname_list)

api.add_resource(SearchByClass, '/query_by_class')


class ExportTextWithEntity(Resource):
    ''' example entity json:
    {'entityMap': {'0': {'mutability': 'SEGMENTED', 'data': {}, 'type': 'TOKEN'}}, 'blocks': [{'entityRanges': [{'offset': 23, 'length': 8, 'key': 0}], 'depth': 0, 'key': '7qct2', 'inlineStyleRanges': [], 'data': {}, 'text': '苹果iPhone输入法现“击沉中国”：真相彻底全方位|理性|每无语！', 'type': 'unstyled'}]}
    '''


    def _extract_entity_content(self, entity_text, entity_mutability):
        if entity_mutability == "SEGMENTED":
            entity_word_list = entity_text.split('\\')
        else:
            entity_word_list = [entity_text]

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
                entity_mutability = entity_map[str(entity['key'])]['mutability']
                content_list = self._extract_entity_content(entity_text, entity_mutability)
                updated_list = self._update_text_with_content(block_text_list,
                                                              content_list,
                                                              entity_offset,
                                                              entity_length)
                block_text_list = updated_list

            print('generate res:', block_text_list)

        return block_text_list


api.add_resource(ExportTextWithEntity, '/export_raw')

class MultiselectionOptions(Resource):

    def get(self):
        res = []
        label_list = label2value.keys()
        for label in label_list:
            res.append({"label":label, "value":label2value[label]})

        return res

api.add_resource(MultiselectionOptions, '/multiselect_options')


class GetIndustryByClass(Resource):

    def get(self):
        pass


    def post(self):
        class_name = request.json['classname']
        print('recv class_name:', class_name)
        class_name = label2value[class_name]
        #industy_word_path = "../data/words/word_{name}".format(name=class_name)
        industry_df = industry_word_model.loc[
            industry_word_model.classname.str.contains(class_name)]

        word_list = list(flatten(industry_df[[1]].head(20).values.tolist()))

        return word_list

api.add_resource(GetIndustryByClass, '/industry_word_by_class')


class AllWordList(Resource):

    def get(self):
        pass

    def post(self):
        res = {}
        try:
            # get all sim words
            base_word = request.json['base_word']
            print('recv base word:', base_word)
            sim_list = []
            for item in word_model.most_similar(base_word):
                sim_list.append(item[0])
            res['sim'] = sim_list

            # get all important words
            class_name = request.json['classname']
            print('recv classname:', class_name)
            important_list = []
            for classname in class_name:
                remap_name = class_name_remap[classname]
                word_df = word_importance_model.ix[remap_name]
                important_list += list(flatten(word_df[[2]].head(20).values.tolist()))
            res['important'] = important_list

            # get all industry words
            industry_list = []
            for classname in class_name:
                value_name = label2value[classname]
                industry_df = industry_word_model.loc[
                industry_word_model.classname.str.contains(value_name)]
                industry_list += list(flatten(industry_df[[1]].head(20).values.tolist()))
            res['industry'] = industry_list

        except Exception as e:
            print(e)

        print("res words:", res)
        return res

api.add_resource(AllWordList, '/all_word_list')



class GetImportantWordByClass(Resource):

    def get(self):
        print("get important word")
        pass

    def post(self):
        class_name = request.json['classname']
        print('recv class_name:', class_name)
        class_name = class_name_remap[class_name]
        word_df = word_importance_model.ix[class_name]
        word_list = list(flatten(word_df[[2]].head(20).values.tolist()))

        return word_list

api.add_resource(GetImportantWordByClass, '/important_word_by_class')


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






@app.route("/generate_res_table") #for test
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

    
