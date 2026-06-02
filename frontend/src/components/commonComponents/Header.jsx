// import { Link, useNavigate } from 'react-router-dom';
// import './Header.css';
// import arrowIcon from '../../assets/icons/icon-arrow.svg';
// import locationIcon from '../../assets/icons/icon-location.svg';
// import loginIcon from '../../assets/icons/icon-login.svg';
// import logo from '../../assets/images/olx_logo_2025.svg';
// import searchIcon from '../../assets/icons/icon-search.svg';


// export default function Header() {
//   const navigate = useNavigate();

//   return (
//     <header className="header">
//       <div className="header-container">

//         {/* Logo */}
//         <Link to="/" className="logo">
//           <img src={logo} alt="OLX" />
//         </Link>

//         {/* Location */}
//         <div className="location-box">
//           <img src={locationIcon} alt="location" />

//           <input
//             type="text"
//             placeholder="Search city, area or locality"
//             defaultValue="Kerala"
//           />

//           <img
//             src={arrowIcon}
//             alt="arrow"
//             className="arrow-icon"
//           />
//         </div>

//         {/* Search */}
//         <div className="search-box">
//           <input
//             type="text"
//             placeholder="Find Cars, Mobile Phones and more..."
//           />

//           <button>
//             <img src={searchIcon} alt="search" />
//           </button>
//         </div>

//         {/* Right Side */}
//         <div className="header-right">

//           <button
//             className="login-btn"
//             onClick={() => navigate('/login')}
//           >
//             Login
//           </button>

//           <button
//             className="sell-btn"
//             onClick={() => navigate('/sell')}
//           >
//             <img
//               src="/addButton-removebg-preview.png"
//               alt="sell"
//             />
//           </button>

//         </div>

//       </div>
//     </header>
//   );
// }



import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';

import { useAuth } from '../../context/AuthContext';

import './Header.css';

import arrowIcon from '../../assets/icons/icon-arrow.svg';

import locationIcon from '../../assets/icons/icon-location.svg';

import loginIcon from '../../assets/icons/icon-login.svg';

import logo from '../../assets/images/olx_logo_2025.svg';

import searchIcon from '../../assets/icons/icon-search.svg';

import sellImage from '../../assets/images/addButton-removebg-preview.png';

export default function Header() {

  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  const {
    user,
    logout,
  } = useAuth();

  const handleLogout = () => {

    logout();

    navigate('/login');

  };

  return (

    <header className="header">

      <div className="header-container">

        {/* LOGO */}

        <Link
          to="/"
          className="logo"
        >

          <img
            src={logo}
            alt="OLX"
          />

        </Link>

        {/* LOCATION */}

        <div className="location-box">

          <img
            src={locationIcon}
            alt="location"
          />

          <input
            type="text"
            placeholder="Search city, area or locality"
            defaultValue="Kerala"
          />

          <img
            src={arrowIcon}
            alt="arrow"
            className="arrow-icon"
          />

        </div>

        {/* SEARCH */}

        <div className="search-box">

          <input
            type="text"
            placeholder="Find Cars, Mobile Phones and more..."
          />

          <button>

            <img
              src={searchIcon}
              alt="search"
            />

          </button>

        </div>

        {/* RIGHT SIDE */}

        <div className="header-right">

          {
            user ? (

              <div className="profile-section">

                {/* PROFILE BUTTON */}

                <button
                  className="profile-btn"
                  onClick={() =>
                    setDropdownOpen(
                      !dropdownOpen
                    )
                  }
                >

                  <img
                    src={loginIcon}
                    alt="profile"
                    className="profile-icon"
                  />

                  <span className="profile-name">
                    {/* {user.name} */}
                    view profile
                  </span>

                  <img
                    src={arrowIcon}
                    alt="arrow"
                    className="profile-arrow"
                  />

                </button>

                {/* DROPDOWN */}

                {
                  dropdownOpen && (

                    <div className="profile-dropdown">
{/* 
                      <div className="dropdown-email">

                        {user.email}

                      </div> */}

                      <button
                        onClick={() => {

                          navigate('/myads');

                          setDropdownOpen(false);

                        }}
                      >
                        📋 My Ads
                      </button>

                      <button
                        onClick={() => {

                          handleLogout();

                          setDropdownOpen(false);

                        }}
                      >
                        🚪 Logout
                      </button>

                    </div>

                  )
                }

              </div>

            ) : (

              <button
                className="login-btn"
                onClick={() =>
                  navigate('/login')
                }
              >
                Login
              </button>

            )
          }

          {/* SELL BUTTON */}

          <button
            className="sell-btn"
            onClick={() =>

              user
                ? navigate('/sell')
                : navigate('/login')

            }
          >

            <img
              src={sellImage}
              alt="sell"
            />

          </button>

        </div>

      </div>

    </header>

  );
}