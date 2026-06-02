import axios from "axios";

const API=`${import.meta.env.VITE_API_URL}/products`;

export const getMyAds = async (token) => {
  const { data } = await axios.get(
    `${API}/myads`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const deleteMyAd = async (id,token) => {
  await axios.delete(
    `${API}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateMyAd = async (id,formData,token) => {
    
  const { data } = await axios.put(
    `${API}/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};