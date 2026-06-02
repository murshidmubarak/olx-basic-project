import { useState } from "react";

import {getMyAds,deleteMyAd,updateMyAd,} from '../api/productService'

export function useMyAds() {
  const [ads, setAds] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const token =
    localStorage.getItem("token");

  const fetchAds = async () => {
    try {
      const data =
        await getMyAds(token);

      setAds(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeAd = async (id) => {
    try {
      await deleteMyAd(id, token);

      setAds((prev) =>
        prev.filter(
          (ad) => ad._id !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const editAd = async (
    id,
    formData
  ) => {
    try {
      setSaving(true);

      const updatedAd =
        await updateMyAd(
          id,
          formData,
          token
        );

      setAds((prev) =>
        prev.map((ad) =>
          ad._id === id
            ? updatedAd
            : ad
        )
      );
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  return {
    ads,
    loading,
    saving,
    fetchAds,
    removeAd,
    editAd,
  };
}