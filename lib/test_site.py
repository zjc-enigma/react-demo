#coding=utf-8
import sys
reload(sys)
sys.setdefaultencoding('UTF8')
sys.path.append('..')
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
    print "looking up word: %s" % keyword


    st = SearchToutiao(keyword)
    res_dict = st.get_tagged_res()

    return json.dumps(res_dict)





@app.route('/<path:filename>')
def send_file(filename):
    return send_from_directory(app.static_folder, filename)

@app.route('/')
def index():
    return render_template('index.tmpl',
                           res_dict=random_select_titles(10),
                           ad_dict=random_select_ad(5))

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
#    app.run(threaded=True)

