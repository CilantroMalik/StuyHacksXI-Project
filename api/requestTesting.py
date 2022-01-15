import json
import requests

requests.get("http://127.0.0.1:8888/api/v1/register?name=Luke&pwd=test")
requests.get("http://127.0.0.1:8888/api/v1/register?name=Rohan&pwd=test")
requests.get("http://127.0.0.1:8888/api/v1/login?name=Luke&pwd=test")
requests.get("http://127.0.0.1:8888/api/v1/login?name=Rohan&pwd=test")
one = requests.get("http://127.0.0.1:8888/api/v1/newBook?name=Luke&title=eee&author=fff&pages=324")
one_id = json.loads(one.text)["id"]
two = requests.get("http://127.0.0.1:8888/api/v1/newBook?name=Luke&title=ttt&author=hhh&pages=289")
two_id = json.loads(two.text)["id"]
requests.get("http://127.0.0.1:8888/api/v1/newBook?name=Rohan&title=eee&author=fff&pages=431")

requests.get(f"http://127.0.0.1:8888/api/v1/removeBook?name=Luke&id={one_id}")

# print(requests.get("http://127.0.0.1:8888/api/v1/getCollection?name=Luke").text)
print(requests.get("http://127.0.0.1:8888/api/v1/getStats?name=Luke").text)
requests.get(f"http://127.0.0.1:8888/api/v1/addPages?name=Luke&id={two_id}&pages=50")
print(requests.get("http://127.0.0.1:8888/api/v1/getCollection?name=Luke").text)
print(requests.get("http://127.0.0.1:8888/api/v1/getStats?name=Luke").text)


# -------
# requests.get("http://127.0.0.1:8888/api/v1/createCommunity?name=Luke")
# c = requests.get("http://127.0.0.1:8888/api/v1/getCommunity?name=Luke")
# obj = json.loads(c.text)
# requests.get(f"http://127.0.0.1:8888/api/v1/joinCommunity?name=Rohan&code={list(obj.keys())[0]}")
# c = requests.get("http://127.0.0.1:8888/api/v1/getCommunity?name=Rohan")
# print(c.text)
