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
class_df.columns = ["class_name", "word", "attr", "score"]



def flatten(items, ignore_types=(str, bytes)):
    """flatten a nested list, yield a generator

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
            yield from flatten(x)
        else:
            yield x


            
class_name_remap = {
    "体育" : "生活服务类",
    "母婴": "生活服务类",
    "家电": "3C、家电类",
    "化妆品" : "快消品类",
    "鞋" : "电商",
    "文学": "教育类",
    "教育" : "教育类",
    "娱乐": "娱乐休闲类",
    "xiefu": "电商",
    "旅游": "旅游出行类",
    "游戏": "游戏类",
    "汽车" :"汽车类",
    "未知" : "生活服务类",
    "医疗" : "医药医疗类",
    "文化" : "教育类",
    "保健": "生活服务类",
    "商务" :"商务服务类",
    "科技" : "通讯服务类",
    "军事": "娱乐休闲类",
    "房产": "房地产类",
    "金融": "金融类",
    "艺术": "娱乐休闲类",
    "电脑" : "3C、家电类",
    "手机": "3C、家电类",
    "运动": "娱乐休闲类",
    "影视": "娱乐休闲类",
    "家装": "家居家装类",
    "服装": "电商",
    "3C": "3C、家电类",
    "时尚": "娱乐休闲类",
    "家居": "家居家装类",
    "数码": "3C、家电类",
    "奢侈品" : "入驻商家", 
    "食品": "入驻商家"
}

value2label = {'3c':'3C',
              'baojian':'保健',
              'diannao':'电脑',
              'fang':'房产',
              'fu_':'服装',
              'jiadian':'家电',
              'jiaju':'家居',
              'jiaoyu':'教育',
              'jiazhuang':'家装',
              'jinrong':'金融',
              'junshi':'军事',
              'keji':'科技',
              'lvyou':'旅游',
              'meizhuang':'化妆品',
              'muying':'母婴',
              'qiche':'汽车',
              'shangwu':'商务',
              'shechipin':'奢侈品',
              'shipin':'食品',
              'shishang': '时尚',
              'shouji':'手机',
              'shuma':'数码',
              'tiyu':'体育',
              'wenhua':'文化',
              'wenxue':'文学',
              'xie_':'鞋',
              'xiefu':'xiefu',
              'yiliao':'医疗',
              'yingshi':'影视',
              'yishu':'艺术',
              'youxi':'游戏',
              'yule':'娱乐',
               'yundong':'运动',
               'unknown': '未知'}

def _invert_mapping(mapping):
    return {v: k for k, v in mapping.items()}

label2value = _invert_mapping(value2label)

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
        zh_line = " ".join(re.findall(r'[\u4e00-\u9fff\w\_]+', zh_line))

        tokenized_list = jieba.cut(zh_line, cut_all=False)
        res = [ word for word in tokenized_list if word != ' ' ]
        return res

    except AttributeError as attr:
        print(zh_line)
        return []


def get_sentence_class(sentence):

    try:
        s_tokened = tokenize_zh_line(sentence)
        s_df = pd.DataFrame(s_tokened)
        s_df.columns = ["word"]
        #s_df = pd.DataFrame(s_df.word.apply(lambda x: x.encode('utf8')))

        merge_df = pd.merge(s_df, class_df, on='word', how='inner')
        class_sum_score_df = merge_df.groupby(['class_name']).sum()
        max_score_class = class_sum_score_df.sort(['score'], ascending=False).iloc[0].name
        return max_score_class

    except Exception as e:
        print("get_sentence_class err", e)
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

            tag = list(rule.keys())[0]
            regex_list = rule[tag]

            for regex in regex_list:

                if re.search(re.escape(regex), title):
                    return tag

        return "未知体"


    def _load_rules(self):

        for line in open(self.rule_path):

            #line = line.decode('utf8')
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

    def search_title_by_query_and_class(self, query, class_name_list):
        search_res = []
        print ("query :", query)
        print ("query repr:", repr(query))

        class_name_list = [ label2value[class_name] for class_name in class_name_list ]
        print ("class_name_list:", class_name_list)

        for tag in self.res_dict:
            title_list = self.res_dict[tag]

            for title in title_list:
                #print "get class_name is :", class_name
                if re.search(query, title):
                    class_name = get_sentence_class(title)
                    if not class_name_list or class_name in class_name_list:
                        search_res.append({"tag": tag,
                                           "content": title,
                                           "label": value2label[class_name]})
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

title_tag = TitleTagger(titles_path='../data/merged_titles',
                        rule_path='../data/rule.conf')

ad_tag = TitleTagger(titles_path='../data/crawled_ad',
                     rule_path='../data/rule.conf')


#res_dict = title_tag.res_dict
random_select_titles = title_tag.random_select_titles
random_select_ad = ad_tag.random_select_titles
search_title = title_tag.search_title_by_query
search_title_by_class = title_tag.search_title_by_query_and_class
# in python3 dict.values is not json serizable, so must convert it to list
all_classname_list = list(value2label.values())
#res_dict = all_titles_classify(titles_path, rule_path)
#random_dict = random_select_titles(res_dict, 10)
