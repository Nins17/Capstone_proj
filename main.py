from flask import Flask
from flask import *
from flaskext.mysql import MySQL
import os

app = Flask(__name__)

app.secret_key = "diarec"
mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'  # Database user
app.config['MYSQL_DATABASE_PASSWORD'] = ''  # Database password
app.config['MYSQL_DATABASE_DB'] = 'diarec'  # Name of database
app.config['MYSQL_DATABASE_HOST'] = 'localhost'  # Hosting site
app.config['UPLOAD_FOLDER'] = 'static/files'

mysql.init_app(app)  

def get_db_cursor():
    conn = mysql.connect()
    cursor = conn.cursor()
    return cursor

@app.route('/')
def land():
    return render_template("land.html")

@app.route('/patient_home',methods=["POST","GET"])
def patient_home():
    return render_template("records.html",first_name=session["account"][2]) 

@app.route('/about',methods=["POST","GET"])
def about():
    return render_template("about.html",first_name=session["account"][2]) 

@app.route('/contact',methods=["POST","GET"])
def contact():
    return render_template("contact.html",first_name=session["account"][2]) 

@app.route('/login_patient',methods=["POST","GET"])
def login_patient():
    if request.method == "POST":
        patient_id = int(request.form["patient_id"])
        patient_password = str(request.form["patient_password"])
        
        
        cursor = get_db_cursor()
        cursor.execute('SELECT * FROM patient WHERE pat_id=%s AND pat_pass=%s',(patient_id,patient_password)) 
        account = cursor.fetchone()  # Instead of fetching one, fetch everything.
        patient_acc=[]
        if account:
            for i in account:
                patient_acc.append(i)
        else:
            flash( 'No Patient Found!','error')
            return redirect(url_for('land'))
            
        print(patient_acc)
        print(patient_id,patient_password)
        
        if patient_acc:
            session["patient_id"] = patient_id
            session["patient_password"] = patient_password
            session["account"]= patient_acc
        
            return render_template("records.html",first_name=session["account"][2])
        else:
            flash( 'No Patient Found!','error')
            return redirect(url_for('land'))
    
@app.route('/login_admin',methods=["POST","GET"])
def login_admin():
    pass

@app.route('/sign_out')
def sign_out():
    session.clear()
    flash('you have been logged out', 'success')
    return redirect(url_for('land'))
    

if __name__ =='__main__':
    app.run(debug=True)