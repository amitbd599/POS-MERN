import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import OrderStore from "../store/OrderStore";
import { formatDate } from "../helper/helper";

const Invoice = () => {
  let { id } = useParams();
  let { orderDetailsByIdRequest } = OrderStore();
  let [data, setData] = useState([]);

  useEffect(() => {
    (() => {
      orderDetailsByIdRequest(id).then((res) => {
        if (res) {
          setData(res);
        }
      });
    })();
  }, [orderDetailsByIdRequest, id]);

  console.log(data);

  return (
    <div className=' invoice-container'>
      <div className='  radius-8'>
        <div className=' d-flex flex-wrap justify-content-between gap-3 border-bottom'>
          <div>
            <h3 className='text-xl'>Order id: {data?._id}</h3>
            <p className='mb-0 text-sm'>
              Order created: <strong>{formatDate(data?.createdAt)}</strong>
            </p>
            <p className='mb-0 text-sm'>
              Create by: <strong>{data?.user?.[0]?.name}</strong>
            </p>
            <p className='mb-0 text-sm'>
              Order status: <strong>{data?.status}</strong>
            </p>
          </div>
          <div className='d-grid justify-content-end text-end'>
            <div>
              <img
                src='/assets/img/logo.png'
                alt='image_icon'
                className='mb-8 logo__invoice'
              />
            </div>
            <p className='mb-1 text-sm'>Chittagong, Bangladesh</p>
            <p className='mb-0 text-sm'>admin@pos.com</p>
            <p className='mb-0 text-sm'> +88 01814 331350</p>
          </div>
        </div>
        <div className='py-28 px-20'>
          <div className='d-flex flex-wrap justify-content-between align-items-end gap-3'>
            <div>
              <h6 className='text-md'>Customer info:</h6>
              <table className='text-sm text-secondary-light'>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td className='ps-8'>: {data?.customer?.[0]?.name}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td className='ps-8'>: {data?.customer?.[0]?.address}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td className='ps-8'>: {data?.customer?.[0]?.number}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td className='ps-8'>: {data?.customer?.[0]?.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='mt-24'>
            <div className='table-responsive scroll-sm'>
              <table className='table bordered-table text-sm'>
                <thead>
                  <tr>
                    <th scope='col' className='text-sm'>
                      SL.
                    </th>
                    <th scope='col' className='text-sm'>
                      Items
                    </th>
                    <th scope='col' className='text-sm'>
                      Qty
                    </th>

                    <th scope='col' className='text-sm'>
                      Unit Price
                    </th>
                    <th scope='col' className='text-end text-sm'>
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.orderproducts?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.name}</td>
                      <td>{item?.quantity}</td>
                      <td>{item?.price}</td>
                      <td className='text-end'>
                        {parseInt(item?.quantity) * parseInt(item?.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='d-flex flex-wrap justify-content-between gap-3'>
              <div>
                <p className='text-sm mb-0'>Thanks for your business</p>
              </div>
              <div>
                <table className='text-sm'>
                  <tbody>
                    <tr>
                      <td className='pe-64'>Subtotal:</td>
                      <td className='pe-16'>
                        <span className='text-primary-light fw-semibold'>
                          {data?.totalAmount}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className='pe-64'>Discount:</td>
                      <td className='pe-16'>
                        <span className='text-primary-light fw-semibold'>
                          0.00
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className='pe-64 border-bottom pb-4'>Tax:</td>
                      <td className='pe-16 border-bottom pb-4'>
                        <span className='text-primary-light fw-semibold'>
                          0.00
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className='pe-64 pt-4'>
                        <span className='text-primary-light fw-semibold'>
                          Total:
                        </span>
                      </td>
                      <td className='pe-16 pt-4'>
                        <span className='text-primary-light fw-semibold'>
                          ৳ {data?.totalAmount}{" "}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='mt-64'>
            <p className='text-center text-secondary-light text-sm fw-semibold'>
              Thank you for your purchase!
            </p>
          </div>
          <div className='d-flex flex-wrap justify-content-between align-items-end mt-64'>
            <div className='text-sm border-top d-inline-block px-12'>
              Signature of Customer
            </div>
            <div className='text-sm border-top d-inline-block px-12'>
              Signature of Authorized
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-center'>
          <a
            href='javascript:window.print()'
            type='button'
            className='btn btn-sm   d-inline-flex align-items-center gap-1'
          >
            <Icon icon='basil:printer-outline' className='text-xl' />
            Print
          </a>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
