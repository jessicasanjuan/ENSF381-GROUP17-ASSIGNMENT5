from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Load course and testimonial data
with open('courses.json') as f:
    courses_data = json.load(f)

with open('testimonials.json') as f:
    testimonials_data = json.load(f)

# In-memory storage for registered students
students = []
student_id_counter = 1

@app.route('/register', methods=['POST'])
def register():
    global student_id_counter
    data = request.get_json()
    username = data.get('username')

    # Check for duplicate username
    for student in students:
        if student['username'] == username:
            return jsonify({"message": "Username already taken."}), 409

    new_student = {
        "id": student_id_counter,
        "username": username,
        "password": data.get('password'),
        "email": data.get('email'),
        "enrolled_courses": []
    }
    students.append(new_student)
    student_id_counter += 1
    return jsonify({"message": "Registration successful."}), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    for student in students:
        if student['username'] == username and student['password'] == password:
            return jsonify({"message": "Login successful.", "student_id": student['id']}), 200

    return jsonify({"message": "Invalid username or password."}), 401

@app.route('/testimonials', methods=['GET'])
def get_testimonials():
    return jsonify(random.sample(testimonials_data, 2))

@app.route('/enroll/<int:student_id>', methods=['POST'])
def enroll_course(student_id):
    data = request.get_json()
    course = data.get('course')

    for student in students:
        if student['id'] == student_id:
            if course not in student['enrolled_courses']:
                student['enrolled_courses'].append(course)
                return jsonify({"message": "Enrolled successfully."}), 200
            else:
                return jsonify({"message": "Already enrolled."}), 400

    return jsonify({"message": "Student not found."}), 404

@app.route('/drop/<int:student_id>', methods=['DELETE'])
def drop_course(student_id):
    data = request.get_json()
    course = data.get('course')

    for student in students:
        if student['id'] == student_id:
            if course in student['enrolled_courses']:
                student['enrolled_courses'].remove(course)
                return jsonify({"message": "Course dropped successfully."}), 200
            else:
                return jsonify({"message": "Course not found in enrolled list."}), 400

    return jsonify({"message": "Student not found."}), 404

@app.route('/courses', methods=['GET'])
def get_courses():
    return jsonify(courses_data)

@app.route('/student_courses/<int:student_id>', methods=['GET'])
def get_student_courses(student_id):
    for student in students:
        if student['id'] == student_id:
            return jsonify(student['enrolled_courses'])

    return jsonify([])

if __name__ == '__main__':
    app.run(debug=True)
