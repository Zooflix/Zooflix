FROM python:3.12.2

WORKDIR /src

COPY ./requirements.txt /src/

RUN pip install --no-cache-dir --upgrade -r /src/requirements.txt

COPY src/* /src/

CMD ["uvicorn", "News:app", "--host", "0.0.0.0", "--port", "8000"]