import React, { useEffect, useState } from 'react'
import Task from "./Task";
import "./Home.css";

const Home = () => {

    const InitialArray = localStorage.getItem("task")
    ?JSON.parse(localStorage.getItem("task"))
    :[];

    const [task, setTask] = useState(InitialArray);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const submitHandler=(e)=>{
        e.preventDefault();//this doesn't reload page while submitting
        setTask([...task,{ //this is the spread operator and this will add new object to end of list
            title,
            description
        }]);
        setDescription("");
        setTitle("");//this will empty the variable part

    }
    const deleteTask = (index)=>{
        const filterArr = task.filter((_,i)=>{
            return i!==index;
        })
        console.log(filterArr);
        setTask(filterArr);
    }
    useEffect(()=>{
      localStorage.setItem("setItem",JSON.stringify(task))
    },[task])
    return (
        <div className="container">
            <h1>Daily Goal</h1>
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder='tilte'
                    value={title}
                    onChange={(e)=>{
                        setTitle(e.target.value)
                    }}
                    
                />

                <textarea 
                    placeholder="Description"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)} //this will listen to change on screen 
                ></textarea>
                <button type="submit">Add</button>
            </form>

            {/**introduce javascript here */}
            {task.map((item,index)=>(
                <Task 
                key={index}
                title={item.title}
                description={item.description}
                deleteTask={deleteTask}
                index={index}
                />
            ))}
        </div>
    )
} 

export default Home