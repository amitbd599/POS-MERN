import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorToast, IsEmpty } from "../helper/helper";
import ProductStore from "../store/ProductStore";
import CategoryStore from "../store/CategoryStore";

const UpdateProduct = () => {
  let { id } = useParams();
  let { productDetailsByIdRequest, productUpdateByIdRequest } = ProductStore();
  let { allCategoryRequest, allCategory } = CategoryStore();
  const [categoryId, setCategoryId] = useState("");
  useEffect(() => {
    (async () => {
      await productDetailsByIdRequest(id).then((res) => {
        setProductData(res);
        setTimeout(() => {
          const Id = res?.categoryId;
          setCategoryId(Id);
        }, 200);
      });
      await allCategoryRequest();
    })();
  }, [productDetailsByIdRequest, allCategoryRequest, id]);

  let { nameRef, descriptionRef, priceRef, skuRef, stockQuantityRef } =
    useRef();
  let navigate = useNavigate();
  let [productData, setProductData] = useState({});

  const handleChange = (event) => {
    setCategoryId(event.target.value);
  };

  const productUpdate = async () => {
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
      let result = await productUpdateByIdRequest(
        {
          name,
          description,
          price: parseInt(price),
          sku,
          stockQuantity: parseInt(stockQuantity),
          categoryId,
        },
        id
      );
      if (result) {
        navigate("/all-product/1");
      }
    }
  };

  console.log(productData);

  return (
    <div className='card'>
      <div className='card-header'>
        <h6 className='card-title mb-0'>Product Update Inputs</h6>
      </div>
      <div className='card-body'>
        <div className='row gy-3'>
          <div className='col-md-6'>
            <label className='form-label'>Product Name</label>
            <input
              type='text'
              className='form-control'
              defaultValue={productData?.name}
              ref={(input) => (nameRef = input)}
            />
          </div>
          <div className='col-md-6'>
            <label className='form-label'>Product Description</label>
            <input
              type='text'
              className='form-control'
              defaultValue={productData?.description}
              ref={(input) => (descriptionRef = input)}
            />
          </div>
          <div className='col-md-6'>
            <label className='form-label'>Product price</label>
            <input
              type='text'
              className='form-control'
              defaultValue={productData?.price}
              ref={(input) => (priceRef = input)}
            />
          </div>
          <div className='col-md-6'>
            <label className='form-label'>Product SKU</label>
            <input
              type='text'
              className='form-control'
              defaultValue={productData?.sku}
              ref={(input) => (skuRef = input)}
            />
          </div>
          <div className='col-md-6'>
            <label className='form-label'>Product category</label>
            <select
              className='form-select'
              aria-label='Default select example'
              defaultValue={productData?.categoryId}
              value={categoryId || ""}
              onChange={handleChange}
            >
              <option selected=''>Open this select menu</option>
              {allCategory?.map((item, index) => (
                <option key={index} value={item?._id}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div>
          <div className='col-md-6'>
            <label className='form-label'>Product Stock Quantity</label>
            <input
              type='text'
              className='form-control'
              defaultValue={productData?.stockQuantity}
              ref={(input) => (stockQuantityRef = input)}
            />
          </div>
          <div className='col-12'>
            <button
              onClick={productUpdate}
              type='button'
              className='btn btn-primary-600 radius-8 px-20 py-11'
            >
              Update product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
