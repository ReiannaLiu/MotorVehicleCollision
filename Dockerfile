FROM python:3.12-slim

WORKDIR /app

COPY . /app

RUN apt-get update && apt-get install -y build-essential && apt-get clean

RUN pip install \
    pandas \
    numpy \
    marshmallow_sqlalchemy \
    flask \
    "SQLAlchemy==2.0.36" \
    "marshmallow==3.23.1"

EXPOSE 5000

CMD ["python", "app.py", "--host=0.0.0.0", "--port=5000"]

