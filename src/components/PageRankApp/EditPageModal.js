import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditPageModal = ({ page, show, onClose, onSave }) => {
    const [newPageName, setNewPageName] = useState(page);

    const handleSave = () => {
        onSave(newPageName);
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Página</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Nombre de la página</Form.Label>
                        <Form.Control
                            type="text"
                            value={newPageName}
                            onChange={(e) => setNewPageName(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditPageModal;