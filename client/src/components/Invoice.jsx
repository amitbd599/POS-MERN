import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Link } from "react-router-dom";

const Invoice = () => {
  return (
    <div className='card'>
      <div className='card-header'>
        <div className='d-flex flex-wrap align-items-center justify-content-end gap-2'>
          <Link
            to='#'
            className='btn btn-sm btn-warning radius-8 d-inline-flex align-items-center gap-1'
          >
            <Icon icon='solar:download-linear' className='text-xl' />
            Download
          </Link>

          <button
            type='button'
            className='btn btn-sm btn-danger radius-8 d-inline-flex align-items-center gap-1'
          >
            <Icon icon='basil:printer-outline' className='text-xl' />
            Print
          </button>
        </div>
      </div>
      <div className='card-body py-40'>
        <div className='row justify-content-center' id='invoice'>
          <div className='col-lg-8'>
            <div className='shadow-4 border radius-8'>
              <div className='p-20 d-flex flex-wrap justify-content-between gap-3 border-bottom'>
                <div>
                  <h3 className='text-xl'>Order id: #3492</h3>
                  <p className='mb-0 text-sm'>Order created: 25/08/2020</p>
                  <p className='mb-0 text-sm'>Create by: Amit Biswas</p>
                  <p className='mb-0 text-sm'>Order status: Pending</p>
                  <p className='mb-0 text-sm'>Paid method: Cash</p>
                </div>
                <div className='d-grid justify-content-end text-end'>
                  <div>
                    <img
                      src='/assets/img/logo.png'
                      alt='image_icon'
                      className='mb-8 logo__invoice'
                    />
                  </div>
                  <p className='mb-1 text-sm'>
                    4517 Washington Ave. Manchester, Kentucky 39495
                  </p>
                  <p className='mb-0 text-sm'>random@gmail.com</p>
                  <p className='mb-0 text-sm'> +1 543 2198</p>
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
                          <td className='ps-8'>: Alex johan</td>
                        </tr>
                        <tr>
                          <td>Address</td>
                          <td className='ps-8'>: 4517 Washington Ave.USA</td>
                        </tr>
                        <tr>
                          <td>Phone</td>
                          <td className='ps-8'>: +1 543 2198</td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td className='ps-8'>: amitbd590@gmail.com</td>
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
                            Units
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
                        <tr>
                          <td>01</td>
                          <td>Apple's Shoes</td>
                          <td>5</td>
                          <td>PC</td>
                          <td>$200</td>
                          <td className='text-end'>$1000.00</td>
                        </tr>
                        <tr>
                          <td>02</td>
                          <td>Apple's Shoes</td>
                          <td>5</td>
                          <td>PC</td>
                          <td>$200</td>
                          <td className='text-end'>$1000.00</td>
                        </tr>
                        <tr>
                          <td>03</td>
                          <td>Apple's Shoes</td>
                          <td>5</td>
                          <td>PC</td>
                          <td>$200</td>
                          <td className='text-end'>$1000.00</td>
                        </tr>
                        <tr>
                          <td>04</td>
                          <td>Apple's Shoes</td>
                          <td>5</td>
                          <td>PC</td>
                          <td>$200</td>
                          <td className='text-end'>$1000.00</td>
                        </tr>
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
                                $4000.00
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className='pe-64'>Discount:</td>
                            <td className='pe-16'>
                              <span className='text-primary-light fw-semibold'>
                                $0.00
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
                                $1690
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
