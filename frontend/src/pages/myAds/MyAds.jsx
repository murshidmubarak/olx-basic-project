import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMyAds } from "../../hooks/useMyAds";

import "./MyAds.css";

export default function MyAds() {
  const navigate = useNavigate();

  const {ads,loading,fetchAds,removeAd,} = useMyAds();

  const token =
    localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchAds();
  }, []);

  if (loading) {
    return (
      <div className="myads-loading">
        Loading...
      </div>
    );
  }

  return (
    <div className="myads-page">
      <h2 className="myads-title">
        My Ads
      </h2>

      {ads.map((ad) => (
        <div
          key={ad._id}
          className="myad-card"
        >
          <img
            src={ad.image}
            alt={ad.title}
            className="myad-img"
          />

          <div className="myad-info">
            <p className="myad-price">
              ₹{ad.price}
            </p>

            <p className="myad-name">
              {ad.title}
            </p>
          </div>

          {/* <div className="myad-actions">
            <button
              className="myad-delete-btn"
              onClick={() =>
                removeAd(ad._id)
              }
            >
              Delete
            </button>
          </div> */}

          <div className="myad-actions">
  <button
    className="myad-edit-btn"
    onClick={() =>
      navigate(`/edit-ad/${ad._id}`)
    }
  >
    Edit
  </button>

  <button
    className="myad-delete-btn"
    onClick={() =>
      removeAd(ad._id)
    }
  >
    Delete
  </button>
</div>
        </div>
      ))}
    </div>
  );
}