from flask import Flask, render_template, request
import mysql.connector

app = Flask(__name__)

@app.route('/')
def bookings():
    return render_template('index.html')  # Make sure this file exists

@app.route('/result', methods=['POST'])
def result():
    mydb = None
    try:
        # Step 1: Connect to the database
        mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            password="2912",
            database="project_work"
        )
        print("Connected to database")

        mycursor = mydb.cursor()

        # Step 2: Get form data
        result = request.form.to_dict()
        print("Form data received:", result)

        name = result['name']
        phone_number = int(result['phone_number'])
        otp = int(result['otp'])
        pickup_location = result['pickup_location']
        destination = result['destination']
        date = result['date']
        vehicle_type = result['vehicle_type']
        price = float(result['price'])  # assuming it's like 499.99

        # Step 3: Insert into database
        mycursor.execute("""
            INSERT INTO booking 
            (name, phone_number, otp, pickup_location, destination, date, vehicle_type, price)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, (name, phone_number, otp, pickup_location, destination, date, vehicle_type, price))
        
        mydb.commit()

        # Step 4: Get the ID of the inserted row
        mycursor.execute("SELECT LAST_INSERT_ID()")
        booking_id = mycursor.fetchone()[0]
        custom_id = f"2025S14AI{booking_id:03d}"  # Like 2025S14AI001

        mycursor.close()
        return f"Booking Successful! Your Booking ID is {custom_id}"

    except mysql.connector.Error as err:
        print("MySQL Error:", err)
    except Exception as e:
        print("Python Error:", e)
    finally:
        if mydb and mydb.is_connected():
            mydb.close()

    return "An error occurred during booking."

if __name__ == '__main__':
    app.run(debug=True)
