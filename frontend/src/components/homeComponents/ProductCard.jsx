import './ProductCard.css';

export default function ProductCard({ product }) {
  const priceValue = product?.price;
  const formattedPrice = Number.isFinite(Number(priceValue))
    ? new Intl.NumberFormat('en-IN').format(Number(priceValue))
    : '—';

  return (
    <div className="product-card">

      <img
        src={product?.image || ''}
        alt={product?.title || ''}
        className="product-image"
      />

      <div className="product-info">

        <h2 className="product-price">
          ₹ {formattedPrice}
        </h2>

        <p className="product-title">
          {product?.title || 'Untitled'}
        </p>

        <span className="product-location">
          {product?.location || 'Unknown'}
        </span>

      </div>

    </div>
  );
}