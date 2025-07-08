const CartTotalPanel = ({cartTotalAmount, shipping, handleCheckout}) => {
  return (
      <div className="col-lg-4">
        <div className="summary-card p-4 shadow-sm">
          <h5 className="mb-4">Order Summary</h5>
          <div className="d-flex justify-content-between mb-3">
            <span className="text-muted">Subtotal</span>
            <span>{cartTotalAmount}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span className="text-muted">Shipping</span>
            <span>{shipping}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between mb-4">
            <span className="fw-bold">Total</span>
            <span className="fw-bold">{cartTotalAmount + shipping}</span>
          </div>
          <br />
          <button className="btn btn-primary checkout-btn w-100 mb-3" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
          <div className="d-flex justify-content-center gap-2">
            <i className="bi bi-shield-check text-success"></i>
            <small className="text-muted">Secure checkout</small>
          </div>
        </div>
      </div>
  );
};

export default CartTotalPanel;
