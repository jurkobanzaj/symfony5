import React, { Component, createContext } from 'react'

export const TodoContext = createContext();

export default class TodoContextProvider extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             todos: [
                {
                    id: 0,
                    name: 'Learn Symfony'
                },
                {
                    id: 1,
                    name: 'Do a breakfast'
                }
            ]
        }
    }

    //create
    createTodo(todo) {
        var todos = [...this.state.todos];
        todos.push(todo);
        this.setState({todos});
    }

    //rea
    readTodo() {

    }

    //update
    updateTodo(data) {
        var todos = [...this.state.todos];
        let todo = todos.find(todo => todo.id === data.id);
        todo.name = data.name;
        this.setState({todos});
    }

    //delete
    deleteTodo() {

    }

    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this)
            }}>
                {this.props.children}
            </TodoContext.Provider>
        )
    }
}
