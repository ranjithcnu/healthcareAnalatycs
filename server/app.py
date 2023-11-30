from flask import Flask, request, jsonify,session
import mysql.connector
import logging
from flask_cors import CORS
import pickle
import numpy as np
from tkinter import *
from tkinter import messagebox
from flask_session import Session
import secrets
from datetime import datetime
import easygui



app = Flask(__name__)

cors = CORS(app, resources={
    r"/*": {
        "origins": "http://localhost:3000",
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})



app.config['SECRET_KEY'] = secrets.token_hex(16)
app.config['SESSION_COOKIE_NAME'] = 'test'
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_SECURE'] = False
app.config['SESSION_FILE_DIR'] = '/Users/varunsluckysmac/Downloads/healthbot 2/server/flask_session'

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

@app.route('/predict', methods=['OPTIONS'])
def options_for_predict():
    result = app.make_default_options_response()
    result.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    result.headers.add("Access-Control-Allow-Headers", "Content-Type")
    result.headers.add("Access-Control-Allow-Methods", "POST")
    result.headers.add("Access-Control-Allow-Methods", "GET")
    result.headers.add("Access-Control-Allow-Credentials", "true")
    return result


with open('../server/healthbot_model2.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    data = request.json
    
    try:
        input_data = [
            float(data['age']),
            float(data['sex']),
            float(data['chestPainType']),
            float(data['bloodPressure']),
            float(data['cholesterol']),
            float(data['bloodSugar']),
            float(data['maxHeartRate']),
            float(data['angina'])
        ]
 
    except ValueError:
        return jsonify({"error": "All input data must be numeric."}), 400

    input_data = np.array(input_data).reshape(1, -1)
    prediction = model.predict(input_data)
    print("the pred : ")
    print(prediction)
    results = int(prediction[0])
    if results == 2:
        if int(data['age']) > 45 and data['chestPainType'] == '1' or data['chestPainType'] == '2' or  int(data['bloodPressure']) > 150110 or int(data['cholesterol']) > 220 or int(data['bloodSugar']) >  135 or int(data['maxHeartRate']) > 120 or int(data['maxHeartRate']) < 60 :
            pred="There might be a problem in your health. Please consult a doctor"
        else:
            pred="You are having a healthy body. Keep it up!"
    else:
        pred="There might be a problem in your health. Please consult a doctor"

    result = jsonify({'result': pred})
    result.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    result.headers.add("Access-Control-Allow-Headers", "Content-Type")
    result.headers.add("Access-Control-Allow-Methods", "POST")
    result.headers.add("Access-Control-Allow-Credentials", "true")
    return result


@app.route('/api/signup', methods=['POST'])
def signup():
    db, cursor = get_db_cursor()
    try:
        data = request.get_json()
        
        
        username = data['username']
        name = data['name']
        email = data['email']
        age = int(data['age'])
        mobile = data['mobile']
        password = data['password']
        confirmPassword = data['confirmPassword']
        city = data['city']
        state = data['state']
        acc_type = data['acc_type']
        

        if password != confirmPassword:
            return jsonify({'message': 'Passwords do not match'}), 400

        cursor.execute("SELECT * FROM loginfo WHERE username = %s OR email = %s", (username, email))
        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({'message': 'Username or Email already exists'}), 400

        cursor.execute("""
            INSERT INTO loginfo (username, name, email, age, mobile, password, city, state, acc_type)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (username, name, email, age, mobile, password, city, state, acc_type)
        )
        db.commit()

        return jsonify({'message': 'Signup successful'}), 201

    except Exception as e:
        logging.error('Error processing signup request: %s', str(e))
        return jsonify({'error': 'An error occurred'}), 500
    finally:
        cursor.close()
        db.close()
        


@app.route('/api/login', methods=['POST'])
def login():
    global current_user
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
        current_user = username
        session['username'] = username
        print(username)
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
def fetch_user_data():
    global current_user
    username = current_user
    print("fetched",current_user)
    
    if not username:
        return jsonify({'message': 'User not logged in'}), 401

    db, cursor = get_db_cursor()
    cursor.execute("SELECT * FROM loginfo WHERE username = %s", (username,))
    user = cursor.fetchone()
    cursor.close()
    db.close()
    print("name",username)
    if user:

        return jsonify({
            'username': user[1],
            'name': user[2],
            'email': user[3],
            'age': user[4],
            'mobile': user[5],
            'city': user[7],
            'state': user[8]
        })
    else:
        return jsonify({'message': 'User not found'}), 404


@app.route('/api/update_profile', methods=['POST'])
def update_profile():
    db, cursor = get_db_cursor()
    data = request.get_json()
    try:
        cursor.execute("""
            UPDATE loginfo
            SET name=%s, email=%s, age=%s, mobile=%s, city=%s, state=%s
            WHERE username=%s
        """, (data['name'], data['email'], data['age'], data['mobile'], data['city'], data['state'], data['username']))
        db.commit()
        return jsonify({'message': 'Profile updated successfully'}), 200
    except Exception as e:
        logging.error('Error processing update request: %s', str(e))
        return jsonify({'error': 'An error occurred'}), 500
    finally:
        cursor.close()
        db.close()

@app.route('/api/save_heart_data', methods=['POST'])
def save_heart_data():
    global current_user
    db, cursor = get_db_cursor()
    try:
        data = request.get_json()
        
        
        username = current_user
        age = data['age']
        sex = data['sex']
        chestPainType = data['chestPainType']
        bloodPressure = data['bloodPressure']
        cholesterol = data['cholesterol']
        bloodSugar = data['bloodSugar']
        maxHeartRate = data['maxHeartRate']
        angina = data['angina']
        c_datetime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        
        cursor.execute("""
            INSERT INTO heart_health (username,age, sex, chestPainType, bloodPressure, cholesterol, bloodSugar, maxHeartRate, angina,c_datetime)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (username,age, sex, chestPainType, bloodPressure, cholesterol, bloodSugar, maxHeartRate, angina, c_datetime)
        )
        db.commit()

        return jsonify({'message': 'Data saved successfully'}), 201
    except Exception as e:
        logging.error('Error processing heart data request: %s', str(e))
        return jsonify({'error': 'An error occurred'}), 500
    finally:
        cursor.close()
        db.close()

@app.route('/api/fetch_heart_health', methods=['GET'])
def fetch_heart_health_data():
    global current_user
    username = current_user
    if not username:
        return jsonify({'message': 'User not logged in'}), 401

    db, cursor = get_db_cursor()
    try:
        cursor.execute("SELECT age, sex, chestPainType, bloodPressure, cholesterol, bloodSugar, maxHeartRate, angina, c_datetime FROM heart_health WHERE username = %s ORDER BY c_datetime DESC", (username,))

        data = cursor.fetchall()

        if data:
            heart_health_data = []
            for row in data:
                heart_health_data.append({
                    'age': row[0],
                    'sex': row[1],
                    'chestPainType': row[2],
                    'bloodPressure': row[3],
                    'cholesterol': row[4],
                    'bloodSugar': row[5],
                    'maxHeartRate': row[6],
                    'angina': row[7],
                    'c_datetime': row[8]
                })
            return jsonify(heart_health_data)
        else:
            return jsonify({'message': 'No heart health data found for the user'}), 404
    except Exception as e:
        logging.error('Error fetching heart health data: %s', str(e))
        return jsonify({'error': 'An error occurred'}), 500
    finally:
        cursor.close()
        db.close()
        
        
@app.route('/api/logout', methods=['POST'])
def logout():
    """
    Log the user out by clearing the session.
    """
    session.clear()
    return jsonify({'message': 'Logged out successfully'}), 200


@app.route('/api/get_usernames', methods=['GET'])
def get_usernames():
    try:
        db, cursor = get_db_cursor()
        cursor.execute("SELECT username FROM loginfo WHERE acc_type = 'patient'")
        usernames = [row[0] for row in cursor.fetchall()]
        return jsonify(usernames)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        db.close()



@app.route('/api/fetch_heart_health_data', methods=['GET'])
def fetch_heart_health_data_by_usernames():
    username = request.args.get('username')
    if not username:
        return jsonify({'message': 'Username not provided'}), 400

    try:
        db, cursor = get_db_cursor()
        cursor.execute(
            "SELECT age, sex, chestPainType, bloodPressure, cholesterol, bloodSugar, maxHeartRate, angina, c_datetime FROM heart_health WHERE username = %s ORDER BY c_datetime DESC", 
            (username,)
        )
        data = cursor.fetchall()
        heart_health_data = []
        for row in data:
            heart_health_data.append({
                'age': row[0],
                'sex': row[1],
                'chestPainType': row[2],
                'bloodPressure': row[3],
                'cholesterol': row[4],
                'bloodSugar': row[5],
                'maxHeartRate': row[6],
                'angina': row[7],
                'c_datetime': row[8]
            })
        return jsonify(heart_health_data)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'An error occurred'}), 500
    finally:
        cursor.close()
        db.close()



if __name__ == '__main__':
 
    app.run(debug=True)
