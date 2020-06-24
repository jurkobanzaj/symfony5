import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TodoContextProvider from './contexts/TodoContext';
import TodoTable from './components/TodoTable';
import AppSnackbar from './components/AppSnackbar';
import DefaultThemeProvider from './components/themes/DefaultThemeProvider';

export default class App extends Component {
    render() {
        return (
            <DefaultThemeProvider>
                <TodoContextProvider>
                    <TodoTable />
                    <AppSnackbar />
                </TodoContextProvider>
            </DefaultThemeProvider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
