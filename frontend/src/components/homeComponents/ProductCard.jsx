import './ProductCard.css';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.title}
        className="product-image"
      />

      <div className="product-info">

        <h2 className="product-price">
          ₹ {product.price.toLocaleString()}
        </h2>

        <p className="product-title">
          {product.title}
        </p>

        <span className="product-location">
          {product.location}
        </span>

      </div>

    </div>
  );
}