import { useState } from 'react';
import './Login.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


import logo from '../../assets/images/olx_logo_2025.svg';
import sellImage from '../../assets/images/addButton-removebg-preview.png';

import {
  registerUser,
  loginUser,
} from '../../api/authApi';

export default function Login() {

    const { login } = useAuth();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] =useState('');
  const [password, setPassword] = useState('');
 const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError('');

    try {

      setLoading(true);

      let res;

      /* REGISTER */

      if (isRegister) {

        res = await registerUser({
          name,
          email,
          password,
        });

      }

      /* LOGIN */

      else {

        res = await loginUser({
          email,
          password,
        });
      }

      /* SAVE TOKEN */


    login(res.data.user);

alert(res.data.message);

navigate('/');

      /* CLEAR INPUTS */

      setName('');
      setEmail('');
      setPassword('');

    } catch (error) {

      setError(
        error.response?.data?.message ||
        'Something went wrong'
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="login-page">

      <div className="login-wrapper">

        {/* Left Side */}

        <div className="login-card">

          <div className="login-logo">
            <img src={logo} alt="OLX" />
          </div>

          <h2 className="login-title">
            Help us become one of the safest places
            to buy and sell
          </h2>

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >

            {/* Name */}

            {isRegister && (

              <>
                <label className="login-label">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="login-input"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />
              </>
            )}

            {/* Email */}

            <label className="login-label">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="login-input"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            {/* Password */}

            <label className="login-label">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="login-input"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            {/* Error */}

            {error && (
              <p className="login-error">
                {error}
              </p>
            )}

            {/* Button */}

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >

              {loading
                ? 'Please wait...'
                : isRegister
                ? 'Register'
                : 'Login'}

            </button>

            {/* Toggle */}

            <button
              type="button"
              className="login-toggle"
              onClick={() => {

                setIsRegister(!isRegister);
                setError('');

              }}
            >

              {isRegister
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}

            </button>

          </form>

        </div>

        {/* Right Side */}

        <div className="login-side">

          <div className="side-content">

            <h2>
              Sell anything
              <br />
              easily on OLX
            </h2>

            <p>
              Buy and sell cars, mobiles,
              bikes, electronics and more.
            </p>

            <img
              src={sellImage}
              alt="sell"
              className="sell-image"
            />

            <ul>
              <li>Post ads for free</li>
              <li>Chat with buyers</li>
              <li>Sell faster nearby</li>
            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}
