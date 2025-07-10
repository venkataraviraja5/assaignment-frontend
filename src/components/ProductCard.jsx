import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import neverGiveUp from '../assets/never_giveup.jpg';

const ProductCard = ({product}) => {
  return (
    
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={neverGiveUp} />
      <Card.Body>
        <Card.Title>{product?.name}</Card.Title>
        <Card.Text>Type:{product?.type}</Card.Text>
        <Card.Text>
          {product?.description}
        </Card.Text>
      </Card.Body>
    </Card>
   
  )
}

export default ProductCard
