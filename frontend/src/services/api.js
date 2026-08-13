const API_URL = "http://localhost:5000";

export const getHomeData = async () => {
  const response = await fetch(`${API_URL}/api/home`);

  if (!response.ok) {
    throw new Error("Failed to fetch Home data");
  }

  return await response.json();
};

export const updateHomeData = async (homeData) => {
  const response = await fetch(`${API_URL}/api/home`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(homeData),
  });

  if (!response.ok) {
    throw new Error("Failed to update Home data");
  }

  return await response.json();
};

export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  return await response.json();
};