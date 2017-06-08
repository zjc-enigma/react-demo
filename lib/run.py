#coding=utf-8
import sys
reload(sys)
sys.setdefaultencoding('UTF8')
sys.path.append('/Users/Patrick/Git')
from flask import Flask
from flask import send_from_directory, request, Response
from flask import render_template
import random
from data import random_select_titles
from data import random_select_ad
from search import SearchToutiao

import json



app = Flask(__name__, static_folder="../static", template_folder="../templates")


@app.route('/generate')
def search():

    keyword = request.args.get('inputword')
    print("looking up word: %s" % keyword)


    st = SearchToutiao(keyword)
    res_dict = st.get_tagged_res()

    return json.dumps(res_dict)


@app.route('/<path:filename>')
def send_file(filename):
    return send_from_directory(app.static_folder, filename)

@app.route('/')
def index():
    return json.dumps({"titles": random_select_titles(10),
                       "ads": random_select_ad(5)})


if __name__ == "__main__":
    app.run(threaded=True)
#    app.run(host="0.0.0.0", threaded=True)
