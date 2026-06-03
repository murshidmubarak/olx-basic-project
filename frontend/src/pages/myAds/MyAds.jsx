import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMyAds } from "../../hooks/useMyAds";
import Header from "../../components/commonComponents/Header";
import Footer from "../../components/commonComponents/Footer";

import "./MyAds.css";

export default function MyAds() {
  const navigate = useNavigate();
  const { ads, loading, fetchAds, removeAd } = useMyAds();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchAds();
  }, [navigate, token, fetchAds]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="myads-loading">
          <div className="myads-spinner" />
          <span>Loading your ads...</span>
        </div>
      );
    }

    if (!ads.length) {
      return (
        <div className="myads-empty-container">
          <div className="myads-empty-card">
            <div className="myads-empty-icon-wrap">
              <svg className="myads-empty-svg" viewBox="0 0 200 200" width="160" height="160">
                <path d="M 30 40 L 33 45 L 38 48 L 33 51 L 30 56 L 27 51 L 22 48 L 27 45 Z" fill="#ffce32" className="sparkle sparkle-1" />
                <path d="M 165 130 L 167 133 L 172 135 L 167 137 L 165 142 L 163 137 L 158 135 L 163 133 Z" fill="#ffce32" className="sparkle sparkle-2" />
                <path d="M 150 45 L 152 48 L 157 50 L 152 52 L 150 57 L 148 52 L 143 50 L 148 48 Z" fill="#002f34" opacity="0.6" className="sparkle sparkle-3" />
                <g className="floating-group">
                  <rect x="45" y="50" width="110" height="85" rx="14" fill="#ffffff" stroke="#002f34" strokeWidth="3.5" strokeDasharray="6 4" className="dashed-card-rect" />
                  <line x1="65" y1="72" x2="105" y2="72" stroke="#e1e3e4" strokeWidth="4" strokeLinecap="round" />
                  <line x1="65" y1="84" x2="90" y2="84" stroke="#e1e3e4" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="100" cy="115" r="22" fill="#ffce32" stroke="#002f34" strokeWidth="3.5" className="plus-circle" />
                  <path d="M 100 107 L 100 123 M 92 115 L 108 115" stroke="#002f34" strokeWidth="3.5" strokeLinecap="round" />
                </g>
              </svg>
            </div>

            <h3 className="myads-empty-title">Your listing wall is quiet</h3>
            <p className="myads-empty-text">
              You haven't posted any ads yet. Start selling your unused items to buyers in your area!
            </p>

            <button className="myads-empty-btn" onClick={() => navigate("/sell")}>
              <span>Start Selling</span>
              <svg className="btn-arrow" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="myads-page">
        <h2 className="myads-title">My Ads</h2>
        <div className="myads-list">
          {ads.map((ad) => (
            <div key={ad._id} className="myad-card">
              <img src={ad.image} alt={ad.title} className="myad-img" />
              <div className="myad-info">
                <p className="myad-price">?{ad.price}</p>
                <p className="myad-name">{ad.title}</p>
              </div>
              <div className="myad-actions">
                <button className="myad-edit-btn" onClick={() => navigate(`/edit-ad/${ad._id}`)}>Edit</button>
                <button className="myad-delete-btn" onClick={() => {
                  if (window.confirm('Are you sure you want to delete this ad?')) {
                    removeAd(ad._id);
                  }
                }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      {renderContent()}
      <Footer />
    </>
  );
}
