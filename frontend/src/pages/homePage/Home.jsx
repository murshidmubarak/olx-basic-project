import { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import { Link } from 'react-router-dom';

import Header from '../../components/commonComponents/Header';
import Footer from '../../components/commonComponents/Footer';
import ProductCard from '../../components/homeComponents/ProductCard';

import { categories } from '../../constants/homeData';

export default function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState('All');

  // FETCH PRODUCTS

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await axios.get(
          'http://localhost:5000/api/products'
        );

        setProducts(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);

  // FILTER PRODUCTS

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter(
          (item) => item.category === activeCategory
        );

  return (
    <>
      <Header />

      <div className="home">

        {/* Categories */}

        <div className="categories">

          <button
            className={activeCategory === 'All' ? 'active' : ''}
            onClick={() => setActiveCategory('All')}
          >
            All
          </button>

          {
            categories.map((category) => (

              <button
                key={category}
                className={
                  activeCategory === category
                    ? 'active'
                    : ''
                }
                onClick={() =>
                  setActiveCategory(category)
                }
              >
                {category}
              </button>

            ))
          }

        </div>

        {/* Products */}

   <div className="products-grid">

  {
    loading ? (

      <h2>Loading...</h2>

    ) : (

      filteredProducts.map((product) => (

        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="product-link"
        >

          <ProductCard product={product} />

        </Link>

      ))

    )
  }

  </div>

      </div>

      <Footer />
    </>
  );
}