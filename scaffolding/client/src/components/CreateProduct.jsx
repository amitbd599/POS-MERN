import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import ProductStore from "../store/ProductStore";
import { ErrorToast, IsEmpty } from "../helper/helper";
import { useNavigate } from "react-router-dom";
import CategoryStore from "../store/CategoryStore";
const CreateProduct = () => {
  let { productCreateRequest } = ProductStore();
  let { allCategoryRequest } = CategoryStore();
  let { nameRef, descriptionRef, priceRef, skuRef, stockQuantityRef } =
    useRef();
  let [category, setCategory] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await allCategoryRequest().then((res) => {
        // convert it for use React Select npm
        const data = res?.map((item) => ({
          ...item,
          value: item._id,
          label: item.name,
        }));
        setCategory(data);
      });
    })();
  }, [allCategoryRequest]);

  const [categoryId, setCategoryId] = useState("");
  const handleChange = (option) => {
    setCategoryId(option.value);
  };

  const customerCreate = async () => {
    let name = nameRef.value;
    let description = descriptionRef.value;
    let price = priceRef.value;
    let sku = skuRef.value;
    let stockQuantity = stockQuantityRef.value;

    if (
      IsEmpty(name) ||
      IsEmpty(description) ||
      IsEmpty(price) ||
      IsEmpty(sku) ||
      IsEmpty(stockQuantity) ||
      IsEmpty(categoryId)
    ) {
      ErrorToast("Please fill all required fields");
    } else {
      let result = await productCreateRequest({
        name,
        description,
        price: parseInt(price),
        sku,
        stockQuantity: parseInt(stockQuantity),
        categoryId,
      });
      if (result) {
        navigate("/all-product/1");
      }
    }
  };

  return (
    <>
      <div className='card'>
        <div className='card-header'>
          <h6 className='card-title mb-0'>Product Inputs</h6>
        </div>
        <div className='card-body'>
          <div className='row gy-3'>
            <div className='col-md-6'>
              <label className='form-label'>Product Name*</label>
              <input
                type='text'
                className='form-control'
                ref={(input) => (nameRef = input)}
              />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>Product Description*</label>
              <input
                type='text'
                className='form-control'
                ref={(input) => (descriptionRef = input)}
              />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>Product price*</label>
              <input
                type='number'
                className='form-control'
                ref={(input) => (priceRef = input)}
              />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>Product SKU(Unique)*</label>
              <input
                type='text'
                className='form-control'
                ref={(input) => (skuRef = input)}
              />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>Product category*</label>

              <Select
                className='basic-single'
                classNamePrefix='select'
                name='category'
                options={category}
                onChange={handleChange}
              />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>Product Stock Quantity*</label>
              <input
                type='number'
                className='form-control'
                ref={(input) => (stockQuantityRef = input)}
              />
            </div>
            <div className='col-12'>
              <button
                onClick={customerCreate}
                type='button'
                className='btn btn-primary-600 radius-8 px-20 py-11'
              >
                Create product
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
