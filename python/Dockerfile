FROM python:3.12.2

WORKDIR /src

COPY ./requirements.txt /src/

RUN pip install --no-cache-dir --upgrade -r /src/requirements.txt

RUN apt-get update && apt-get install -y fonts-nanum

COPY src/* /src/

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]