import requests
from bs4 import BeautifulSoup
from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

client = MongoClient('localhost', 27017)  # mongoDB는 27017 포트로 돌아갑니다.
db = client.dbsparta

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/test')
def map():
    return render_template('test.html')

# 주문하기 API
@app.route('/order', methods=['POST'])
def order():
    store_receive = request.form['store_give']
    name_receive = request.form['name_give']
    count_receive = request.form['count_give']
    address_receive = request.form['address_give']
    phone_receive = request.form['phone_give']
    item_receive = request.form['item_give']

    # orders = {'name': name_receive, 'count': count_receive, 'address': address_receive, 'phone': phone_receive, 'item': item_receive}
    order = {'store': store_receive, 'name': name_receive, 'count': count_receive, 'address': address_receive, 'phone': phone_receive, 'item': item_receive}

    #print(order)
    db.orders.insert_one(order)

    return jsonify({'result': 'success'})


# 주문 불러오기 API
@app.route('/order', methods=['GET'])
def listing():
    # item_receive = request.args.get('item_give')
    # result = list(db.orders.find_one({'item': item_receive}, {'_id': 0}))
    store_receive = request.args.get('store_give')
    result = list(db.orders.find({'store': store_receive}, {'_id': 0}))

    return jsonify({'result': 'success', 'orders': result})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
