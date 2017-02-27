import json
import sys
import multiprocessing
from gensim.models import Word2Vec
from gensim.models.word2vec import LineSentence
from gensim.corpora import WikiCorpus
import re
import os

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
        zh_line = " ".join(re.findall(r'[\u4e00-\u9fff\w\_]+', zh_line))

        tokenized_list = jieba.cut(zh_line, cut_all=False)

        res = [ word for word in tokenized_list if word != ' ' ]
        return res

    except AttributeError as attr:
        print(zh_line)
        return []


corpus_num = 0
corpus_file = "../data/corpus"
wfd = open(corpus_file, 'w')
raw_data = open("../data/crawl_data")
for line in raw_data:
    try:
        corpus = eval(line.strip())
        tokened_line = " ".join(tokenize_zh_line(corpus['title'])) + "\n"
        wfd.write(tokened_line)

    except Exception as e:
        continue
wfd.close()

# wfd = open("../data/trimed_corpus", "w")
# wiki = WikiCorpus(corpus_file, lemmatize=False, dictionary={})
# for text in wiki.get_texts():
#     wfd.write(" ".join(text) + "\n")
# wfd.close()

def gbk_dir_files_to_corpus(train_corpus_dir):

    global corpus_num

    with open(corpus_file, 'a') as wfd:

        for gbk_dir in os.listdir(train_corpus_dir):
            aim_dir = train_corpus_dir + "/" + gbk_dir
            file_list = os.listdir(aim_dir)

            for f in file_list:

                try:
                    with open(aim_dir + "/" + f, encoding='gbk') as fd:

                        for line in fd:
                            try:
                                line = line.strip()
                                tokened_line = " ".join(tokenize_zh_line(line)) + "\n"
                                tokened_line = tokened_line.strip()
                                
                                # remove short corpus
                                if len(tokened_line) > 10:
                                    wfd.write(tokened_line)
                                    corpus_num += 1

                            except Exception as e:
                                print("exception1", e)
                                continue

                except Exception as e:
                    print('exception2', e)
                    continue




demo_corpus_dir = '../data/word2vec_corpus/demo_corpus'
gbk_dir_files_to_corpus(demo_corpus_dir)

train_corpus_dir = '../data/word2vec_corpus/train_corpus'
gbk_dir_files_to_corpus(train_corpus_dir)

crawler_corpus_dir = '../data/word2vec_corpus/crawler_corpus'
gbk_dir_files_to_corpus(crawler_corpus_dir)

sogou_corpus_dir = '../data/word2vec_corpus/sogou_corpus'
gbk_dir_files_to_corpus(sogou_corpus_dir)


print('[*] add all corpus to model, count: %d' % corpus_num)

model = Word2Vec(LineSentence(corpus_file),
                 size=800,
                 window=6,
                 min_count=5,
                 workers=multiprocessing.cpu_count())
 
model.save("../data/model")
model.wv.save_word2vec_format("../data/model2", binary=False)




