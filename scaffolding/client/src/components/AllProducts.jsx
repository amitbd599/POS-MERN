import  { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DeleteAlert, formatDate } from "../helper/helper";
import ReactPaginate from "react-paginate";
import ProductStore from "../store/ProductStore";

const AllProducts = () => {
  let { allProduct, allProductRequest, deleteProductRequest } = ProductStore();
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await allProductRequest(10, 1);
    })();
  }, [allProductRequest]);

  const TotalData = allProduct?.totalCount;

  //! handelPageClick
  const handelPageClick = (event) => {
    let pageNo = event.selected;
    allProductRequest(10, pageNo + 1);
    navigate(`/all-product/${pageNo + 1}`);
  };

  //! deleteProfile
  let deleteProfile = async (id) => {
    DeleteAlert(deleteProductRequest, id).then(async (res) => {
      if (res) {
        await allProductRequest(10, parseInt(params.pageNo));
      }
    });
  };


  return (
    <div>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title mb-0'>All Products</h5>
        </div>
        <div className='card-body'>
          <div className='table-responsive'>
            <table className='table striped-table mb-0'>
              <thead>
                <tr>
                  <th scope='col'>Items</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>SKU</th>
                  <th scope='col'>Stock </th>
                  <th scope='col'>Last update </th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {allProduct?.product?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className='flex-grow-1'>
                          <h6 className='text-md mb-0 fw-normal fw-bold'>
                            {item?.name}
                          </h6>
                          <span className='text-sm text-secondary-light fw-normal'>
                            {item?.category?.[0]?.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className='text-sm text-secondary-light fw-bold'>
                        {item?.price}
                      </span>
                    </td>
                    <td>
                      <span className='text-sm text-secondary-light fw-bold'>
                        {item?.sku}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge text-sm fw-semibold  px-12 py-6 radius-4 text-white ${
                          item?.stockQuantity > 10
                            ? "text-success-600 bg-success-100"
                            : "text-danger-600 bg-danger-100"
                        }`}
                      >
                        {item?.stockQuantity}
                      </span>
                    </td>
                    <td>{formatDate(item?.updatedAt)}</td>
                    <td>
                      <span className='d-flex gap-3'>
                        <button
                          type='button'
                          className='btn btn-success-600 radius-8 px-14 py-6'
                        >
                          <Link to={`/update-product/${item?._id}`}>Edit</Link>
                        </button>
                        <button
                          onClick={() => deleteProfile(item?._id)}
                          type='button'
                          className='btn btn-danger-600 radius-8 px-14 py-6'
                        >
                          Delete
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24'>
            <span>Showing 1 to 10 of {TotalData} entries</span>
            {TotalData > 10 ? (
              <div>
                <ReactPaginate
                  className='pagination d-flex flex-wrap align-items-center gap-2 justify-content-center'
                  previousLabel='<'
                  nextLabel='>'
                  pageClassName='page-item'
                  activeClassName='active'
                  pageLinkClassName=' page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px  text-md'
                  previousLinkClassName='page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px  text-md'
                  nextLinkClassName='text-secondary-light'
                  activeLinkClassName=' active-link'
                  breakLabel='...'
                  pageCount={TotalData / 10}
                  initialPage={params.pageNo - 1}
                  pageRangeDisplayed={3}
                  onPageChange={handelPageClick}
                  type='button'
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
