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

    return (
        <Fragment>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    context.createTodo({ name: addTodo });
                    setAddTodo('');
                }}
            >
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
                                    value={addTodo}
                                    onChange={(e) => setAddTodo(e.target.value)}
                                    label="New Task"
                                    fullWidth
                                />
                            </TableCell>
                            <TableCell align="right">
                                <IconButton type="submit">
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
                                        { editIsShown === todo.id ?
                                            <TextField 
                                                value={editTodo}
                                                onChange={e => setEditTodo(e.target.value)}
                                                InputProps={{
                                                    endAdornment: (
                                                        <Fragment>
                                                            <IconButton onClick={() => {setEditIsShown(false); setEditTodo('')}}><CloseIcon/></IconButton>
                                                            <IconButton onClick={() => {context.updateTodo({ id: todo.id, name: editTodo }); setEditIsShown(false); setEditTodo('')}}><DoneIcon/></IconButton>
                                                            
                                                        </Fragment>

                                                    )
                                                }}
                                                fullWidth
                                            />
                                            : todo.name
                                        }
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => {setEditIsShown(todo.id); setEditTodo(todo.name)}}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => {
                                            setDeleteConfirmationIsShown(true);
                                            setTodoToDelete(todo);
                                        }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </form>
            {todoToDelete &&
                <DeleteDialog open={deleteConfirmationIsShown} setDeleteConfirmationIsShown={setDeleteConfirmationIsShown} todo={todoToDelete} />
            }
        </Fragment>
    );
}
