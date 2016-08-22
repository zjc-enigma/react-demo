#coding=utf-8
import sys
from os import path
from flask import Flask
from flask import jsonify
from flask import send_from_directory, request, Response
from flask import render_template
import json, random
import re
from flask import make_response
from functools import wraps, update_wrapper
from datetime import datetime
from wtforms import Form, BooleanField, StringField, PasswordField, validators, IntegerField, FloatField
from flask.ext.restful import Resource, Api, fields, marshal_with

class RegistrationForm(Form):
    pid = StringField('pid', [validators.DataRequired(), ])




app = Flask(__name__, static_folder="static", template_folder="templates")
api = Api(app)

state = {}

class HelloRestful(Resource):
    def get(self, hi):
        return {hi: "world"}

    def put(self, hi):

        state[hi] = request.json['hehe']
        #request.form['hehe']
        return state

api.add_resource(HelloRestful, '/<string:hi>')


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


@app.route("/")
@nocache
def index():
    return render_template("index.html")


@app.route("/restful")
def restful():
    aa = {"a": 123,
          "b": "big"}

    return json.dumps(aa)


@app.route("/post", methods=['POST', 'GET'])
def poste():
    #form = RegistrationForm(request.form)
    #form = RegistrationForm.fro
    if request.method == 'POST':
        pid = form.pid.data
        #print ":" + str(pid)
        return "form encoded :" +pid

    return '{}'



if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")

