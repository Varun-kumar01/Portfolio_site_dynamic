const API_URL = "http://localhost:5000/api";

// =====================================
// GET ALL WEBSITE CONTENT
// =====================================

export async function getWebsiteContent() {
  const response = await fetch(
    `${API_URL}/content`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load website content"
    );
  }

  return data;
}


// =====================================
// UPDATE HOME CONTENT
// =====================================

export async function updateHomeContent(homeData) {
  const response = await fetch(
    `${API_URL}/content/home`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(homeData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update home content"
    );
  }

  return data;
}


// =====================================
// UPLOAD HOME IMAGE
// =====================================

export async function uploadHomeImage(imageFile) {
  const formData = new FormData();

  formData.append(
    "image",
    imageFile
  );

  const response = await fetch(
    `${API_URL}/upload/home-image`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to upload image"
    );
  }

  return data;
}