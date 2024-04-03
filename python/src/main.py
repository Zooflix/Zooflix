# -*- coding: utf-8 -*-

import uvicorn
from fastapi import FastAPI,Request, Query
import requests
from requests import get
from bs4 import BeautifulSoup
from pydantic import BaseModel
import json
import FinanceDataReader as fdr
import pandas as pd
import matplotlib.pyplot as plt
import warnings
import platform
import datetime
from datetime import timedelta
import io
from typing import List
from starlette.responses import StreamingResponse


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
# 주요 지표 추출 (혜진 + 수민)
#
@app.get("/get_indices/")
async def get_indices():
    now = datetime.datetime.now()
    today = now.strftime('%Y-%m-%d')

    if datetime.datetime.today().weekday() == 6:
        yesterday = now - timedelta(days=2)
        today = yesterday.strftime('%Y-%m-%d')
    elif (now.hour < 9 or (now.hour == 9 and now.minute < 20)) or (datetime.datetime.today().weekday() == 5):
        yesterday = now - timedelta(days=1)
        today = yesterday.strftime('%Y-%m-%d')

    # kospi_data = fdr.DataReader('KS11', today)
    # kosdaq_data = fdr.DataReader('KQ11', today)
    # usd_krw_data = fdr.DataReader('USD/KRW', today)
    #
    # kospi_index = kospi_data.iloc[0]['Close']
    # kosdaq_index = kosdaq_data.iloc[0]['Close']
    # usd_krw_rate = usd_krw_data.iloc[0]['Close']

    indices_list = ['KS11', 'KQ11', 'USD/KRW']
    indices_data = [fdr.DataReader(code, today)['Close'] for code in indices_list]

    kospi_index = indices_data[0].iloc[-1]
    kosdaq_index = indices_data[1].iloc[-1]
    usd_krw_rate = indices_data[2].iloc[-1]

    return {kospi_index, kosdaq_index, usd_krw_rate}

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
    plt.plot(df.index, df['Close'], label=f'{stock_name} 주가', color='r')

    plt.title(f'최근 한 달 간의 {stock_name} 주가', fontsize=16, fontweight='bold')
    # x축 눈금 설정
    x_ticks = pd.date_range(start=thirty_days_ago, end=date, freq='D')
    plt.xticks(x_ticks, x_ticks.strftime('%d'))

    plt.legend()
    plt.grid(False)
    plt.tight_layout()

    if platform.system() == 'Windows':
        plt.rc('font', family='Malgun Gothic')
    elif platform.system() == 'Darwin':
        plt.rc('font', family='AppleGothic')
    else:
        plt.rc('font', family='NanumGothic')

    # 그래프 이미지를 메모리에 저장
    img_buffer = io.BytesIO()
    plt.savefig(img_buffer, format='png')
    img_buffer.seek(0)

    # 이미지를 반환
    return StreamingResponse(io.BytesIO(img_buffer.getvalue()), media_type="image/png")


#
# 비교 o 그래프
#
async def generate_chart(stock_code, stock_name, date, predict_dates, predict_costs, predict_results):

    # 입력된 날짜로부터 30일 전 날짜 계산
    thirty_days_ago = date - datetime.timedelta(days=30)

    # 30일 전 날짜부터 입력받은 날짜까지의 주가 데이터 가져오기
    df = fdr.DataReader(stock_code, thirty_days_ago, date)

    # 주가 그래프 그리기
    plt.figure(figsize=(10, 6))
    plt.plot(df.index, df['Close'], label=f'{stock_name} 주가', color='r')
    plt.plot(predict_dates, predict_costs, label=f'예측 히스토리', ls=':', marker='D', c='limegreen', linewidth=2, markersize=8)

    plt.title(f'최근 한 달 간의 {stock_name} 주가', fontsize=16, fontweight='bold')
    # x축 눈금 설정
    x_ticks = pd.date_range(start=thirty_days_ago, end=date, freq='D')
    plt.xticks(x_ticks, x_ticks.strftime('%d'))

    for date, cost, result in zip(predict_dates, predict_costs, predict_results):
        # 결과에 따라 텍스트 색상 설정
        if result == "성공":
            text_color = 'red'
        else:
            text_color = 'blue'

        # 텍스트 추가
        plt.text(date - datetime.timedelta(days=1), cost, result, fontsize=15, color=text_color, ha='right',
                 va='center')

    # plt.xlabel("날짜")
    # plt.ylabel('주가')
    plt.legend()
    plt.grid(False)
    plt.tight_layout()

    if platform.system() == 'Windows':
        plt.rc('font', family='Malgun Gothic')
    elif platform.system() == 'Darwin':
        plt.rc('font', family='AppleGothic')
    else:
        plt.rc('font', family='NanumGothic')

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
                        predict_costs: List[float] = Query(..., description="예측가격 배열 (e.g., '70000')"),
                        predict_results: List[str] = Query(..., description="예측결과 배열 (e.g., '성공')")):
    img_buffer = await generate_chart(stock_code, stock_name, date, predict_dates, predict_costs, predict_results)
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
@app.get("/radio/crawling")
async def crawling(url):
    crawlingList = [] # 기사+본문 리스트

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
                newsTitle = news.text

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
                        oneCrawling = {
                            "Url": articleUrl,
                            "Title": newsTitle,
                            "Content": content_texts
                        }
                        crawlingList.append(json.dumps(oneCrawling))
                        if len(crawlingList) == 7:
                            return crawlingList
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
@app.get("/radio/translation")
async def translation(id, secret, url, list):
    translationList = []

    for news in list:
        news = json.loads(news)  # JSON 문자열을 파이썬 객체로 변환
        newsUrl = news["Url"]
        newsTitle = news["Title"]
        newsContent = news["Content"]
        titleData = {
            "source": "en",
            "target": "ko",
            "text": newsTitle
        }
        headers = {
            "X-NCP-APIGW-API-KEY-ID": id,
            "X-NCP-APIGW-API-KEY": secret,
            "Content-Type": "application/json"
        }
        titleResponse = requests.post(url, data=json.dumps(titleData).encode("utf-8"), headers=headers)
        contentData = {
            "source": "en",
            "target": "ko",
            "text": newsContent
        }
        contentResponse = requests.post(url, data=json.dumps(contentData).encode("utf-8"), headers=headers)

        # JSON 문자열을 파이썬 객체로 변환
        titleJson = titleResponse.json()
        contentJson = contentResponse.json()
        oneTranslation = {
            "Url": newsUrl,
            "TranslationTitle": titleJson["message"]["result"]["translatedText"],
            "TranslationContent": contentJson["message"]["result"]["translatedText"]
        }
        if (titleResponse.status_code == 200 & contentResponse.status_code==200):
            translationList.append(json.dumps(oneTranslation, ensure_ascii=False))
        else:
            print("Error Code:" + str(titleJson)+ str(contentJson) + " translation is failed")
    return translationList



#
# 요약 by Clova Summary
#
@app.post("/radio/summary/endpoint")
async def summary(request: Request):
    # 1. 요청 바디에서 필요한 요소 추출
    request_body = await request.json()
    clientId = request_body.get("clientId")
    clientSecret = request_body.get("clientSecret")
    clovaUrl = request_body.get("clovaUrl")
    text = request_body.get("text")
    sentence = int(request_body.get("sentence"))

    # 2. 요약
    data = {
        "document": {
            "content": text
        },
        "option": {
            "language": "ko",
            "model": "news",
            "tone": 2,
            "summaryCount": sentence
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





if __name__ == "__main__" :
	uvicorn.run("main:app", reload=True)
