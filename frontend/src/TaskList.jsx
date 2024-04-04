import React from "react";

const TaskList=({tasks ,updateTask,updateCallback})=>{
    const onDelete=async(rollno)=>{
        try{
            const options={
                method:"DELETE"
            } 
            const response= await fetch(`http://127.0.0.1:5000/delete_task/${rollno}`,options)
            if(response.status===200){
                updateCallback()
            }else{
                console.error("Failed to Delete")
            }
        }catch(error){
            alert(error)
        }
    }
    return <div>
        <h2> Workflow Tasks </h2>
        <table>
            <thead>
                <tr>
                   <th>Name</th>
                   <th>Team</th>
                   <th>Task</th> 
                   <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task)=>(
                    <tr key={task.rollno}>
                        <td>{task.name}</td>
                        <td>{task.team}</td>
                        <td>{task.task}</td>
                        <td>
                            <button onClick={()=>updateTask(task)}>Update</button>
                            <button onClick={()=>onDelete(task.rollno)}>Delete</button>
                        </td>
                    </tr>
                )

                )}
            </tbody>
        </table>
    </div>
}

export default TaskList