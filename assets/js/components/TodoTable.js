import React, { useContext, useState, Fragment } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import DeleteDialog from './DeleteDialog';

export default function TodoTable() {
    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');
    const [editIsShown, setEditIsShown] = useState(null);
    const [editTodo, setEditTodo] = useState('');
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToDelete, setTodoToDelete] = useState(null);

    function onCreateSubmit(e) {
        e.preventDefault();
        context.createTodo({ name: addTodo });
        setAddTodo('');
    }

    function onEditSubmit(e, todoId) {
        e.preventDefault();
        context.updateTodo({ id: todoId, name: editTodo });
        setEditIsShown(false);
        setEditTodo('');
    }

    return (
        <Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Task</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <TextField
                                type='text'
                                value={addTodo}
                                onChange={(e) => setAddTodo(e.target.value)}
                                label="New Task"
                                fullWidth
                            />
                        </TableCell>
                        <TableCell align="right">
                            <IconButton onClick={onCreateSubmit}>
                                <AddIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    {context.todos
                        .slice()
                        .reverse()
                        .map((todo, i) => (
                            <TableRow key={'todo ' + i}>
                                <TableCell>
                                    {editIsShown === todo.id ? (
                                        <form onSubmit={onCreateSubmit}>
                                            <TextField
                                                type='text'
                                                value={editTodo}
                                                onChange={(e) => setEditTodo(e.target.value)}
                                                InputProps={{
                                                    endAdornment: (
                                                        <Fragment>
                                                            <IconButton
                                                                onClick={() => {
                                                                    setEditIsShown(false);
                                                                    setEditTodo('');
                                                                }}
                                                            >
                                                                <CloseIcon />
                                                            </IconButton>
                                                            <IconButton onClick={e => onEditSubmit(e, todo.id)}>
                                                                <DoneIcon />
                                                            </IconButton>
                                                        </Fragment>
                                                    ),
                                                }}
                                                fullWidth
                                                autoFocus
                                            />
                                        </form>
                                    ) : (
                                        todo.name
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        onClick={() => {
                                            setEditIsShown(todo.id);
                                            setEditTodo(todo.name);
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            setDeleteConfirmationIsShown(true);
                                            setTodoToDelete(todo);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            {todoToDelete && (
                <DeleteDialog
                    open={deleteConfirmationIsShown}
                    setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
                    todo={todoToDelete}
                />
            )}
        </Fragment>
    );
}
