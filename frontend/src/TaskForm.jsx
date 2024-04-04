import { useState } from "react";

const TaskForm=({existingTask={},updateCallback})=>{
    const [name,setName]=useState(existingTask.name || "");
    const [team,setTeam]=useState(existingTask.team || "");
    const [task,setTask]=useState(existingTask.task || "");

    const updating=Object.entries(existingTask).length!==0

    const OnSubmit =async(e)=>{
        e.preventDefault()

        const data={
            name,
            team,
            task
        }
        const url="http://127.0.0.1:5000/"+ (updating? `update_task/${existingTask.rollno}`: "create_task")

        const options={
            method: updating? "PATCH":"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }
        const response= await fetch(url,options)
        if(response.status!==201 && response.status!==200){
            const data= await response.json()
            alert(data.message)
        }else{
           updateCallback()
        }
    }
    

    return (<form onSubmit={OnSubmit}>
        <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="team">Team</label>
            <input type="text" id="team" value={team} onChange={(e)=>setTeam(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="task">Task</label>
            <input type="text" id="task" value={task} onChange={(e)=>setTask(e.target.value)}/>
        </div>
        <button type="submit">{updating? "Update":"Create"}</button>
    </form>
    );
}
export default TaskForm