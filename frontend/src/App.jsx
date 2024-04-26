import { useState ,useEffect} from 'react'
import TaskList from './TaskList';
import './App.css'
import TaskForm from './TaskForm';

function App() {
  const [tasks,setasks]=useState([])
  const[isModelOpen,setIsModalOpen]=useState(false)
  const [currentTask,setcurrentask]=useState({})
  const [inputText, setInputText] = useState('');
  const [marqueeText, setMarqueeText] = useState('');

  const updateMarquee = () => {
    setMarqueeText(inputText);
  };

  useEffect(()=>{
  fetchtasks()
  },[])

  const fetchtasks = async()=>{
    const response=await fetch("http://127.0.0.1:5000/tasks")
    const data=await response.json()
    setasks(data.tasks)
    console.log(data.tasks)
  }

  const closeModal=()=>{
    setIsModalOpen(false)
    setcurrentask({})
  }
  const openEditModal=(task)=>{
    if(isModelOpen)return
    setcurrentask(task)
    setIsModalOpen(true)
  }
 
  const openCreatedModal=()=>{
    if(!isModelOpen) setIsModalOpen(true)
  }
  const onUpdate=()=>{
    closeModal()
    fetchtasks()
  }
  return<>
  <div className='marqueetag'>
        
          <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Enter Event Name!" style={{ padding: '8px', marginRight: '10px', width: '200px' }} />
          <button onClick={updateMarquee} style={{ padding: '8px 15px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Update Event</button>
      
          <marquee direction="left" scrollamount="5" style={{ color: 'white' }}>{marqueeText}</marquee>
      </div>

  <TaskList tasks={tasks} updateTask={openEditModal} updateCallback={onUpdate}/>
  <button onClick={openCreatedModal}>Create New Task</button>
  {isModelOpen && <div className='modal'>
    <div className='modal-content'>
      <span className='close' onClick={closeModal}>&times;</span>
      <TaskForm existingTask={currentTask}updateCallback={onUpdate} />
    </div>
    </div>}
 
  </>
}

export default App
