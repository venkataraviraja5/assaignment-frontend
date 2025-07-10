import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import ProductCard from '../components/ProductCard';
import Pagination from 'react-bootstrap/Pagination';
import Header from '../components/Header';

const Home = () => {
  const [filter, setFilter] = useState('all');
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch products from API
  const getProducts = async () => {
    const apiResponse = await fetch(
      `https://assaignment-backend.onrender.com/api/products/${filter}?page=${page}&limit=2`
      // `https://assaignment-backend.onrender.com/api/products/all?page=1&limit=2`
    );

    if (apiResponse.ok) {
      const jsonResponse = await apiResponse.json();
      setProducts(jsonResponse.products);
      setTotalPages(jsonResponse.totalPages);
    }
  };

  useEffect(() => {
    getProducts();
  }, [filter, page]);

  // Handle filter dropdown
  const handleSelect = (eventKey) => {
    setFilter(eventKey.toLowerCase());
    setPage(1); // reset to first page on filter change
  };

  // Render pagination items
  const renderPaginationItems = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => setPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <div style={{ padding: '20px' }}>
      <Header />
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Filter
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="all">All</Dropdown.Item>
          <Dropdown.Item eventKey="vegetable">Vegetables</Dropdown.Item>
          <Dropdown.Item eventKey="fruit">Fruits</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '20px' }}>
        {products?.map((item, index) => (
          <ProductCard product={item} key={index} />
        ))}
      </div>

      {totalPages > 1 && (
        <div style={{ marginTop: '20px' }}>
          <Pagination>{renderPaginationItems()}</Pagination>
        </div>
      )}
    </div>
  );
};

export default Home;
