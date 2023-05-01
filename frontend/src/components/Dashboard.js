import React from "react";
import ReactDOM from "react-dom";
import DataTable from "react-data-table-component";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import { Link,useNavigate} from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import {
   deleteCAR,listCARs
  } from '../actions/carAction'

function getNumberOfPages(rowCount, rowsPerPage) {
  return Math.ceil(rowCount / rowsPerPage);
}

function toPages(pages) {
  const results = [];
  for (let i = 1; i < pages; i++) {
    results.push(i);
  }
  return results;
}



// RDT exposes the following internal pagination properties
const BootyPagination = ({
  rowsPerPage,
  rowCount,
  onChangePage,
  onChangeRowsPerPage, // available but not used here
  currentPage
}) => {
  const handleBackButtonClick = () => {
    onChangePage(currentPage - 1);
  };

  const handleNextButtonClick = () => {
    onChangePage(currentPage + 1);
  };

  const handlePageNumber = (e) => {
    onChangePage(Number(e.target.value));
  };

  const pages = getNumberOfPages(rowCount, rowsPerPage);
  const pageItems = toPages(pages);
  const nextDisabled = currentPage === pageItems.length;
  const previosDisabled = currentPage === 1;

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            onClick={handleBackButtonClick}
            disabled={previosDisabled}
            aria-disabled={previosDisabled}
            aria-label="previous page"
          >
            Previous
          </button>
        </li>
        {pageItems.map((page) => {
          const className =
            page === currentPage ? "page-item active" : "page-item";

          return (
            <li key={page} className={className}>
              <button
                className="page-link"
                onClick={handlePageNumber}
                value={page}
              >
                {page}
              </button>
            </li>
          );
        })}
        <li className="page-item">
          <button
            className="page-link"
            onClick={handleNextButtonClick}
            disabled={nextDisabled}
            aria-disabled={nextDisabled}
            aria-label="next page"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

const BootyCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
  <div className="form-check">
    <input
      htmlFor="booty-check"
      type="checkbox"
      className="form-check-input"
      ref={ref}
      onClick={onClick}
      {...rest}
    />
    <label className="form-check-label" id="booty-check" />
  </div>
));

// default componet
function Dashoard() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  //selectors
  const carList = useSelector((state) => state.carList)
  const { loading, error, cars } = carList

  const productDelete = useSelector((state) => state.carDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const columns = [
  {
    name: "Category",
    selector: (row) => row.category,
    sortable: true
  },
  {
    name: "Model",
    selector: (row) => row.model,
    sortable: true
  },
  {
    name: "Color",
    selector: (row) => row.color,
    sortable: true,
    right: true
  },
  {
    name: "Price",
    selector: (row) => row.price,
    sortable: true,
    right: true
  },
  {
    name: "Year",
    selector: (row) => row.year,
    sortable: true,
    right: true
  },
  {
    button:true,
    cell: row => (
      <button
            type="button"
            class="btn btn-danger"
            onClick={() => deleteHandler(row._id)}
          >
            Delete
          </button>
    )
  },
  {
    button:true,
    cell: row => (
      <button
            type="button"
            class="btn btn-info"
            onClick={() => navigate('/edit', { state: row})}
          >
            Update
          </button>
    )
  }
];
   
  
  
    React.useEffect(() => {
      if (!userInfo) {
        navigate('/')
      }
      dispatch(listCARs())
    }, [
      dispatch,
      userInfo,
      successDelete,
    ])
  
    const deleteHandler = (id) => {
      if (window.confirm('Are you sure')) {
        dispatch(deleteCAR(id))
      }
    }
  
  return (
    <div>
    {loadingDelete && <Loader/>}
    {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
    {loading ? (
      <Loader />
    ) : error ? (
      <Message variant='danger'>{error}</Message>
    ) : (
    <div className="App">
        
      <button  class="btn btn-info" onClick={() => navigate('/add')}>Add</button>
      <div className="card">
        <DataTable
          title="Movies"
          columns={columns}
          data={cars}
          defaultSortFieldID={1}
          pagination
          paginationComponent={BootyPagination}
          selectableRows
          selectableRowsComponent={BootyCheckbox}
        />
      </div>
    </div>
    )}
    </div>
  );
}

export default Dashoard;
