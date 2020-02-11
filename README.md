# pyCollab

## About

## Prerequisuites

* Docker
* Pyhton 3.7 or 3.8

## Setup

    git clone https://github.com/omerda123/pyCollab.git
    pipenv install
    python manage.py migrate

## How to run:
Launch Redis:
    docker run -p 6379:6379 -d redis:2.8
    
Launch Server:

    python manage.py runserver
 
