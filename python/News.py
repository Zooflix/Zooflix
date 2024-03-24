# -*- coding: utf-8 -*-
import sys
import requests
# sys.path.append("c:\\venvs\\myapi\\lib\\site-packages") # pip install 경로

from fastapi import FastAPI, Request
from requests import get
from bs4 import BeautifulSoup
from transformers import PreTrainedTokenizerFast, BartForConditionalGeneration
import pyttsx3
from pydantic import BaseModel
import json
import urllib.request

# json으로 넘어오는 requestbody 속성을 받기 위함
class Item(BaseModel):
    text: str

app = FastAPI()




#
# 크롤링+번역
#
@app.post("/radio/crawling/translation/endpoint")
async def getCrawlingData(request: Request):
    request_body = await request.json()
    webUrl = request_body.get("webUrl")  # 요청 바디에서 웹 URL 가져오기
    clientId = request_body.get("clientId")
    clientSecret = request_body.get("clientSecret")
    ppgUrl = request_body.get("ppgUrl")
    crawlingNews = await crawling(webUrl)
    transNews = await translation(clientId, clientSecret, ppgUrl, crawlingNews)
    return transNews


# 크롤링
async def crawling(url):
    descriptionList = []

    # 1. 기사 URL 얻기
    articleUrl = ""
    head = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'}
    response = get(url, headers=head)
    if (response.status_code == 200):
        soup = BeautifulSoup(response.text, "html.parser")  # 해당 web의 html 전체
        newsList = soup.find_all('a', class_="Card-title")  # 기사목록
        if (newsList!=[]):
            for news in newsList:
                articleUrl = news['href']

                # 2. 기사 본문 얻기
                response = get(articleUrl, headers=head)
                if (response.status_code == 200):
                    soup = BeautifulSoup(response.text, "html.parser")  # 해당 web의 html을 긁어오기
                    newsContent = soup.find_all('div', class_=["FeaturedContent-articleBody", "ArticleBody-articleBody"])  # 기사 본문

                    content_texts = ""  # 기사 본문 문자열
                    for description in newsContent:
                        contentList = description.find_all('p')
                        for oneContent in contentList:
                            content_texts += oneContent.text+ " "
                        descriptionList.append(content_texts)
                        if len(descriptionList) == 2:
                            return descriptionList
                else:
                    errMsg = "newsDetailPage is not found"
                    return errMsg
        else:
            errorMsg = "newsList is null"
            return errorMsg
    else:
        errorMsg = "newsPage is not found"
        return errorMsg


# 번역 by Papago
async def translation(id, secret, url, text):
    translationList = []
    for news in text:
        data = {
            "source": "en",
            "target": "ko",
            "text": news
        }
        headers = {
            "X-NCP-APIGW-API-KEY-ID": id,
            "X-NCP-APIGW-API-KEY": secret,
            "Content-Type": "application/json"
        }
        response = requests.post(url, data=json.dumps(data).encode("utf-8"), headers=headers)

        # JSON 문자열을 파이썬 객체로 변환
        responseJson = response.json()
        if (response.status_code == 200):
            translationList.append(responseJson["message"]["result"]["translatedText"])
        else:
            print("Error Code:" + str(responseJson) + " translation is failed")

    result = {
        "translationData": translationList
    }
    return result




# #
# # 요약 by KoBART
# #
# @app.post("/radio/summary/endpoint")
# def summary(item: Item):
#     # 요청 바디에서 전달된 텍스트 추출
#     text = item.text
#
#     # 1. 모델과 문장 분리를 위한 토크나이저 호출
#     model = BartForConditionalGeneration.from_pretrained("ainize/kobart-news")
#     tokenizer = PreTrainedTokenizerFast.from_pretrained("ainize/kobart-news")
#
#     # 2. 토크나이저를 사용하여 뉴스기사 원문을 모델이 인식할 수 있는 토큰 형태로 변환
#     # => 기사 본문이 토큰 단위로 쪼개진 뒤 모두 id형태의 숫자로 변환됨
#     # "0" : 문장 시작을 나타내는 토큰id, "1" : 문장 끝을 나타내는 토큰id
#     input_ids = tokenizer.encode(text, return_tensors="pt")
#
#     # 3. 요약
#     summary_content_ids = model.generate(
#         input_ids=input_ids,
#         bos_token_id=model.config.bos_token_id,  # 문장의 시작 special토큰
#         eos_token_id=model.config.eos_token_id,  # 문장의 종료 special토큰
#         length_penalty=1.0,  # 길이에 대한 제한. 짧은문장<1. 긴문장>1
#         max_length=128,  # 요약문의 최대 길이
#         min_length=32,  # 요약문의 최소 길이
#         num_beams=4,  # 문장 생성시 다음 단어를 탐색하는 영역의 개수
#     )
#
#     # 4. 텍스트로 환원
#     summary_content = tokenizer.decode(summary_content_ids[0], skip_special_tokens=True)
#     print(summary_content)
#
#     return summary_content



#
# 요약 by Clova Summary
#
@app.post("/radio/summary/endpoint")
async def summary(request: Request):
    summaryList = []

    # 1. 요청 바디에서 필요한 요소 추출
    request_body = await request.json()
    clientId = request_body.get("clientId")
    clientSecret = request_body.get("clientSecret")
    clovaUrl = request_body.get("clovaUrl")
    text = request_body.get("text")

    # 2. 요약
    data = {
        "document": {
            "content": text
        },
        "option": {
            "language": "ko",
            "model": "news",
            "tone": 2,
            "summaryCount": 3
        }
    }
    headers = {
        "X-NCP-APIGW-API-KEY-ID": clientId,
        "X-NCP-APIGW-API-KEY": clientSecret,
        "Content-Type": "application/json"
    }
    response = requests.post(clovaUrl, data=json.dumps(data).encode("utf-8"), headers=headers)

    # JSON 문자열을 파이썬 객체로 변환
    responseJson = response.json()
    if (response.status_code == 200):
        return responseJson["summary"]
    else:
        print("Error Code:" + str(responseJson)+" summary is failed")



# #
# # tts 변환 by pyttsx3
# #
# @app.post("/radio/tts/endpoint")
# def transToSpeech(item: Item):
#     # 요청 바디에서 전달된 텍스트 추출
#     text = item.text
#
#     engine = pyttsx3.init()
#     engine.say(text)
#     engine.runAndWait()
#     return "success"



