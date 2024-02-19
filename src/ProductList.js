import React, { useState, useEffect } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  TextField,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [newProduct, setNewProduct] = useState({ product_name: '', product_description: '' });


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

 
  const handleAddProduct = async () => {
    try {
      const response = await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        fetchProducts();
        setOpenAddModal(false);
        setNewProduct({ product_name: '', product_description: '' });
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  
  const handleEditProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/products/${selectedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedProduct),
      });
      if (response.ok) {
        fetchProducts();
        setOpenEditModal(false);
      } else {
        console.error('Failed to edit product');
      }
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/products/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchProducts();
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <Button onClick={() => setOpenAddModal(true)}>Add Product</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Product Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>{product.product_description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => { setSelectedProduct(product); setOpenEditModal(true); }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteProduct(product.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

  
      <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <div>
          <TextField
            label="Product Name"
            value={newProduct.product_name}
            onChange={(e) => setNewProduct({ ...newProduct, product_name: e.target.value })}
          />
          <TextField
            label="Product Description"
            value={newProduct.product_description}
            onChange={(e) => setNewProduct({ ...newProduct, product_description: e.target.value })}
          />
          <Button onClick={handleAddProduct}>Add</Button>
        </div>
      </Modal>

      
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <div>
          <TextField
            label="Product Name"
            value={selectedProduct.product_name}
            onChange={(e) => setSelectedProduct({ ...selectedProduct, product_name: e.target.value })}
          />
          <TextField
            label="Product Description"
            value={selectedProduct.product_description}
            onChange={(e) => setSelectedProduct({ ...selectedProduct, product_description: e.target.value })}
          />
          <Button onClick={handleEditProduct}>Save</Button>
        </div>
      </Modal>
    </>
  );
};

export default ProductList;
