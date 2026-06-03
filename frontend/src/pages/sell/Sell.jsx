import { useState, useEffect } from 'react';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import './Sell.css';

import { CATEGORIES } from '../../constants/categories';

import { createProduct,getProductById,updateProduct} from '../../api/productApi';

export default function Sell() {

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
    location: '',
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {

    if (!isEditMode) return;

    const fetchProduct = async () => {

      try {

        const response = await getProductById(id);

        const product = response.data;

        setFormData({
          title: product.title,
          category: product.category,
          price: product.price,
          description: product.description,
          location: product.location,
        });

        setPreview(product.image);

      } catch (error) {

        console.log(error);

      }
    };

    fetchProduct();

  }, [id, isEditMode]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(
      URL.createObjectURL(file)
    );
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError('');

      const data = new FormData();

      data.append(
        'title',
        formData.title
      );

      data.append(
        'category',
        formData.category
      );

      data.append(
        'price',
        formData.price
      );

      data.append(
        'description',
        formData.description
      );

      data.append(
        'location',
        formData.location
      );

      if (image) {

        data.append(
          'image',
          image
        );

      }

      if (isEditMode) {

        await updateProduct(
          id,
          data
        );

      } else {

        await createProduct(
          data
        );

      }

      setSuccess(true);

    } catch (error) {

      setError(
        error.response?.data?.message ||
        'Something went wrong'
      );

    } finally {

      setLoading(false);

    }
  };

  if (success) {

    return (

      <div className="sell-success">

        <div className="sell-success-card">

          <div className="sell-success-icon">
            ✓
          </div>

          <h2>
            {isEditMode
              ? 'Ad Updated Successfully'
              : 'Ad Posted Successfully'}
          </h2>

          <button
            className="sell-btn"
            onClick={() =>
              navigate('/myads')
            }
          >
            Go To My Ads
          </button>

        </div>

      </div>

    );
  }

  return (

    <div className="sell-page">

      <div className="sell-card">

        <h2 className="sell-title">
          {isEditMode
            ? 'Edit Ad'
            : 'Post Your Ad'}
        </h2>

        <form
          className="sell-form"
          onSubmit={handleSubmit}
        >

          <div
            className="sell-image-upload"
            onClick={() =>
              document
                .getElementById('imageInput')
                .click()
            }
          >

            {preview ? (

              <img
                src={preview}
                alt="preview"
                className="sell-image-preview"
              />

            ) : (

              <>
                <span className="sell-upload-icon">
                  📷
                </span>

                <span>
                  Upload Image
                </span>
              </>

            )}

            <input
              type="file"
              id="imageInput"
              hidden
              accept="image/*"
              onChange={handleImage}
            />

          </div>

          <label className="sell-label">
            Title
          </label>

          <input
            type="text"
            name="title"
            placeholder="Enter title"
            className="sell-input"
            value={formData.title}
            onChange={handleChange}
          />

          <label className="sell-label">
            Category
          </label>

          <select
            name="category"
            className="sell-input"
            value={formData.category}
            onChange={handleChange}
          >

            <option value="">
              Select Category
            </option>

            {CATEGORIES.map((item) => (

              <option
                key={item}
                value={item}
              >
                {item}
              </option>

            ))}

          </select>

          <label className="sell-label">
            Price
          </label>

          <input
            type="number"
            name="price"
            placeholder="Enter price"
            className="sell-input"
            value={formData.price}
            onChange={handleChange}
          />

          <label className="sell-label">
            Description
          </label>

          <textarea
            name="description"
            placeholder="Enter description"
            className="sell-input sell-textarea"
            value={formData.description}
            onChange={handleChange}
          />

          <label className="sell-label">
            Location
          </label>

          <input
            type="text"
            name="location"
            placeholder="Enter location"
            className="sell-input"
            value={formData.location}
            onChange={handleChange}
          />

          {error && (
            <p className="sell-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="sell-btn"
            disabled={loading}
          >
            {loading
              ? 'Saving...'
              : isEditMode
              ? 'Update Ad'
              : 'Post Ad'}
          </button>

        </form>

      </div>

    </div>
  );
}

