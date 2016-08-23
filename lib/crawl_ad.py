#coding=utf-8
import os
from os.path import isfile, join
import sys
reload(sys)
sys.setdefaultencoding('UTF8')
sys.path.append("/home/liberty/Git")
from utils import myutils
import requests
from pyquery import PyQuery as pq
import json
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.keys import Keys
import time




options = webdriver.ChromeOptions()
options.add_argument('--user-agent=' + myutils.get_random_ua_header()['User-Agent'])

base_url = 'http://m.toutiao.com/'
browser = webdriver.Chrome(chrome_options=options)
browser.get(base_url)
browser.refresh()

res = []
crawled_ad_path = "../data/crawled_ad"

crawled_title_path = "../data/titles"
title_res = []

def get_ad_titles():

    doc = pq(browser.page_source)
    doc.xhtml_to_html()
    titles = doc('h3.dotdot.line3')
    for item in titles.items():
        title = item.text()
        if title not in title_res:
            title_res.append(title)

    all_ads = doc('span.ad_label.space')

    for item in all_ads.items():

        title = item.parent().parent()('h3').text()
        if title not in res:
            res.append(title)



def click_refresh_btn():

    browser.find_element_by_css_selector('.refresh_btn.btn').click()


def print_crawled_titles():

    for item in res:
        print item

if __name__=="__main__":

    if isfile(crawled_ad_path):
        for ad in open(crawled_ad_path):
            ad = ad.strip()
            res.append(ad)

    if isfile(crawled_title_path):
        for title in open(crawled_title_path):
            title = title.strip()
            title_res.append(title)


    refresh_times = 100
    get_ad_titles()
    for i in range(refresh_times):
        print ("refreshing %d times" % i)
        click_refresh_btn()
        get_ad_titles()
        time.sleep(1)


    res = myutils.list_remove_dup(res)
    title_res = myutils.list_remove_dup(title_res)

    wfd = open(crawled_ad_path, 'w')
    for ad in res:
        wfd.write(ad + '\n')

    wfd.close()


    wfd = open(crawled_title_path, 'w')
    for title in title_res:
        wfd.write(title + '\n')

    wfd.close()

    # delete all cookies 
    browser.delete_all_cookies()
    browser.quit()
    #browser.close()
