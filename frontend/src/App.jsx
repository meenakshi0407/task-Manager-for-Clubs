import { useState ,useEffect} from 'react'
import TaskList from './TaskList';
import './App.css'
import TaskForm from './TaskForm';

function App() {
  const [tasks,setasks]=useState([])

  useEffect(()=>{
  fetchtasks()
  },[])

  const fetchtasks = async()=>{
    const response=await fetch("http://127.0.0.1:5000/tasks")
    const data=await response.json()
    setasks(data.tasks)
    console.log(data.tasks)
  }

  return<>
  <TaskList tasks={tasks}/>
  <TaskForm/>
  </>
}

export default App
