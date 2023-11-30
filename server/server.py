from flask import Flask, session, jsonify, request
from flask_cors import CORS
from flask_session import Session
import logging
import secrets

import mysql.connector
import logging
from flask_cors import CORS
import pickle
import numpy as np


from datetime import datetime
import easygui


# Initialize Flask app
app = Flask(__name__)

# Enable logging
logging.basicConfig(level=logging.DEBUG)
app.debug = True
app.logger.setLevel(logging.DEBUG)

# Set up CORS for your React application
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Set the secret key for sessions
app.config['SECRET_KEY'] = secrets.token_hex(16)

# Use filesystem session (you can use other session types if required)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = '/Users/varunsluckysmac/Downloads/healthbot 2/server/flask_session'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
Session(app) 

print(app.config['SECRET_KEY'])

@app.before_request
def log_request():
    print(f"Incoming request: {request.method} {request.path}")



def get_db_cursor():
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="reactml"
    )
    return db, db.cursor()

@app.route('/api/login', methods=['POST'])
def login():
    db, cursor = get_db_cursor()
    data = request.get_json()
    username = data['username']
    password = data['password']
    acc_type = data['acc_type']

    cursor.execute("SELECT * FROM loginfo WHERE username = %s AND password = %s AND acc_type = %s", 
                       (username, password, acc_type))
    user = cursor.fetchone()

    cursor.close()
    db.close()
    

    if user:
        session['username'] = username
        print(f"DEBUG: Session after login: {session}")

        response = jsonify({'message': 'Login successful '})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "POST")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        return response
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/api/fetch_user_data', methods=['GET'])
def profile():
    # Logging the session retrieval
    logging.debug(f"Getting session username: {session.get('username')}")
    
    if 'username' in session:
        return jsonify({"username": session['username']}), 200
    else:
        return jsonify({"message": "Not logged in"}), 401

@app.route('/logout', methods=['GET'])
def logout():
    if 'username' in session:
        # Logging the session deletion
        logging.debug(f"Deleting session username: {session.get('username')}")
        
        del session['username']
        session.modified = True  # Explicitly marking session as modified

    return jsonify({"message": "Logged out"}), 200

if __name__ == '__main__':
    app.run(debug=True)
