import React from 'react';

const DeletePageConfirmation = ({ pageToDelete, onConfirmDelete, onCancelDelete }) => {
    if (!pageToDelete) return null;

    return (
        <div className="mt-3 text-center">
            <p>¿Estás seguro de eliminar la página "{pageToDelete}"?</p>
            <button
                type="button"
                className="btn btn-danger shadow-sm mr-2"
                onClick={onConfirmDelete}
            >
                Sí, eliminar
            </button>
            <button
                type="button"
                className="btn btn-outline-secondary shadow-sm m-1"
                onClick={onCancelDelete}
            >
                No, cancelar
            </button>
        </div>
    );
};

export default DeletePageConfirmation;