from flask import request,jsonify
from config import db,app
from models import Tasks

@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks=Tasks.query.all()
    json_tasks=list(map(lambda x:x.to_json(),tasks))
    return jsonify({"tasks":json_tasks})



if __name__=="__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)

