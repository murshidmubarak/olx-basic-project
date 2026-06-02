import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

import './ProductDetail.css';
import Footer from '../../components/commonComponents/Footer';
import Header from '../../components/commonComponents/Header';

export default function ProductDetail() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

        setProduct(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchProduct();

  }, [id]);

  if (loading) {
    return (
      <div className="detail-loading">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="detail-loading">
        Product not found
      </div>
    );
  }

  return (
    <>
    <Header/>
    <div className="detail-page">

      <button
        className="detail-back"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="detail-wrapper">

        {/* IMAGE */}

        <div className="detail-img-wrap">

          {
            product.image ? (

              <img
                src={product.image}
                alt={product.title}
                className="detail-img"
              />

            ) : (

              <div className="detail-img-placeholder">
                📷
              </div>

            )
          }

        </div>

        {/* INFO */}

        <div className="detail-info">

          <p className="detail-price">
            ₹ {Number(product.price).toLocaleString()}
          </p>

          <h1 className="detail-title">
            {product.title}
          </h1>

          <div className="detail-divider" />

          <div className="detail-meta-row">

            <span className="detail-label">
              Category
            </span>

            <span className="detail-value">
              {product.category}
            </span>

          </div>

          <div className="detail-meta-row">

            <span className="detail-label">
              Location
            </span>

            <span className="detail-value">
              📍 {product.location}
            </span>

          </div>

          {
            product.user && (

              <div className="detail-meta-row">

                <span className="detail-label">
                  Seller
                </span>

                <span className="detail-value">
                  {product.user.name}
                </span>

              </div>

            )
          }

          <div className="detail-divider" />

          <h3 className="detail-desc-title">
            Description
          </h3>

          <p className="detail-desc">
            {product.description}
          </p>

          <button className="detail-contact-btn">
            Contact Seller
          </button>

        </div>

      </div>

    </div>
    <Footer/>
    </>
  );
}