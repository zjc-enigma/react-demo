#coding=utf-8
"""
    file: get_url_word.py
    desc: 
    input: file(../data/all_urldoc_cate)
    output:
    name: han
    date: 20160818
    modify:
"""

import sys
#import thread
import json
import re
import os
import time
from multiprocessing.pool import Pool
from multiprocessing import Queue
#import urllib
#import urlparse
from bs4 import BeautifulSoup
sys.path.append('..')
from util.util import exec_cmd, search_to_fpath
import pynlpir
from collections import OrderedDict
pynlpir.open()
#reload(sys)
#sys.setdefaultencoding('UTF8')


def word_by_pynlpir(inputfile, word_dict, max_words=1000):

    weighted_word_list = pynlpir.get_key_words(inputfile, weighted=True, max_words=max_words)

    for word, weight in weighted_word_list:
        try:
            word_class = word_to_class(word)
            if word_class in ['time word', 'numeral', 'adverb', 'verb', \
                'locative word', 'distinguishing word']: continue
            if len(word) < 2: continue
            word_dict.setdefault(word, 0)
            word_dict[word] += weight
        except Exception as e:
            print ("exception " , e)


def wordclass_by_pynlpir(inputfile, word_dict, max_words=1000):

    weighted_word_list = pynlpir.get_key_words(inputfile, weighted=True, max_words=max_words)

    for word, weight in weighted_word_list:
        try:
            word_class = word_to_class(word)
            if word_class in ['time word', 'numeral', 'adverb', 'verb', \
                'locative word', 'distinguishing word']: continue
            if len(word) < 2: continue
            k = word + "\t" + word_class
            word_dict.setdefault(k, 0)
            word_dict[k] += weight
        except Exception as e:
            print (e)


def allclass_by_pynlpir(inputfile, word_dict, max_words=1000):

    weighted_word_list = pynlpir.get_key_words(inputfile, weighted=True, max_words=max_words)

    for word, weight in weighted_word_list:
        try:
            word_class = word_to_class(word)
            k = word + "\t" + word_class
            word_dict.setdefault(k, 0)
            word_dict[k] += weight
        except Exception as e:
            print (e)

def allword_by_pynlpir(inputfile, word_dict, max_words=1000):

    weighted_word_list = pynlpir.get_key_words(inputfile, weighted=True, max_words=max_words)

    for word, weight in weighted_word_list:
        try:
            word_dict.setdefault(word, 0)
            word_dict[word] += weight
        except Exception as e:
            print (e)

def allword_by_pynlpir_ordered(inputfile, max_words=1000):
    weighted_word_list = pynlpir.get_key_words(inputfile, weighted=True, max_words=max_words)
    word_dict = OrderedDict()

    for word, weight in weighted_word_list:
        try:
            word_dict.setdefault(word, 0)
            word_dict[word] += weight
        except Exception as e:
            print (e)
            
    return word_dict

def word_to_class(word):

    c = "null"
    c_list = []
    try:
        c_list = pynlpir.segment(word)
    except Exception as e:
        print (e)
        return c
    if len(c_list)>=1 and c_list[0][1] != None:
        c = c_list[-1][1]
    return c

def main_to_file(inputfile, outfile, max_words=1000):
    if os.path.exists(outfile):
        os.remove(outfile)

    word_dict = {}
    try:
        f = open(inputfile,'r').read().decode('utf-8', "replace")
        wordclass_by_pynlpir(f, word_dict, max_words=max_words)

        word_dict = sorted(word_dict.iteritems(), key=lambda d:d[1], reverse = True)
    except Exception as e:
        print (e)

    wfd = open(outfile, 'w')
    for k,w in word_dict:
        wfd.write(k + "\t" + str(w) + "\n")
    wfd.close()

def main(fkey="test", max_words=1000):
    inputfile = "../data/doc_" + fkey
    outfile = "../data/word_" + fkey
    main_to_file(inputfile, outfile, max_words=max_words)

def split_main_file(inputfile, outfile, max_words=1000):
    path = os.path.dirname(inputfile)
    filename = os.path.basename(inputfile)

    # remove input_part
    l = search_to_fpath(path, filename)
    l.remove(inputfile)
    if len(l) > 0:
        for i in l:
            os.remove(i)

    exec_cmd("split -b 10m " + inputfile + " " + inputfile)

    l = search_to_fpath(path, filename)
    l.remove(inputfile)
    if len(l) > 0:
        for i in l:
            postfix = i.split(inputfile)[1]
            o = outfile + postfix
            main(i, o, max_words=max_words)

def split_main(fkey, max_words=1000):
    inputfile = "../data/doc_" + fkey
    outfile = "../data/word_" + fkey
    split_main_file(inputfile, outfile, max_words=1000)

if __name__ == "__main__":
    main()

