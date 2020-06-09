import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { TodoContext } from '../contexts/TodoContext';

export default function DeleteDialog({ open, setDeleteConfirmationIsShown, todo }) {
    const context = useContext(TodoContext);

    function closeDialog() {
        setDeleteConfirmationIsShown(false);
    }

    return (
        <Dialog fullWidth maxWidth="sm" open={open} onClose={closeDialog}>
            <DialogTitle>Are you sure you wish to delete this todo?</DialogTitle>
            <DialogContent>
                {todo.name}
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Cancel</Button>
                <Button
                    onClick={() => {
                        context.deleteTodo(todo);
                        closeDialog();
                    }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setDeleteConfirmationIsShown: PropTypes.func.isRequired,
    todoId: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })
};

DeleteDialog.defaultProps = {
    todo: {
        id: null,
        name: ''
    }
}
