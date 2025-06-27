const CartItem = ({ item }) => {
  

  return (
    <>
      <div className="product-card p-3 shadow-sm">
        <div className="row align-items-center">
          <div className="col-md-2">
            <img
              src={
                item.product.images[0].downloadUrl
                  ? `http://localhost:9191${item.product.images[0].downloadUrl}`
                  : "/images/no-image.png"
              }
              alt={item.product.name}
              className="product-image"
            />
          </div>
          <div className="col-md-4">
            <h6 className="mb-1">{item.product.name}</h6>
            <p className="text-muted mb-0">{item.product.description}</p>
          </div>
          <div className="col-md-3">
            <div className="d-flex align-items-center gap-2">
             
            </div>
          </div>
          <div className="col-md-2">
            <span className="fw-bold">{`$${item.product.price}`}</span>
          </div>
          <div className="col-md-1">
            <i className="bi bi-trash remove-btn"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
