import React, {Component} from "react";
import "./App.css"

export default class App extends Component {

  state = {
    todoData : [
    ],
    value : ""
  }

  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  }

  getStyle = (completed) =>{
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    }
  }

  


  handleClick = (id) => {
    let newData = this.state.todoData.filter(e => e.id !== id);
    this.setState({todoData : newData})
  }

  handleChange= (e) => {
    this.setState({value:e.target.value})
  }

  addItem = (e) => {
    e.preventDefault();

    let newTodo = {
      id: Date.now(),
      title: this.state.value,
      completed:false,
    };
    
    this.setState({todoData : [...this.state.todoData, newTodo], value:""});
  }


  changeDataCompleted = (id) => {
    let newTodoData = this.state.todoData.map(data => {
      if(data.id === id){
        data.completed = !data.completed;
      }
      return data;
    })
    this.setState({todoData: newTodoData});
  }

  render(){
    return(
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할일목록</h1>
          </div>

          {this.state.todoData.map(data => (
               <div style={this.getStyle(data.completed)} key={data.id}>
               <input type="checkbox" defaultChecked={data.completed} onChange={() => this.changeDataCompleted(data.id)}></input>
               {data.title}
               <button style={this.btnStyle} onClick={() => this.handleClick(data.id)}>x</button>
             </div>
          ))}


          <form style={{display:'flex'}} onSubmit={this.addItem}>
            <input 
            type="text" 
            name= "value" 
            style={{flex :'10', padding : '5px'}} 
            placeholder="해야할일을 입력하세요" 
            value={this.state.value}
            onChange={this.handleChange}
            ></input>
            <input type="submit" value="입력" className="btn" style={{flex : "1"}  }></input>
          </form>
        </div>
      </div>
    );
  }
}