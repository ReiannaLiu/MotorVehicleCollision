import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import numpy as np
from flask import Flask,jsonify
from datetime import datetime
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask import render_template

#################################################
# Database Setup
#################################################
engine = create_engine('sqlite:///Resources/collision_db.sqlite')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save references to each table
MotorCollision = Base.classes.motor_collisions
CollisionByZip = Base.classes.collision_by_zip

# Define a schema for the MotorCollision table
class MotorCollisionSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = MotorCollision
        load_instance = True

class CollisionByZipSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = CollisionByZip
        load_instance = True

motor_collision_schema = MotorCollisionSchema()
collision_by_zip_schema = CollisionByZipSchema()

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/infographic/<zip_code>")
def infographic(zip_code):
    return render_template('infographic.html', zip_code=zip_code)

@app.route("/api/v1.0/motor_collision")
def read_motor_collision():
    # Query all records from the MotorCollision table
    all_collisions = session.query(MotorCollision).all()
    
    # Serialize the query results to JSON using the schema
    result = motor_collision_schema.dump(all_collisions, many=True)
    return jsonify(result)

@app.route("/api/v1.0/motor_collision/<zip_code>")
def read_motor_collision_by_zip(zip_code):
    # Query all records from the MotorCollision table
    all_collisions = session.query(MotorCollision).filter(MotorCollision.zip_code == zip_code).all()
    
    # Serialize the query results to JSON using the schema
    result = motor_collision_schema.dump(all_collisions, many=True)
    return jsonify(result)

@app.route("/api/v1.0/collision_by_zip")
def read_collision_by_zip():
    # Query all records from the CollisionByZip table
    all_collisions = session.query(CollisionByZip).all()
    
    # Serialize the query results to JSON using the schema
    result = collision_by_zip_schema.dump(all_collisions, many=True)
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
