import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Toast, ToastContainer } from 'react-bootstrap';

const ProductModal = ({ show, handleClose, getProducts, mode = 'add', initialData = {} }) => {
  const [formData, setFormData] = useState({ name: '', type: '', description: '' });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (show) {
      if (mode === 'edit' && initialData?._id) {
        setFormData({
          name: initialData.name || '',
          type: initialData.type || '',
          description: initialData.description || '',
        });
      } else {
        setFormData({ name: '', type: '', description: '' });
      }
      setErrors({});
    }
  }, [show]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.type) newErrors.type = 'Type is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem('token')
      const url =
        mode === 'add'
          ? 'https://assaignment-backend.onrender.com/api/products'
          : `https://assaignment-backend.onrender.com/api/products/${initialData._id}`;

      const method = mode === 'add' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`, },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowToast(true);
        getProducts();
        handleClose();
      } else {
        const errorData = await response.json();
        alert(errorData?.message || 'Failed to save product');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{mode === 'add' ? 'Add Product' : 'Edit Product'}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formType" className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                isInvalid={!!errors.type}
              >
                <option value="">Select type</option>
                <option value="fruit">Fruit</option>
                <option value="vegetable">Vegetable</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.type}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Optional description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {mode === 'add' ? 'Save Product' : 'Update Product'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <ToastContainer position="top-end" className="p-3">
        <Toast bg="success" onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>
            Product {mode === 'add' ? 'added' : 'updated'} successfully
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default ProductModal;
