from config import db

class Tasks(db.Model):
    rollno = db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(80),nullable=False,unique=False)
    team=db.Column(db.String(80),nullable=False,unique=False)
    task=db.Column(db.String(80),nullable=False,unique=False)
    
    def to_json(self):
        return{
            "rollno":self.rollno,
            "name":self.name,
            "team":self.team,
            "task":self.task,
            
        }
    
    


