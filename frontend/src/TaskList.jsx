import React from "react";

const TaskList=({tasks})=>{
    return <div>
        <h2>Tasks </h2>
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
                            <button>Update</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                )

                )}
            </tbody>
        </table>
    </div>
}

export default TaskList