
# -*- coding: utf-8 -*-
import sys
import requests
# sys.path.append("c:\program files\python\lib\site-packages") # pip install 경로
import math
import time

from fastapi import FastAPI,Request, Query
import requests
from requests import get
from bs4 import BeautifulSoup
from transformers import PreTrainedTokenizerFast, BartForConditionalGeneration
import pyttsx3
from pydantic import BaseModel
import json
import urllib.request
import FinanceDataReader as fdr
import pandas as pd
import matplotlib.pyplot as plt
import warnings
import platform
import datetime
import io
from typing import List
from starlette.responses import StreamingResponse
import asyncio

from starlette.responses import StreamingResponse
import asyncio

warnings.filterwarnings('ignore')

# json으로 넘어오는 requestbody 속성을 받기 위함
class Item(BaseModel):
    text: str

app = FastAPI()

if platform.system() == 'Windows':
    plt.rc('font', family='Malgun Gothic')
elif platform.system() == 'Darwin':
    plt.rc('font', family='AppleGothic')
else:
    plt.rc('font', family='NanumGothic')


#
# 전체목록 가져오기
#
@app.get("/get_stock_list/")
async def get_stock_list():
    df_list = fdr.StockListing('KRX')
    df_filter = df_list[['Code', 'Name']]
    return df_filter.to_dict(orient='records')

#
# 현재 가격
#
@app.get("/get_now_price/")
async def get_now_price(stock_code):
    now_price = fdr.DataReader(stock_code)
    result = now_price.tail(1)['Close'].values[0]
    return float(result)

#
# 그날 종가 return
#
@app.get("/get_closing_price/")
async def get_closing_price(stock_code,
                            date: datetime.date = Query(..., description="date (YYYY-MM-DD)")):

  # FinanceDataReader를 사용하여 주식 데이터 불러오기
    df = fdr.DataReader(stock_code, date)

    # '종가' 열의 마지막 값을 가져와서 리턴
    closing_price = df['Close'].iloc[-1]

    closing_price = float(closing_price)

    return closing_price

#
# 비교 x 그래프
#
@app.get("/generate_stock_graph/")
async def generate_stock_graph(stock_code, stock_name: str = Query(..., description="종목이름 (e.g., '삼성전자')"),
                               date: datetime.date = Query(..., description="date (YYYY-MM-DD)")):
    # 입력된 날짜로부터 30일 전 날짜 계산
    thirty_days_ago = date - datetime.timedelta(days=30)

    # 30일 전 날짜부터 입력받은 날짜까지의 주가 데이터 가져오기
    df = fdr.DataReader(stock_code, thirty_days_ago, date)

    # 주가 그래프 그리기
    plt.figure(figsize=(10, 6))
    plt.plot(df.index, df['Close'], label=f'{stock_name} Stock Price', color='blue')
    plt.title(f'{stock_name} 주가')

    # x축 눈금 설정
    x_ticks = pd.date_range(start=thirty_days_ago, end=date, freq='D')
    plt.xticks(x_ticks, rotation=45)

    plt.xlabel("날짜")
    plt.ylabel('주가')
    plt.legend()
    plt.grid(True)
    plt.tight_layout()

    # 그래프 이미지를 메모리에 저장
    img_buffer = io.BytesIO()
    plt.savefig(img_buffer, format='png')
    img_buffer.seek(0)

    # 이미지를 반환
    return StreamingResponse(io.BytesIO(img_buffer.getvalue()), media_type="image/png")


#
# 비교 o 그래프
#
async def generate_chart(stock_code, stock_name, date, predict_dates, predict_costs):

    # 입력된 날짜로부터 30일 전 날짜 계산
    thirty_days_ago = date - datetime.timedelta(days=30)

    # 30일 전 날짜부터 입력받은 날짜까지의 주가 데이터 가져오기
    df = fdr.DataReader(stock_code, thirty_days_ago, date)

    # 주가 그래프 그리기
    plt.figure(figsize=(10, 6))
    plt.plot(df.index, df['Close'], label=f'{stock_name} Stock Price', color='blue')

    # 예측 그래프 그리기
    for i, predict_date in enumerate(predict_dates):
        plt.scatter(predict_date, predict_costs[i], color='red', label=f'예측값 {i + 1}')

    plt.title(f'{stock_name} 주가')
    # x축 눈금 설정
    x_ticks = pd.date_range(start=thirty_days_ago, end=date, freq='D')
    plt.xticks(x_ticks, rotation=45)

    plt.xlabel("날짜")
    plt.ylabel('주가')
    plt.legend()
    plt.grid(True)
    plt.tight_layout()

    # 그래프 이미지를 메모리에 저장
    img_buffer = io.BytesIO()
    plt.savefig(img_buffer, format='png')
    img_buffer.seek(0)

    return img_buffer

    # 이미지를 반환
    # return StreamingResponse(io.BytesIO(img_buffer.getvalue()), media_type="image/png")

# 사용자를 눌렀을 때 : 기업 기본 그래프 + 사용자의 예측 그래프
# 입력값 (스프링) : 종목, 예측정보 (예측 날짜, 예측 가격)
@app.get("/compare_graph/")
async def compare_graph(stock_code, stock_name: str = Query(..., description="종목이름 (e.g., '삼성전자')"),
                        date: datetime.date = Query(..., description="날짜 (YYYY-MM-DD)"),
                        predict_dates: List[datetime.date] = Query(..., description="예측날짜 배열 (YYYY-MM-DD)"),
                        predict_costs: List[float] = Query(..., description="예측가격 배열 (e.g., '70000')")):
    img_buffer = await generate_chart(stock_code, stock_name, date, predict_dates, predict_costs)
    return StreamingResponse(io.BytesIO(img_buffer.getvalue()), media_type="image/png")



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
                        if len(descriptionList) == 7:
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
            "summaryCount": 2
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
        result = responseJson["summary"].replace("\n", " ")
        return result
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

