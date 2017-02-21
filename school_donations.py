from flask import Flask
from flask import render_template, session, request, redirect
from pymongo import MongoClient
import pymongo
import json
from bson import json_util, ObjectId
from datetime import timedelta

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)
app = Flask(__name__)
app.secret_key = 'F12Zr47j\3yX R~X@H!jmM]Lwf/,?KT'
app.permanent_session_lifetime = timedelta(minutes=20)
def sumSessionCounter():
  try:
    session['counter'] += 1
  except KeyError:
    session['counter'] = 1

MONGO_URI = 'mongodb://root:root@ds035806.mlab.com:35806/heroku_66c2v8r0'
MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DSB_NAME = 'heroku_66c2v8r0'
COLLECTION_NAME = 'projects'
COLLECTION_NAME2 = 'test'
COLLECTION_NAME3 = 'usstates'
FIELDS = {'funding_status': True, 'school_state': True, 'resource_type': True, 'poverty_level': True,
         'date_posted': True, 'total_donations': True, 'school_metro': True, 'primary_focus_subject': True, '_id': False}
FIELDSJUSTSTATE = {'school_state': True, 'total_donations': True, '_id': False}
FIELDSSTATES = {'type': True, 'id': True, 'properties': True, 'geometry': True, 'coordinates': True, '_id': False}


@app.route('/')
def index():
    sumSessionCounter()
    return render_template("home.html")
@app.route('/SDD')

def SDD():
    return render_template("SDD.html")

@app.route('/map')
def map():
    def mongo_connect():
        try:
            conn = pymongo.MongoClient()
            conn = MongoClient(MONGO_URI)
            print "Mongo is connected!" + MONGO_URI
            return conn
        except pymongo.errors.ConnectionFailure, e:
            print "Could not connect to MongoDB: %s" % e
    User = session.get('adminName')
    print  User
    conn = mongo_connect()
    coll = conn[DSB_NAME][COLLECTION_NAME3]

    json_projects2 = []
    results = coll.find(projection=FIELDSSTATES, limit=51000)

    for result in results:
        json_projects2.append(result)
    json_projects2 = json.dumps(json_projects2)
    conn.close()
    python_data = json.loads(json_projects2)
    return render_template('school_map.html', USStates=json_projects2)

@app.route('/termsandconditions')
def termsandconditions():
    return render_template("termsandconditions.html")

@app.route('/donorsUS/projects')
def donor_projects():
    connection = MongoClient(MONGO_URI)
    collection = connection[DSB_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS, limit=51000)
    json_projects=[]
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects)
    connection.close()
    return json_projects

@app.route('/view_comments')
def view_comments():
    def mongo_connect():
        try:
            conn = pymongo.MongoClient()
            conn = MongoClient(MONGO_URI)
            print "Mongo is connected!" + MONGO_URI
            return conn
        except pymongo.errors.ConnectionFailure, e:
            print "Could not connect to MongoDB: %s" % e
    User = session.get('adminName')
    print  User
    conn = mongo_connect()
    coll = conn[DSB_NAME][COLLECTION_NAME2]
    json_projects2 = []
    results = coll.find({})
    for result in results:
        print result
        result = json.loads(json_util.dumps(result))
        json_projects2.append(result)
    json_projects2 = json.dumps(json_projects2)
    conn.close()
    python_data = json.loads(json_projects2)
    return render_template('view_comments.html', CommentsSTR=python_data, sessionStr=User)

@app.route('/clearSession', methods=('get', 'post'))
def clearSession():
    sumSessionCounter()
    session['adminName'] = ""
    session.clear()
    return ("Admin User Logged Out")

@app.route('/login', methods=('get', 'post'))
def login():
    sumSessionCounter()
    username = ""
    password = ""
    username = request.form['username'];
    password = request.form['password'];
    secretKey = "jsiwirjhcfbhsxnsjsyhkamkamnsbdbxjhsnnxdjnask"
    if username and password:
        if username == "John" and password =="MongoLogin123":
            session['adminName'] = secretKey
            return (username+password)
        else:
            return ("not correct username and or password")
    else:
        return("not correct username and or password")

