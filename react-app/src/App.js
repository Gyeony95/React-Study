import React from "react";
import "./App.css"
import { useState } from "react";

export default function App() {

  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  const btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  }

  const getStyle = (completed) =>{
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    }
  }

  const handleClick = (id) => {
    let newData = todoData.filter(e => e.id !== id);
    setTodoData(newData)
  }

  const handleChange= (e) => {
    setValue(e.target.value)
  }

  const addItem = (e) => {
    e.preventDefault();

    let newTodo = {
      id: Date.now(),
      title: value,
      completed:false,
    };
    setTodoData(prev => [...prev, newTodo]);
    setValue("");
  }


  const changeDataCompleted = (id) => {
    let newTodoData = todoData.map(data => {
      if(data.id === id){
        data.completed = !data.completed;
      }
      return data;
    })
    setTodoData(newTodoData);
  }

  return(
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할일목록</h1>
        </div>

        {todoData.map(data => (
             <div style={getStyle(data.completed)} key={data.id}>
             <input type="checkbox" defaultChecked={data.completed} onChange={() => changeDataCompleted(data.id)}></input>
             {data.title}
             <button style={btnStyle} onClick={() => handleClick(data.id)}>x</button>
           </div>
        ))}


        <form style={{display:'flex'}} onSubmit={addItem}>
          <input 
          type="text" 
          name= "value" 
          style={{flex :'10', padding : '5px'}} 
          placeholder="해야할일을 입력하세요" 
          value={value}
          onChange={handleChange}
          ></input>
          <input type="submit" value="입력" className="btn" style={{flex : "1"}  }></input>
        </form>
      </div>
    </div>
  );
}