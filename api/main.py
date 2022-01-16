# User authentication --> sign up / log in
# -> Friend profiles (current, in-progress books)
# +20, +10, +5, +1 to add pages
# Progress bar for each book and overall?
# Micro-communities, 5-10 people (join/access code)
# Recommend book to friends after finishing
# (Extra feature: be member of multiple groups)

from flask import Flask, request, jsonify
from flask_cors import cross_origin, CORS
from uuid import uuid1
import json
from random import randint
import setup

app = Flask(__name__)
cors = CORS(app)
app.config["DEBUG"] = True

# --------------------------------------------
# AUTHENTICATION
currently_logged_in = []  # stores the login state of the application (list of logged in user IDs and names)

# Returns a list of all currently logged-in users
@app.route('/api/v1/currentLoginState')
@cross_origin()
def loginState():
    return jsonify(currently_logged_in)

# Registers a new user
# Query args: name, pwd
@app.route('/api/v1/register')
@cross_origin()
def register():
    name = request.args.get("name")
    pwd = request.args.get("pwd")

    with open("./users.csv", mode='r') as users:
        if f"{name}," in "".join(users.readlines()):
            return jsonify({"err": "Error: username already exists"})
    with open("./users.csv", mode='a+') as users:
        users.write(f"{name},{pwd}\n")
    # create the new user's book list
    # with open("./books.json", mode='a+') as bookFile:
    #     books = json.load(bookFile)
    #     books[name] = ""
    #     json.dump(books, bookFile)
    return jsonify({"feedback": f"Successfully registered user '{name}'", "name": name})

# Logs in a user
# Query args: name, pwd
@app.route('/api/v1/login')
@cross_origin()
def login():
    global currently_logged_in
    name = request.args.get("name")
    pwd = request.args.get("pwd")
    with open('./users.csv', mode='r') as users:
        if f"{name},{pwd}" not in "".join(users.readlines()):
            return jsonify({"err": f"Error: invalid username/password combination '{name}'/'{pwd}'."})
        else:
            if name not in currently_logged_in:
                currently_logged_in.append(name)
                return jsonify({"name": name})
            else:
                return jsonify({"err": f"Error: user {name} already logged in"})

# Logs out a user
# Query args: name
@app.route('/api/v1/logout')
@cross_origin()
def logout():
    global currently_logged_in
    name = request.args.get("name")  # logout by username passed into the request
    if name not in currently_logged_in:
        return jsonify({"err": f"Error: user {name} not logged in"})
    else:
        currently_logged_in.remove(name)
        return jsonify({"feedback": f"Successfully logged out user {name}"})


# --------------------------------------------
# ACTUAL BOOK STUFF

# Returns a JSON object mapping book titles to IDs for a user's current set of books
# Query args: name
@app.route("/api/v1/getIDs")
@cross_origin()
def getIDs():
    with open("./books.json", mode='r') as bookFile:
        booksInProgress = json.load(bookFile)[request.args.get("name")]
    return jsonify({b["title"]: b["id"] for b in booksInProgress.values()})

# Adds a new book to the list of in-progress books for a user
# Query args: name, title, author, pages
@app.route("/api/v1/newBook")
@cross_origin()
def newBook():
    a = request.args
    with open("./books.json", mode='r') as bookFile:
        content = "".join(bookFile.readlines())
        if "{" not in content:
            books = {a.get("name"): {}}
        else:
            books = json.loads(content)
            if a.get("name") not in content:
                books[a.get("name")] = {}
    toAdd = {"id": str(uuid1()), "title": a.get("title"), "author": a.get("author"), "pages": int(a.get("pages")), "currentPages": 0, "cover_id": int(a.get("cover_id"))}
    books[a.get("name")][toAdd["id"]] = toAdd
    with open("./books.json", mode='w') as bookFile:
        json.dump(books, bookFile, indent=4)
    return jsonify(books[request.args.get("name")])

# Adds pages to the book with the given ID for the given user
# Query args: name, id, pages
@app.route("/api/v1/addPages")
@cross_origin()
def addPages():
    a = request.args
    with open("./books.json", mode='r') as bookFile:
        content = "".join(bookFile.readlines())
        books = json.loads(content)
    books[a.get("name")][a.get("id")]["currentPages"] += int(a.get("pages"))
    books[a.get("name")][a.get("id")]["currentPages"] = min(books[a.get("name")][a.get("id")]["currentPages"], books[a.get("name")][a.get("id")]["pages"])
    with open("./books.json", mode='w') as bookFile:
        json.dump(books, bookFile)
    return jsonify({"feedback": "Pages added!"})


# Checks if a book is complete
# Query args: name, id
@app.route("/api/v1/isComplete")
@cross_origin()
def isComplete():
    a = request.args
    with open("./books.json", mode='r') as bookFile:
        content = "".join(bookFile.readlines())
        books = json.loads(content)
    return jsonify(books[a.get("name")][a.get("id")]["currentPages"] == books[a.get("name")][a.get("id")]["pages"])


