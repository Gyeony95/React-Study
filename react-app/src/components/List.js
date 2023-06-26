import React from 'react'

export default function List({todoData, setTodoData}) {



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

    const changeDataCompleted = (id) => {
    let newTodoData = todoData.map(data => {
      if(data.id === id){
        data.completed = !data.completed;
      }
      return data;
    })
    setTodoData(newTodoData);
  }

  return (
    <div>
        {todoData.map(data => (
             <div style={getStyle(data.completed)} key={data.id}>
             <input type="checkbox" defaultChecked={data.completed} onChange={() => changeDataCompleted(data.id)}></input>
             {data.title}
             <button style={btnStyle} onClick={() => handleClick(data.id)}>x</button>
           </div>
        ))}
    </div>
  )
}
