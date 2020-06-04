import React, { Component, createContext } from 'react';
import axios from 'axios';

export const TodoContext = createContext();

export default class TodoContextProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: []
        };
        this.readTodo();
    }

    //create
    createTodo(todo) {
        axios.post('api/todo/create', todo)
            .then(response => {
                let data = [...this.state.todos];
                data.push(response.data.todo);
                this.setState({
                    todos: data
                });
            })
            .catch(error => {
                console.error(error);
            })
    }

    //readTodo
    readTodo() {
        axios.get('/api/todo/read')
            .then(response => {
                this.setState({
                    todos: response.data
                });
            })
            .catch(error => {
                console.error(error);
            })
    }

    //update
    updateTodo(data) {
        var todos = [...this.state.todos];
        let todo = todos.find((todo) => todo.id === data.id);
        todo.name = data.name;
        this.setState({ todos });
    }

    //delete
    deleteTodo() {}

    render() {
        return (
            <TodoContext.Provider
                value={{
                    ...this.state,
                    createTodo: this.createTodo.bind(this),
                    updateTodo: this.updateTodo.bind(this),
                    deleteTodo: this.deleteTodo.bind(this),
                }}
            >
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}
