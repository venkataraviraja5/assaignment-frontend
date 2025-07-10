
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import ProductModal from './ProductModal';
import neverGiveUp from '../assets/never_giveup.jpg';

const DashboardProductCard = ({ product, getProducts }) => {
  const [showToast, setShowToast] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async () => {
    const token = localStorage.getItem('token')
    try {
      const res = await fetch(`https://assaignment-backend.onrender.com/api/products/${product._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });

      if (res.ok) {
        setShowToast(true);
        getProducts();
      } else {
        console.error('Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={neverGiveUp} alt="Product Image" />
        <Card.Body>
          <Card.Title>{product?.name}</Card.Title>
          <Card.Text>{product?.description}</Card.Text>
        </Card.Body>
        <div className="d-flex gap-3 p-3">
          <Button variant="warning" onClick={() => setShowEditModal(true)}>Edit</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </Card>

      <ProductModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        getProducts={getProducts}
        mode="edit"
        initialData={product} 
      />

      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Body className="text-white">Product deleted successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default DashboardProductCard;
