import axios from "axios";
import React, { useEffect, useState } from "react";

const CreateOrder = () => {
  const [rows, setRows] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  // Fetch products from API when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/read-product/2/1"
      );

      console.log(response.data.data.product);

      if (response.data && response.data.data.product) {
        setProducts(response.data.data.product);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle input change
  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  // Handle product selection change
  const handleProductChange = (index, productID) => {
    const selectedProduct = products.find(
      (product) => product._id === productID
    );

    if (selectedProduct) {
      const updatedRows = [...rows];
      updatedRows[index].productId = selectedProduct._id;
      updatedRows[index].price = selectedProduct.price;
      setRows(updatedRows);
    }
  };

  // Add new row
  const addNewRow = () => {
    setRows([...rows, { productId: "", qty: "1", price: "" }]);
  };

  // Remove row
  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [rows]);

  const calculateTotalPrice = () => {
    const total = rows.reduce((acc, row) => {
      const rowTotal = row.qty * row.price;
      return acc + (isNaN(rowTotal) ? 0 : rowTotal);
    }, 0);
    setTotalPrice(total);
  };

  console.log(totalPrice);

  return (
    <div className='order_table row mt-5'>
      <div className='col-lg-9'>
        <div className='card h-100 '>
          <div className='card-header'>
            <h5 className='card-title mb-0'>Order Products Table</h5>
          </div>
          <div className='card-body'>
            <div className='table-responsive'>
              <table
                className='table basic-table mb-0'
                cellPadding='10'
                cellSpacing='0'
              >
                <thead>
                  <tr>
                    <th style={{ width: "800px" }}>Product name</th>
                    <th style={{ width: "120px" }}>QTY</th>
                    <th style={{ width: "100px" }}>Price</th>
                    <th style={{ width: "100px" }}>Total</th>
                    <th style={{ width: "100px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <select
                          className='form-select'
                          value={row.productId}
                          onChange={(e) =>
                            handleProductChange(index, e.target.value)
                          }
                        >
                          <option value=''>Select Product</option>
                          {products.map((product, idx) => (
                            <option key={idx} value={product._id}>
                              {product.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          className='form-control'
                          type='number'
                          min={1}
                          value={row.qty}
                          onChange={(e) =>
                            handleInputChange(index, "qty", e.target.value)
                          }
                          placeholder='Quantity'
                        />
                      </td>
                      <td>
                        <p className='form-control'>{row.price}</p>
                      </td>
                      <td>
                        <p className='form-control'>{row.price * row.qty}</p>
                      </td>
                      <td>
                        {rows.length > 0 && (
                          <button
                            onClick={() => removeRow(index)}
                            type='button'
                            className='btn btn-danger-600 radius-8 px-10 py-8'
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='col-12 mt-10'>
                <button
                  onClick={addNewRow}
                  className='btn btn-info-600 radius-8 px-10 py-8'
                >
                  Add New Field
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-lg-3'>
        <div className='card '>
          <div className='card-body p-0'>
            <div className='p-24 border-bottom'>
              <div className='tab-content' id='pills-tabContent'>
                <div
                  className='tab-pane fade show active'
                  id='pills-Buy'
                  role='tabpanel'
                  aria-labelledby='pills-Buy-tab'
                  tabIndex={0}
                >
                  <div className=''>
                    <div>
                      <h6 className='mb-16 text-neutral-700'>Order info:</h6>
                    </div>
                    <div className=' mt-24'>
                      <h3 className='text-danger-600 mb-16'>${totalPrice}</h3>
                      <span className='text-neutral-500 text-sm'>
                        Order created by: <strong>Alex johan</strong>
                      </span>
                      <span className='text-neutral-500 text-sm'>
                        Order created date: <strong>24/12/2024</strong>
                      </span>
                    </div>

                    <button
                      type='button'
                      className='btn btn-primary text-md btn-sm px-12 py-16 w-100 radius-8 mt-24 pb-8'
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
