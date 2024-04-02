FROM python:3.12.2

WORKDIR /src

COPY ./requirements.txt /src/

RUN pip install --no-cache-dir --upgrade -r /src/requirements.txt

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

COPY src/* /src/

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]