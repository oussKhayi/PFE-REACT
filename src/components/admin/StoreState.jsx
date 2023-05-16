import React from 'react'

const StoreState = () => {
  return (
    <div className="container text-light">
        <div className="row">
          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-blue order-card  shadow-sm">
              <div className="card-block">
                <h6 className="m-b-20 text-light">Orders Received</h6>
                <h2 className="text-right col-12 text-light d-flex justify-content-between">
                  <i className="fa fa-cart-plus f-left" />
                  <span>486</span>
                </h2>
                <p className="m-b-0">
                  Completed Orders<span className="f-right">351</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-green order-card  shadow-sm">
              <div className="card-block">
                <h6 className="m-b-20 text-light">Available Products</h6>
                <h2 className="text-right col-12 text-light d-flex justify-content-between">
                  <i className="fa-brands fa-product-hunt" />

                  <span>{allProducts.length}</span>
                </h2>
                <p className="m-b-0">
                  Out of stock Products<span className="f-right">0</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-yellow order-card  shadow-sm">
              <div className="card-block">
                <h6 className="m-b-20 text-light">Users Count</h6>
                <h2 className="text-right col-12 text-light d-flex justify-content-between">
                  <i className="fa fa-user f-left" />
                  <span>{allUsers ? allUsers.length : 0}</span>
                </h2>
                <p className="m-b-0">
                  Online users
                  <span className="f-right">
                    {onlineUsers ? onlineUsers.length : 0}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-pink order-card  shadow-sm">
              <div className="card-block">
                <h6 className="m-b-20 text-light">Orders Received</h6>
                <h2 className="text-right col-12 text-light d-flex justify-content-between">
                  <i className="fa fa-credit-card f-left" />
                  <span>486</span>
                </h2>
                <p className="m-b-0">
                  Completed Orders<span className="f-right">351</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default StoreState