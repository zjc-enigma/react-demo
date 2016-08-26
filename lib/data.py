#coding=utf-8
import os
import sys
sys.path.append('..')
import re
import random

#titles_path = '../data/toutiao.txt'

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
#res_dict = all_titles_classify(titles_path, rule_path)
#random_dict = random_select_titles(res_dict, 10)