@app.route('/delete_comments', methods=('get', 'post'))
def delete_comments():
    commentID1 = request.form['hidCommentID'];
    def mongo_connect():
        try:
            conn = pymongo.MongoClient()
            conn = MongoClient(MONGO_URI)
            print "Mongo is connected!"
            return conn
        except pymongo.errors.ConnectionFailure, e:
            print "Could not connect to MongoDB: %s" % e

    conn = mongo_connect()
    coll = conn[DSB_NAME]['test']
    result = coll.delete_one({"_id": ObjectId(commentID1)})
    return "comment deleted"

@app.route('/edit_comments', methods=('get', 'post'))
def edit_comments():
    commentID1 = request.form['hidCommentID'];
    firstname = ""
    lastname = ""
    email = ""
    comments = ""
    doc = ""
    firstname = request.form['editfirstname'];
    lastname = request.form['editlastname'];
    email = request.form['editemail'];
    comments = request.form['editcomments'];
    print commentID1
    print firstname
    print lastname
    print email
    print comments
    def mongo_connect():
        try:
            conn = pymongo.MongoClient()
            conn = MongoClient(MONGO_URI)
            print "Mongo is connected!"
            return conn
        except pymongo.errors.ConnectionFailure, e:
            print "Could not connect to MongoDB: %s" % e

    conn = mongo_connect()
    coll = conn[DSB_NAME]['test']
    result = coll.update_one(
        {"_id": ObjectId(commentID1)},
        {"$set": {"FirstName": firstname, "LastName": lastname, "Email": email, "Comments": comments}})
    return comments

@app.route('/view_comment', methods=('get', 'post'))
def view_comment():
    comment = request.args.getlist('comment')
    print comment
    comment = str(comment).strip('[]')
    comment = comment[14:-3]
    comment = comment.replace("}", "")
    print comment
    def mongo_connect():
        try:
            conn = pymongo.MongoClient()
            conn = MongoClient(MONGO_URI)
            print "Mongo is connected!" + MONGO_URI
            return conn
        except pymongo.errors.ConnectionFailure, e:
            print "Could not connect to MongoDB: %s" % e

    conn = mongo_connect()
    coll = conn[DSB_NAME][COLLECTION_NAME2]
    results = coll.find_one({"_id": ObjectId(comment)})
    print results
    return render_template('view_comment.html', strcomment=results, commentID=comment)

@app.route('/usstates')
def usstates():
    connection = MongoClient(MONGO_URI)
    collection = connection[DSB_NAME][COLLECTION_NAME3]
    projects = collection.find(projection=FIELDSSTATES, limit=51000)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects)
    connection.close()
    return json_projects

@app.route('/usstatesdonations')
def usstatesdonations():
    connection = MongoClient(MONGO_URI)
    collection = connection[DSB_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDSJUSTSTATE, limit=51000)
    state_list = []
    for project in projects:
        sstate = project['school_state']
        sstate = sstate.upper()
        state_list.append(sstate)
    from collections import Counter
    stateProjectsNumber = Counter(state_list)
    print stateProjectsNumber
    json_projects1 = json.dumps(stateProjectsNumber)
    connection.close()
    return json_projects1

@app.route('/add_comments', methods=['POST'])
def add_comments():
    import datetime
    firstname = request.form['firstname'];
    lastname = request.form['lastname'];
    email = request.form['email'];
    comments = request.form['comments'];
    def mongo_connect():
        try:
            conn = pymongo.MongoClient()
            conn = MongoClient(MONGO_URI)
            print "Mongo is connected!"
            return conn
        except pymongo.errors.ConnectionFailure, e:
            print "Could not connect to MongoDB: %s" % e

    conn = mongo_connect()
    coll = conn[DSB_NAME]['test']
    datenow = datetime.datetime.now()
    if firstname:
        doc = {"FirstName": firstname, "LastName": lastname, "Email": email, "Comments": comments, "CommentDate": datenow }
        coll.insert(doc)
    conn.close()
    return(firstname)

if __name__ == '__main__':
    app.run(debug=True)