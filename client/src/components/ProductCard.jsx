const ProductCard = ({ product , handleAddToCart}) => {

  return (
    <>
      <div className="col" key={product.id}>
        <div className="card h-100 shadow-sm">
          <img
            className="card-img-top"
            src={
              product.images?.[0]?.downloadUrl
                ? `http://localhost:9191${product.images[0].downloadUrl}`
                : "/images/no-image.png"
            }
            alt={product.name}
          />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.description}</p>
            <div className="d-flex justify-content-between align-items-center">
              <span className="h5 mb-0">{product.price}$</span>
              <button className="btn btn-outline-primary" onClick={() => handleAddToCart(product.id)}>
                <i className="bi bi-cart-plus"></i> Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
