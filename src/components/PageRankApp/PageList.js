import React, { useState, useRef } from 'react';
import DeletePageConfirmation from './DeletePageConfirmation';
import EditPageModal from './EditPageModal';
import useOutsideClick from '../../hooks/useOutsideClick'; // Importa el custom hook

const PageList = ({ pages, setPages, onEditPage }) => {
    const [pageToDelete, setPageToDelete] = useState('');
    const [pageToEdit, setPageToEdit] = useState(null);
    const [showDropdown, setShowDropdown] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    // Referencia para el menú desplegable
    const dropdownRef = useRef(null);

    // Cierra el menú desplegable si se hace clic fuera de él
    useOutsideClick(dropdownRef, () => {
        setShowDropdown(null);
    });

    const toggleDropdown = (page) => {
        setShowDropdown(showDropdown === page ? null : page);
    };

    const handleDeletePage = () => {
        if (pageToDelete) {
            const updatedPages = { ...pages };
            delete updatedPages[pageToDelete];
            Object.keys(updatedPages).forEach(page => {
                updatedPages[page] = updatedPages[page].filter(link => link !== pageToDelete);
            });
            setPages(updatedPages);
            setPageToDelete('');
        }
    };

    const handleEditPage = (page) => {
        setPageToEdit(page);
        setShowEditModal(true);
    };

    const handleSaveEdit = (newPageName) => {
        if (newPageName && newPageName !== pageToEdit) {
            onEditPage(pageToEdit, newPageName); // Llama a la función de edición en PageRankApp
        }
        setShowEditModal(false);
        setPageToEdit(null);
    };

    return (
        <div className="card mt-5 border-0 bg-white shadow-sm">
            <div className="card-body">
                <h5 className="card-title font-weight-bold text-green-500">Páginas Agregadas</h5>
                <ul className="list-unstyled">
                    {Object.entries(pages).map(([page, links]) => (
                        <li key={page} className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                                <div className="dropdown" ref={dropdownRef}>
                                    <button
                                        className="btn btn-link text-secondary p-0 me-2"
                                        onClick={() => toggleDropdown(page)}
                                        style={{ backgroundColor: 'transparent' }}
                                    >
                                        <i className="bi bi-three-dots-vertical"></i>
                                    </button>
                                    {showDropdown === page && (
                                        <div className="dropdown-menu show">
                                            <button
                                                className="dropdown-item"
                                                onClick={() => handleEditPage(page)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="dropdown-item text-danger"
                                                onClick={() => setPageToDelete(page)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <span>
                                    {page}: {links.join(', ')}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
                <DeletePageConfirmation
                    pageToDelete={pageToDelete}
                    onConfirmDelete={handleDeletePage}
                    onCancelDelete={() => setPageToDelete('')}
                />
                <EditPageModal
                    page={pageToEdit}
                    show={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleSaveEdit}
                />
            </div>
        </div>
    );
};

export default PageList;