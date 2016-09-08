#coding=utf-8
import os
import sys
sys.path.append('..')
import re
import random
import jieba
#titles_path = '../data/toutiao.txt'
import pandas as pd
class_dict = '../data/words/class_dict'
class_df = pd.read_csv(class_dict, sep='\t', header=None)
class_df.columns = ["class", "word", "attr", "score"]

#s = u'国内7条适合长线旅行的路线，下半年该好好计划啦'

def tokenize_zh_line(zh_line, method='jieba'):
    """
    zh_line:
    Chinese string line

    method:
    tokenize method , default using jieba

    Returns:
    token Chinese word list
    """
    try:
        zh_line = zh_line.strip()
        zh_line = " ".join(re.findall(ur'[\u4e00-\u9fff\w\_]+', zh_line))

        tokenized_list = jieba.cut(zh_line, cut_all=False)
        res = [ word for word in tokenized_list if word != ' ' ]
        return res

    except AttributeError, attr:
        print zh_line
        return []


def get_sentence_class(sentence):

    try:
        s_tokened = tokenize_zh_line(sentence)
        s_df = pd.DataFrame(s_tokened)
        s_df.columns = ["word"]
        s_df = pd.DataFrame(s_df.word.apply(lambda x: x.encode('utf8')))

        merge_df = pd.merge(s_df, class_df, on='word', how='inner')
        class_sum_score_df = merge_df.groupby(['class']).sum()
        max_score_class = class_sum_score_df.sort(['score'], ascending=False).iloc[0].name
        return max_score_class

    except Exception, e:
        print "get_sentence_class err", str(e)
        return "unknown"


class TitleTagger(object):

    def __init__(self, titles_path, rule_path):

        self.titles_path = titles_path
        self.rule_path = rule_path
        self.rule_list = []
        self.res_dict = {}
        self._load_rules()
        self._all_titles_classify()

        self.random_dict = {}


    def find_title_tag(self, title):

        """
        Keyword Arguments:
        title     -- toutiao title (utf8)
        rule_list -- rule tag -> regex list (unicode dict list)

        return -- tag(utf8)

        """
        for rule in self.rule_list:

            tag = rule.keys()[0]
            regex_list = rule[tag]

            for regex in regex_list:

                if re.search(re.escape(regex), title.decode('utf8')):
                    return tag.encode('utf8')

        return "未知体"


    def _load_rules(self):

        for line in open(self.rule_path):

            line = line.decode('utf8')
            line = line.strip()
            line = line.split('\t')

            if len(line) != 3:
                print ("invalid line in rule file")
                continue

            tag = line[1]
            regex_list = line[2].split(',')

            self.rule_list.append({tag:regex_list})


    def titles_classify(self, title_list):
        pass


    def _all_titles_classify(self):
        """
        Keyword Arguments:

        return -- classified list, key is rule tag(utf8) ; value is titles(utf8)

        """

        for line in open(self.titles_path):

            line = line.strip()
            line = line.split('\t')
            title = line[0]
            tag = self.find_title_tag(title)

            if tag not in self.res_dict:
                self.res_dict[tag] = [title]
            else:
                self.res_dict[tag].append(title)

        return self.res_dict

    def search_title_by_query_and_class(self, query, class_name):
        search_res = []
        for tag in self.res_dict:
            title_list = self.res_dict[tag]
            for title in title_list:
                if re.search(query, title) and get_sentence_class(title) == class_name:
                    search_res.append({"tag": tag,
                                       "content": title})
        return search_res


    def search_title_by_query(self, query):

        search_res = []

        for tag in self.res_dict:
            title_list = self.res_dict[tag]
            for title in title_list:
                if re.search(query, title):
                    search_res.append({"tag": tag,
                                       "content": title})

        return search_res

    def random_select_titles(self, title_num):
        """
        Keyword Arguments:
        title_num -- titles num in each tag(int > 0)
        res_dict  -- tag -> title dict(utf8)

        return -- random selected title dict(utf8)

        """
        random_title_list = []

        for tag in self.res_dict:
            title_list = self.res_dict[tag]
            if len(title_list) > title_num:
                title_list = random.sample(title_list, title_num)

            for title in title_list:
                random_title_list.append({"tag": tag,
                                          "content": title})
        return random_title_list



# ad = '../data/crawled_ad'
# titles = '../data/titles'
# rule = '../data/rule.conf'

title_tag = TitleTagger(titles_path='../data/titles',
                        rule_path='../data/rule.conf')

ad_tag = TitleTagger(titles_path='../data/crawled_ad',
                     rule_path='../data/rule.conf')


#res_dict = title_tag.res_dict
random_select_titles = title_tag.random_select_titles
random_select_ad = ad_tag.random_select_titles
search_title = title_tag.search_title_by_query
search_title_by_class = title_tag.search_title_by_query_and_class
#res_dict = all_titles_classify(titles_path, rule_path)
#random_dict = random_select_titles(res_dict, 10)
