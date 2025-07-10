import React,{useState,useEffect} from 'react'
import DashboardProductCard from '../components/DashboardProductCard';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProductModal from '../components/ProductModal';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [filter, setFilter] = useState('all');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // Fetch products from API
  const getProducts = async () => {
    try {
      const res = await fetch(
        `https://assaignment-backend.onrender.com/api/products/${filter}?page=1&limit=200`
      );

      if (res.ok) {
        const data = await res.json();
        // console.log(data.products,'....................')
        setProducts(data.products);

      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // intial api call
  useEffect(() => {
    getProducts();
  }, [filter]);

  //logout function
const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/signin'); // or '/signin' if that's your login route
};

  return (
    <div>
        <div>dashboard</div>

    <>
      <div className='d-flex gap-5'>
        <Button variant="primary" onClick={handleShow}>
         Add product
       </Button>

        <Button variant="primary" onClick={handleLogout} >
          logout
        </Button>

        <Button variant="primary" onClick={() => navigate('/')} >
          Home
        </Button>
      </div>

      <ProductModal show={show} handleClose={handleClose} getProducts={getProducts}/>
    </>
      <div className='d-flex flex-wrap'>
       {
        products?.map((item,index) => (
           <div key={index}>
             <DashboardProductCard product={item} getProducts={getProducts}/>
           </div>
        ))
       }
      </div>
    </div>
  )
}

export default Dashboard
