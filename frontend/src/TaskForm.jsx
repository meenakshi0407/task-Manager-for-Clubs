import { useState } from "react";

const TaskForm=({})=>{
    const [name,setName]=useState("")
    const [team,setTeam]=useState("")
    const [task,setTask]=useState("")

    const OnSubmit =async(e)=>{
        e.preventDefault()

        const data={
            name,
            team,
            task
        }
        const url="http://127.0.0.1:5000/create_task"

        const options={
            method:"POST",
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
            //successful
        }
    }
    

    return (<form onSubmit={OnSubmit}>
        <div>
            <label htmlFor="name"> Name </label>
            <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="team"> Team </label>
            <input type="text" id="team" value={team} onChange={(e)=>setTeam(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="task"> Task</label>
            <input type="text" id="task" value={task} onChange={(e)=>setTask(e.target.value)}/>
        </div>
        <button type="submit">Create Task</button>
    </form>
    );
}
export default TaskForm