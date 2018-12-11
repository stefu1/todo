import React, { Component } from 'react';
import Todo from './Todo';
import { DB_CONFIG } from '../config';
import firebase from 'firebase/app';
import 'firebase/database';
import '../App.css';


class Todolist extends Component {

  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(DB_CONFIG);
    }

    this.database = firebase.database().ref().child('todos');

    this.state = {
      todos: [],
      newTodoContent: '',
    }

    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.writeTodo = this.writeTodo.bind(this);
    this.todoContent = props.todoContent;

  }

  //Setting user input to value of input box 
  handleUserInput(e) {
    this.setState({
      newTodoContent: e.target.value,
    })
  }

  //method that sets todoContent in todo from the input
  writeTodo() {
    this.addTodo(this.state.newTodoContent);

    this.setState({
      newTodoContent: '',
    })
  }

  componentWillMount() {
    const previousTodos = this.state.todos;

    // DataSnapshot
    this.database.on('child_added', snap => {
      previousTodos.push({
        id: snap.key,
        todoContent: snap.val().todoContent,
      })

      this.setState({
        todos: previousTodos
      })
    })



    this.database.on('child_removed', snap => {
      for (var i = 0; i < previousTodos.length; i++) {
        if (previousTodos[i].id === snap.key) {
          previousTodos.splice(i, 1);
        }
      }

      this.setState({
        todos: previousTodos
      })
    })
  }

  //adding to database
  addTodo(todo) {
    this.database.push().set({ todoContent: todo });
  }

  //removing from database
  removeTodo(todoId) {
    this.database.child(todoId).remove();
  }




  render() {
    return (

      <div className="todosWrapper">
        <div className="todosHeader">
          <div className="heading">To-Do List</div>
        </div>
        <div className="inputarea">
          <div className="formWrapper">
            <input className="todoInput"
              placeholder="Write a new todo..."
              value={this.state.newTodoContent}
              onChange={this.handleUserInput} />
            <button className="todoButton"
              onClick={this.writeTodo}>Add Todo</button>
          </div>
        </div>
        <div className="todosBody">
          { //returning todos
            this.state.todos.map((todo) => {
              return (
                <Todo todoContent={todo.todoContent}
                  todoId={todo.id}
                  key={todo.id}
                  removeTodo={this.removeTodo}
                />

              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Todolist;