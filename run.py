#coding=utf-8
import sys
from os import path
from flask import Flask
from flask import jsonify
from flask import send_from_directory, request, Response
from flask import render_template
import json, random
import re
app = Flask(__name__, static_folder="static", template_folder="templates")

@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")

