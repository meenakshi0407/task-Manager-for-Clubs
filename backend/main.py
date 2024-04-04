from flask import request,jsonify
from config import db,app
from models import Tasks

@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks=Tasks.query.all()
    json_tasks=list(map(lambda x:x.to_json(),tasks))
    return jsonify({"tasks":json_tasks})

@app.route("/create_task",methods=["POST"])
def create_task():
    name=request.json.get("name")
    team=request.json.get("team")
    task=request.json.get("task")

    if not name  or not  team or not task:
        return(
            jsonify({"message": "you must include name,team name and task"}),400,
        )
    new_task=Tasks(name=name,team=team,task=task)
    
    try:
        db.session.add(new_task)
        db.session.commit()
    except Exception as e:
        return jsonify({"message":str(e)}),400
    
    return jsonify({"message":"task created! "}),201

@app.route("/update_task/<int:user_id>",methods=["PATCH"])
def update_task(user_id):
    task=Tasks.query.get(user_id)

    if not task:
        return jsonify({"message":"student not found!"}),404
    
    data=request.json
    task.name=data.get("name",task.name)
    task.team=data.get("team",task.team)
    task.task=data.get("task",task.task)

    db.session.commit()

    return jsonify({"message":"student updated."}),200

@app.route("/delete_task/<int:user_id>",methods=["DELETE"])
def delete_task(user_id):
    task=Tasks.query.get(user_id)

    if not task:
        return jsonify({"message":"student not found!"}),404

    db.session.delete(task)
    db.session.commit()

    return jsonify({"message":"student deleted!"}),200


if __name__=="__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)

