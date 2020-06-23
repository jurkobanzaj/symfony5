import React, { useContext, useState, Fragment } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import DeleteDialog from './DeleteDialog';

export default function TodoTable() {
    const context = useContext(TodoContext);
    const [addTodoTask, setAddTodoTask] = useState('');
    const [addTodoDescription, setAddTodoDescription] = useState('');
    const [editIsShown, setEditIsShown] = useState(null);
    const [editTodoTask, setEditTodoTsak] = useState('');
    const [editTodoDescription, setEditTodoDescription] = useState('');
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToDelete, setTodoToDelete] = useState(null);

    function onCreateSubmit(e) {
        e.preventDefault();
        context.createTodo({ task: addTodoTask, description: addTodoDescription });
        setAddTodoTask('');
        setAddTodoDescription('');
    }

    function onEditSubmit(e, todoId) {
        e.preventDefault();
        context.updateTodo({ id: todoId, task: editTodoTask, description: editTodoDescription });
        setEditIsShown(false);
        setEditTodoTsak('');
        setEditTodoDescription('');
    }

    return (
        <Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Task</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <TextField
                                type="text"
                                value={addTodoTask}
                                onChange={(e) => setAddTodoTask(e.target.value)}
                                label="New Task"
                                fullWidth
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                type="text"
                                value={addTodoDescription}
                                onChange={(e) => setAddTodoDescription(e.target.value)}
                                label="Description"
                                fullWidth
                                multiline
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
                                        <TextField
                                            type="text"
                                            value={editTodoTask}
                                            onChange={(e) => setEditTodoTsak(e.target.value)}
                                            fullWidth
                                            autoFocus
                                        />
                                    ) : (
                                        <Typography>{todo.task}</Typography>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editIsShown === todo.id ? (
                                        <TextField
                                            type="text"
                                            value={editTodoDescription}
                                            onChange={(e) => setEditTodoDescription(e.target.value)}
                                            fullWidth
                                        />
                                    ) : (
                                        <Typography>{todo.description}</Typography>
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {editIsShown === todo.id ? (
                                        <Fragment>
                                            <IconButton
                                                onClick={() => {
                                                    setEditIsShown(false);
                                                    setEditTodoTsak('');
                                                    setEditTodoDescription('');
                                                }}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                            <IconButton onClick={(e) => onEditSubmit(e, todo.id)}>
                                                <DoneIcon />
                                            </IconButton>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <IconButton
                                                onClick={() => {
                                                    setEditIsShown(todo.id);
                                                    setEditTodoTsak(todo.task);
                                                    setEditTodoDescription(todo.description);
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
                                        </Fragment>
                                    )}
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
