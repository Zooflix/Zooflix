from fastapi import FastAPI, Query
import FinanceDataReader as fdr

import warnings
warnings.filterwarnings('ignore')

app = FastAPI()

@app.get("/get_stock_search/")
async def get_closing_price(stock_name: str = Query(...),):

    #stock_name을 stock_code로 변환시켜주기
    df_list = fdr.StockListing('KRX')
    df_filter = df_list[df_list['Name'].str.contains(stock_name)]

    stock_search = df_filter['Name'].tolist()

    return stock_search