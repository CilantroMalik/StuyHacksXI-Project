import json
import requests

requests.get("http://127.0.0.1:8888/api/v1/register?name=Luke&pwd=test")
requests.get("http://127.0.0.1:8888/api/v1/register?name=Rohan&pwd=test")
requests.get("http://127.0.0.1:8888/api/v1/login?name=Luke&pwd=test")
requests.get("http://127.0.0.1:8888/api/v1/login?name=Rohan&pwd=test")
requests.get("http://127.0.0.1:8888/api/v1/newBook?name=Luke&title=eee&author=fff&pages=4")
requests.get("http://127.0.0.1:8888/api/v1/newBook?name=Luke&title=ttt&author=hhh&pages=7")
requests.get("http://127.0.0.1:8888/api/v1/newBook?name=Rohan&title=eee&author=fff&pages=19")
r = requests.get("http://127.0.0.1:8888/api/v1/getIDs?name=Luke")
print(r.text)
obj = json.loads(r.text)
print(obj)