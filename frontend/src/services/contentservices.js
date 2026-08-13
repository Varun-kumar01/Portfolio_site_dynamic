const API_URL = "http://localhost:5000/api";

// ===============================
// GET HOME DATA
// ===============================
export async function getHomeData() {
  const response = await fetch(`${API_URL}/home`);

  if (!response.ok) {
    throw new Error("Failed to fetch home data");
  }

  const result = await response.json();

  return result.data;
}

// ===============================
// UPDATE HOME DATA
// ===============================
export async function updateHomeData(homeData) {
  const response = await fetch(`${API_URL}/home`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(homeData),
  });

  if (!response.ok) {
    throw new Error("Failed to update home data");
  }

  return await response.json();
}

// ===============================
// UPLOAD IMAGE
// ===============================
export async function uploadImage(file) {
  const formData = new FormData();

  formData.append("image", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  return await response.json();
}