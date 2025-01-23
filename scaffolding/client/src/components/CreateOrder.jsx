import React, { useEffect, useState } from "react";
import Select from "react-select";
import ProductStore from "../store/ProductStore";
import UserStore from "../store/UserStore";
import moment from "moment";
import OrderStore from "../store/OrderStore";
import CustomerStore from "../store/CustomerStore";
import { useNavigate } from "react-router-dom";
const CreateOrder = () => {
  let navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [products, setProducts] = useState([]);
  const [customer, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState([]);
  const [singleCustomer, setSingleCustomer] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  let { allProductRequest } = ProductStore();
  let { profileDetails } = UserStore();
  let { orderCreateRequest } = OrderStore();
  let { allCustomerRequest, customerDetailsByIdRequest } = CustomerStore();

  const calculateTotalPrice = () => {
    const total = rows.reduce((acc, row) => {
      const rowTotal = row.qty * row.price;
      return acc + (isNaN(rowTotal) ? 0 : rowTotal);
    }, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    (async () => {
      await allProductRequest(500, 1).then(async (res) => {
        // convert it for use React Select npm
        const data = res?.product?.map((item) => ({
          ...item,
          value: item._id,
          label: item.name,
        }));
        setProducts(data);
      });
      allCustomerRequest(500, 1).then(async (res) => {
        // convert it for use React Select npm
        const data = res?.customer?.map((item) => ({
          value: item._id,
          label: item.name + " " + item.number,
        }));
        setCustomers(data);
      });
    })();
  }, [allProductRequest, allCustomerRequest]);

  // Handle input change
  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
    calculateTotalPrice();
  };

  // Handle product selection change
  const handleProductChange = (index, option) => {
    const selectedProduct = products.find(
      (product) => product.value === option?.value
    );

    if (selectedProduct) {
      const updatedRows = [...rows];
      updatedRows[index].productId = selectedProduct._id;
      updatedRows[index].price = selectedProduct.price;
      updatedRows[index].stockQuantity = selectedProduct.stockQuantity;
      setRows(updatedRows);
      calculateTotalPrice();
    }
  };

  // Add new row
  const addNewRow = () => {
    setRows([
      ...rows,
      { productId: "", qty: "1", price: "", stockQuantity: "" },
    ]);
  };

  // Remove row
  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleCustomerChange = async (option) => {
    setCustomerId(option?.value);
    await customerDetailsByIdRequest(option?.value).then((res) => {
      setSingleCustomer(res);
    });
  };

  const placeOrder = async () => {
    let products = () => {
      let arr = [];
      rows.forEach((row) => {
        if (row.productId) {
          arr.push({
            productId: row.productId,
            quantity: parseInt(row.qty),
          });
        }
      });
      return arr;
    };
    let userId = profileDetails?._id;

    let reqBody = { customerId, userId, products: products() };
    await orderCreateRequest(reqBody).then((res) => {
      if (res) {
        navigate("/all-order/1");
      }
    });
  };

  return (
    <div className='order_table one row mt-5'>
      <div className='col-xl-9'>
        <div className='card order__card '>
          <div className='card-header'>
            <h5 className='card-title mb-0'>Create an order</h5>
          </div>
          <div className='card-body'>
            <div className=''>
              <table
                className='table basic-table mb-0'
                cellPadding='10'
                cellSpacing='0'
              >
                <thead>
                  <tr>
                    <th style={{ width: "600px" }}>Product name</th>
                    <th style={{ width: "100px" }}>Stock</th>
                    <th style={{ width: "100px" }}>QTY</th>
                    <th style={{ width: "120px" }}>Price</th>
                    <th style={{ width: "120px" }}>Total</th>
                    <th style={{ width: "100px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <Select
                          key={index}
                          className='basic-single'
                          classNamePrefix='select'
                          name={`order-${index}`}
                          options={products}
                          onChange={(e) => handleProductChange(index, e)}
                        />
                      </td>
                      <td className='d-flex justify-content-center align-items-center py-3'>
                        <span
                          className={`badge text-sm fw-semibold  px-20 py-9 radius-4 text-white ${
                            row?.stockQuantity > 10
                              ? "text-success-600 bg-success-100"
                              : "text-danger-600 bg-danger-100"
                          }`}
                        >
                          {row.stockQuantity}
                        </span>
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
      <div className='col-xl-3'>
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
                      <h6 className='mb-16 text-neutral-700'>
                        Select Customer:
                      </h6>
                    </div>
                    <div className=' mt-24'>
                      <div>
                        <Select
                          className='basic-single'
                          classNamePrefix='select'
                          defaultValue={customer[0]}
                          name='color'
                          options={customer}
                          onChange={handleCustomerChange}
                        />
                      </div>

                      <div className='pt-16'>
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <strong>Name:</strong>
                              </td>
                              <td className='ps-3'>{singleCustomer?.name}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Number:</strong>
                              </td>
                              <td className='ps-3'>{singleCustomer?.number}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Email:</strong>
                              </td>
                              <td className='ps-3'>{singleCustomer?.email}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Address:</strong>
                              </td>
                              <td className='ps-3'>
                                {singleCustomer?.address}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='card mt-20'>
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
                      <h3 className='text-danger-600 mb-16'>৳ {totalPrice}</h3>
                      <span className='text-neutral-500 text-sm'>
                        Order by: <strong>{profileDetails?.name}</strong>
                      </span>
                      <br />
                      <span className='text-neutral-500 text-sm'>
                        Role: <strong>{profileDetails?.role}</strong>
                      </span>
                      <br />
                      <span className='text-neutral-500 text-sm'>
                        Email: <strong>{profileDetails?.email}</strong>
                      </span>
                      <br />
                      <span className='text-neutral-500 text-sm'>
                        Order created:{" "}
                        <strong>{moment().format("YYYY-MM-DD")}</strong>
                      </span>
                    </div>

                    <button
                      onClick={placeOrder}
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