# Removes a book
# Query args: name, id
@app.route("/api/v1/removeBook")
@cross_origin()
def removeBook():
    a = request.args
    with open("./books.json", mode='r') as bookFile:
        content = "".join(bookFile.readlines())
    if a.get("id") not in content:
        return jsonify({"err": "Book not found."})
    books = json.loads(content)
    if "history" in list(books[a.get("name")].keys()):
        books[a.get("name")]["history"].insert(0, books[a.get("name")][a.get("id")])
    else:
        books[a.get("name")]["history"] = []
        books[a.get("name")]["history"].insert(0, books[a.get("name")][a.get("id")])
    del books[a.get("name")][a.get("id")]
    with open("./books.json", mode='w') as bookFile:
        json.dump(books, bookFile)
    return jsonify({"feedback": "Book removed!"})

# Gets the current state of a user's entire book collection
# Query args: name
@app.route("/api/v1/getCollection")
@cross_origin()
def getCollection():
    with open("./books.json", mode='r') as bookFile:
        try:
            content = "".join(bookFile.readlines())
            books = json.loads(content)
        except json.JSONDecodeError:
            return jsonify({"err": "Empty collection!"})

    return jsonify(books[request.args.get("name")])

# Gets the history of a user
# Query args: name
@app.route("/api/v1/getHistory")
@cross_origin()
def getHistory():
    a = request.args
    with open("./books.json", mode='r') as bookFile:
        content = "".join(bookFile.readlines())
    if a.get("name") not in content:
        return jsonify({"feedback": "User has no book record."})
    books = json.loads(content)
    if "history" not in list(books[a.get("name")].keys()):
        return jsonify({"err": "User has no history."})
    return jsonify(books[a.get("name")]["history"])

# Gets the stats of the user
# Query args: name
@app.route("/api/v1/getStats")
@cross_origin()
def getStats():
    a = request.args
    with open("./books.json", mode="r") as bookFile:
        content = "".join(bookFile.readlines())
    if a.get("name") not in content:
        return jsonify({"feedback": "User has no book record.", "booksRead": 0, "pagesRead": 0, "recommendations": 0})
    books = json.loads(content)
    pagesRead = 0
    booksRead = 0
    if "history" in list(books[a.get("name")].keys()):
        for book in books[a.get("name")]["history"]:
            pagesRead += book["currentPages"]
            if book["currentPages"] == book["pages"]:
                booksRead += 1
    for key, value in books[a.get("name")].items():
        if key == "history":
            continue
        pagesRead += value["currentPages"]
    return jsonify({"booksRead": booksRead, "pagesRead": pagesRead, "recommendations": 0})


# --------------------------------------------
# COMMUNITY STUFF

def generateJoinCode():
    code = ""
    for i in range(7):
        code += "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890"[randint(0, 61)]
    return code

# Creates a community with the given user as owner
# Query args: name
@app.route("/api/v1/createCommunity")
@cross_origin()
def createCommunity():
    joinCode = generateJoinCode()
    a = request.args
    with open("./community.json", mode='r') as commFile:
        content = "".join(commFile.readlines())
    if "{" not in content:
        communities = {joinCode: {"members": [a.get("name")], "owner": a.get("name")}}
    else:
        if a.get("name") in content:
            return jsonify({"err": "Already in a community."})
        communities = json.loads(content)
        communities[joinCode] = {"members": [a.get("name")], "owner": a.get("name")}
    with open("./community.json", mode='w') as commFile:
        json.dump(communities, commFile)
    return jsonify({"feedback": "Community created!"})

# Joins a community with a provided join code
# Query args: name, code
@app.route("/api/v1/joinCommunity")
@cross_origin()
def joinCommunity():
    a = request.args
    with open("./community.json", mode="r") as commFile:
        content = "".join(commFile.readlines())
    if a.get("code") not in content:
        return jsonify({"err": "Invalid community code."})
    if a.get("name") in content:
        return jsonify({"err": "Already in a community."})
    communities = json.loads(content)
    communities[a.get("code")]["members"].append(a.get("name"))
    with open("./community.json", mode='w') as commFile:
        json.dump(communities, commFile)
    return jsonify({"feedback": "Joined community!"})

# Returns information for the user's community
@app.route("/api/v1/getCommunity")
@cross_origin()
def getCommunity():
    a = request.args
    with open("./community.json", mode="r") as commFile:
        content = "".join(commFile.readlines())
    if a.get("name") not in content:
        return jsonify({"err": "Not in a community."})
    communities = json.loads(content)
    for code, community in communities.items():
        if a.get("name") in community["members"]:
            return jsonify({code: community})

@app.route("/api/v1/leaveCommunity")
@cross_origin()
def leaveCommunity():
    a = request.args
    with open("./community.json", mode="r") as commFile:
        content = "".join(commFile.readlines())
    communities = json.loads(content)
    if a.get("code") not in communities.keys():
        return jsonify({"err", "Invalid community code."})
    for code, community in communities.items():
        if a.get("code") == code and a.get("name") not in community["members"]:
            return jsonify({"err", "Not in specified community."})
        else:
            community["members"].remove(a.get("code"))
    with open("./community.json", mode="w") as commFile:
        json.dump(communities, commFile)
    return jsonify({"feedback": "Successfully left community."})


if __name__ == "__main__":
    app.run(port=8888)
