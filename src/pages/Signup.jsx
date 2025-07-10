import React, { useState } from 'react';
import { Form, Button, Toast, ToastContainer, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate()

  //store form values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //check errors
  const validate = () => {
    const newErrors = {};
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!gmailRegex.test(formData.email)) {
      newErrors.email = 'Only Gmail addresses are allowed';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  //submit form here
  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
    try {
      const response = await fetch('https://assaignment-backend.onrender.com/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/signin')
        setShowToast(true);
        setFormData({ email: '', password: '' });
        setErrors({});
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Signup failed');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mb-4">Signup</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Gmail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your Gmail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>

          <div>
            <Link to={'/signin'}>Sign in</Link>
          </div>

          <ToastContainer position="top-end" className="p-3">
            <Toast
              onClose={() => setShowToast(false)}
              show={showToast}
              delay={3000}
              autohide
              bg="success"
            >
              <Toast.Header>
                <strong className="me-auto">Signup</strong>
              </Toast.Header>
              <Toast.Body className="text-white">Signup successful!</Toast.Body>
            </Toast>
          </ToastContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
