# -*- coding: utf-8 -*-
import json
import sys
reload(sys)
sys.setdefaultencoding('UTF8')
import multiprocessing
from gensim.models import Word2Vec
from gensim.models.word2vec import LineSentence
from gensim.corpora import WikiCorpus
import re
def tokenize_zh_line(zh_line, method='jieba'):
    """
    zh_line:
    Chinese string line

    method:
    tokenize method , default using jieba

    Returns:
    token Chinese word list
    """

    import jieba

    try:
        zh_line = zh_line.strip()
        zh_line = " ".join(re.findall(ur'[\u4e00-\u9fff\w\_]+', zh_line))

        tokenized_list = jieba.cut(zh_line, cut_all=False)

        res = [ word for word in tokenized_list if word != ' ' ]


        return res

    except AttributeError, attr:
        print zh_line
        return []



corpus_file = "../data/corpus"
wfd = open(corpus_file, 'w')
raw_data = open("../data/crawl_data")
for line in raw_data:
    try:
        corpus = eval(line.strip())
        tokened_line = " ".join(tokenize_zh_line(corpus['title'])) + "\n"
        wfd.write(tokened_line)

    except Exception, e:
        continue
wfd.close()

# wfd = open("../data/trimed_corpus", "w")
# wiki = WikiCorpus(corpus_file, lemmatize=False, dictionary={})
# for text in wiki.get_texts():
#     wfd.write(" ".join(text) + "\n")
# wfd.close()


model = Word2Vec(LineSentence(corpus_file),
                 size=400,
                 window=5,
                 min_count=5,
                 workers=multiprocessing.cpu_count())
 
model.save("../data/model")
model.save_word2vec_format("../data/model2", binary=False)
