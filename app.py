import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import numpy as np
from flask import Flask,jsonify
from datetime import datetime
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

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

# Define a schema for the MotorCollision table
class MotorCollisionSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = MotorCollision
        load_instance = True

motor_collision_schema = MotorCollisionSchema()

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

@app.route("/")
def index():
    return "Hello World!"

@app.route("/api/v1.0/collision")
def read_all():
    # Query all records from the MotorCollision table
    all_collisions = session.query(MotorCollision).all()
    
    # Serialize the query results to JSON using the schema
    result = motor_collision_schema.dump(all_collisions, many=True)
    return jsonify(result)

@app.route("/collisions")
def get_collision():
    results = session.query(MotorCollision.latitude).all()

    return jsonify(list(np.ravel(results)))

if __name__ == "__main__":
    app.run(debug=True)
