import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

const defaultHomeData = {
  badge: "",
  firstName: "",
  lastName: "",
  heading: "",
  description: "",
  electionYear: "",
  electionText: "",
  constituency: "",
  serviceYears: "",
  serviceText: "",
  heroImage: "",
};

export default function AdminHome() {
  const [homeData, setHomeData] = useState(defaultHomeData);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =====================================================
  // LOAD HOME DATA
  // =====================================================

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const response = await fetch(`${API_URL}/api/home`);

      if (!response.ok) {
        throw new Error("Backend connection failed");
      }

      const result = await response.json();

      if (result.success) {
        setHomeData({
          ...defaultHomeData,
          ...result.data,
        });
      } else {
        throw new Error(
          result.message || "Unable to load Home information"
        );
      }
    } catch (err) {
      console.error("LOAD HOME ERROR:", err);

      setError(
        "Unable to connect to backend. Make sure your backend is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setHomeData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  // =====================================================
  // SAVE HOME DATA
  // =====================================================

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await fetch(`${API_URL}/api/home`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(homeData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to save Home information"
        );
      }

      setHomeData({
        ...defaultHomeData,
        ...result.data,
      });

      setMessage(
        "✓ Home information updated successfully!"
      );
    } catch (err) {
      console.error("SAVE HOME ERROR:", err);

      setError(
        err.message || "Unable to save Home information"
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // RESET
  // =====================================================

  const handleReset = () => {
    loadHomeData();
  };

  // =====================================================
  // IMAGE UPLOAD
  // =====================================================

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    try {
      setUploading(true);
      setMessage("");
      setError("");

      const formData = new FormData();

      formData.append("image", file);

      const response = await fetch(
        `${API_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Image upload failed"
        );
      }

      setHomeData((prev) => ({
        ...prev,
        heroImage: result.imageUrl,
      }));

      setMessage(
        "✓ Image uploaded successfully. Click Save Changes to save it."
      );
    } catch (err) {
      console.error("IMAGE UPLOAD ERROR:", err);

      setError(
        err.message || "Unable to upload image"
      );
    } finally {
      setUploading(false);
    }
  };

  // =====================================================
  // LOADING SCREEN
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="animate-spin w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>

          <p className="text-gray-700 font-medium">
            Loading Home information...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // DASHBOARD
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-100">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="bg-white border-b shadow-sm">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="py-6">

            <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide">
              Admin Dashboard
            </p>

            <h1 className="text-3xl font-bold text-gray-900 mt-1">
              Home Page Management
            </h1>

            <p className="text-gray-500 mt-2">
              Edit and update the information displayed on the public Home page.
            </p>

          </div>

        </div>

      </div>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* SUCCESS MESSAGE */}

        {message && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 rounded-xl px-5 py-4">
            {message}
          </div>
        )}


        {/* ERROR MESSAGE */}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4">
            {error}
          </div>
        )}


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* =================================================
              LEFT / MAIN FORM
          ================================================= */}

          <div className="lg:col-span-2">

            <div className="bg-white rounded-2xl shadow-sm border p-6">

              <div className="mb-6">

                <h2 className="text-xl font-bold text-gray-900">
                  Home Page Information
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Update the text and statistics shown on the Home page.
                </p>

              </div>


              <div className="space-y-6">

                {/* BADGE */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Badge / Small Heading
                  </label>

                  <input
                    type="text"
                    name="badge"
                    value={homeData.badge}
                    onChange={handleChange}
                    placeholder="CABINET MINISTER • TELANGANA"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />

                </div>


                {/* FIRST NAME */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={homeData.firstName}
                    onChange={handleChange}
                    placeholder="ADLURI"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />

                </div>


                {/* LAST NAME */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    value={homeData.lastName}
                    onChange={handleChange}
                    placeholder="LAXMAN KUMAR"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />

                </div>


                {/* MAIN HEADING */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Main Heading
                  </label>

                  <input
                    type="text"
                    name="heading"
                    value={homeData.heading}
                    onChange={handleChange}
                    placeholder="Building a Better Telangana"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />

                </div>


                {/* DESCRIPTION */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={homeData.description}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Enter Home page description..."
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  />

                </div>


                {/* ELECTION INFORMATION */}

                <div>

                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Election Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div>

                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Election Year
                      </label>

                      <input
                        type="text"
                        name="electionYear"
                        value={homeData.electionYear}
                        onChange={handleChange}
                        placeholder="2023"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />

                    </div>


                    <div>

                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Election Text
                      </label>

                      <input
                        type="text"
                        name="electionText"
                        value={homeData.electionText}
                        onChange={handleChange}
                        placeholder="Elected MLA"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />

                    </div>

                  </div>

                </div>


                {/* CONSTITUENCY */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Constituency
                  </label>

                  <input
                    type="text"
                    name="constituency"
                    value={homeData.constituency}
                    onChange={handleChange}
                    placeholder="Dharmapuri"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />

                </div>


                {/* SERVICE INFORMATION */}

                <div>

                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Public Service Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div>

                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Service Years
                      </label>

                      <input
                        type="text"
                        name="serviceYears"
                        value={homeData.serviceYears}
                        onChange={handleChange}
                        placeholder="25+"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />

                    </div>


                    <div>

                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Service Text
                      </label>

                      <input
                        type="text"
                        name="serviceText"
                        value={homeData.serviceText}
                        onChange={handleChange}
                        placeholder="Years of Public Service"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />

                    </div>

                  </div>

                </div>


                {/* IMAGE */}

                <div>

                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Hero Image
                  </h3>

                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="block w-full text-sm text-gray-600 border border-gray-300 rounded-xl p-3"
                  />

                  <p className="text-xs text-gray-500 mt-2">
                    JPG, JPEG, PNG or WEBP. Maximum size: 5 MB.
                  </p>


                  {uploading && (
                    <p className="text-orange-600 text-sm mt-3">
                      Uploading image...
                    </p>
                  )}


                  {homeData.heroImage && (
                    <div className="mt-5">

                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Current Hero Image
                      </p>

                      <img
                        src={homeData.heroImage}
                        alt="Hero"
                        className="w-full max-w-md h-64 object-cover rounded-xl border"
                      />

                    </div>
                  )}

                </div>

              </div>


              {/* =================================================
                  BUTTONS
              ================================================= */}

              <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t">

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving || uploading}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition"
                >
                  {saving ? "Saving..." : "✓ Save Changes"}
                </button>


                <button
                  type="button"
                  onClick={handleReset}
                  disabled={saving}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-xl transition"
                >
                  Reset
                </button>

              </div>

            </div>

          </div>


          {/* =================================================
              RIGHT SIDE PREVIEW
          ================================================= */}

          <div>

            <div className="bg-white rounded-2xl shadow-sm border p-6 sticky top-6">

              <h2 className="text-xl font-bold text-gray-900 mb-5">
                Live Preview
              </h2>


              {/* IMAGE PREVIEW */}

              {homeData.heroImage ? (
                <img
                  src={homeData.heroImage}
                  alt="Home Preview"
                  className="w-full h-56 object-cover rounded-xl mb-5"
                />
              ) : (
                <div className="w-full h-56 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 mb-5">
                  No hero image uploaded
                </div>
              )}


              <p className="text-xs font-bold uppercase tracking-wide text-orange-600">
                {homeData.badge || "Badge"}
              </p>


              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                {homeData.firstName || "ADLURI"}{" "}
                {homeData.lastName || "LAXMAN KUMAR"}
              </h3>


              <h4 className="text-lg font-semibold text-orange-600 mt-3">
                {homeData.heading || "Building a Better Telangana"}
              </h4>


              <p className="text-sm text-gray-600 mt-3 leading-6">
                {homeData.description ||
                  "Home page description will appear here."}
              </p>


              <div className="grid grid-cols-2 gap-3 mt-5">

                <div className="bg-gray-50 rounded-xl p-4 text-center">

                  <p className="text-xl font-bold text-gray-900">
                    {homeData.electionYear || "2023"}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {homeData.electionText || "Elected MLA"}
                  </p>

                </div>


                <div className="bg-gray-50 rounded-xl p-4 text-center">

                  <p className="text-xl font-bold text-gray-900">
                    {homeData.serviceYears || "25+"}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {homeData.serviceText ||
                      "Years of Public Service"}
                  </p>

                </div>

              </div>


              <div className="mt-3 bg-gray-50 rounded-xl p-4 text-center">

                <p className="text-sm font-semibold text-gray-800">
                  {homeData.constituency || "Dharmapuri"}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Constituency
                </p>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}