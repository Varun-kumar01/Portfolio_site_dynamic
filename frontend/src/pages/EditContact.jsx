import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

const EditContact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    officeHours: "",
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
    linkedin: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // LOAD CONTACT INFORMATION
  // ==========================================

  useEffect(() => {
    const loadContactContent = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/content"
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load contact content (${response.status})`
          );
        }

        const result = await response.json();

        console.log(
          "CONTACT DETAILS RESPONSE:",
          result
        );

        setFormData({
          email: result.contact?.email || "",

          phone: result.contact?.phone || "",

          address:
            result.contact?.address || "",

          officeHours:
            result.contact?.officeHours || "",

          facebook:
            result.social?.facebook || "",

          instagram:
            result.social?.instagram || "",

          twitter:
            result.social?.twitter || "",

          youtube:
            result.social?.youtube || "",

          linkedin:
            result.social?.linkedin || "",
        });

      } catch (error) {
        console.error(
          "Error loading contact content:",
          error
        );

        setError(
          error.message ||
          "Failed to load contact content"
        );

      } finally {
        setLoading(false);
      }
    };

    loadContactContent();

  }, []);


  // ==========================================
  // NORMAL INPUT CHANGE
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };


  // ==========================================
  // PHONE CHANGE
  // ==========================================

  const handlePhoneChange = (event) => {

    const value = event.target.value;

    setFormData((previousData) => ({
      ...previousData,
      phone: value,
    }));

  };


  // ==========================================
  // SAVE CONTACT INFORMATION
  // ==========================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

      setSaving(true);

      setMessage("");

      setError("");


      const response = await fetch(
        "http://localhost:5000/api/content/contact",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            email: formData.email,

            phone: formData.phone,

            address: formData.address,

            officeHours: formData.officeHours,

            facebook: formData.facebook,

            instagram: formData.instagram,

            twitter: formData.twitter,

            youtube: formData.youtube,

            linkedin: formData.linkedin,

          }),

        }
      );


      // SAFELY READ RESPONSE

      const result = await response.json();


      console.log(
        "CONTACT UPDATE RESPONSE:",
        result
      );


      if (!response.ok) {

        throw new Error(
          result.message ||
          "Failed to update contact information"
        );

      }


      setMessage(
        "Contact information updated successfully!"
      );


      // UPDATE FORM WITH LATEST DATA

      if (result.contact || result.social) {

        setFormData({

          email:
            result.contact?.email ||
            "",

          phone:
            result.contact?.phone ||
            "",

          address:
            result.contact?.address ||
            "",

          officeHours:
            result.contact?.officeHours ||
            "",

          facebook:
            result.social?.facebook ||
            "",

          instagram:
            result.social?.instagram ||
            "",

          twitter:
            result.social?.twitter ||
            "",

          youtube:
            result.social?.youtube ||
            "",

          linkedin:
            result.social?.linkedin ||
            "",

        });

      }

    } catch (error) {

      console.error(
        "Error updating contact:",
        error
      );

      setError(
        error.message ||
        "Something went wrong while updating contact information"
      );

    } finally {

      setSaving(false);

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-100 flex items-center justify-center">

        <p className="text-slate-600">

          Loading contact information...

        </p>

      </div>

    );

  }


  return (

    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      <div className="max-w-4xl mx-auto">


        {/* PAGE HEADER */}

        <div className="flex items-center justify-between mb-8">

          <div>

            <p className="text-sm font-semibold tracking-widest text-green-700">

              ADMIN PANEL

            </p>

            <h1 className="text-3xl font-bold text-slate-800 mt-1">

              Edit Contact Information

            </h1>

            <p className="text-slate-500 mt-2">

              Update contact details and social media links.

            </p>

          </div>


          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 border border-slate-300 bg-white hover:bg-slate-50 px-5 py-3 rounded-xl transition"
          >

            <ArrowLeft size={18} />

            Back

          </button>

        </div>


        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm"
        >


          {/* EMAIL */}

          <div className="mb-6">

            <label className="flex items-center gap-2 font-medium text-slate-700 mb-2">

              <Mail
                size={18}
                className="text-green-700"
              />

              Email

            </label>


            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
            />

          </div>


          {/* PHONE */}

          <div className="mb-6">

            <label className="flex items-center gap-2 font-medium text-slate-700 mb-2">

              <Phone
                size={18}
                className="text-green-700"
              />

              Phone

            </label>


            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="Enter phone number"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
            />

          </div>


          {/* ADDRESS */}

          <div className="mb-6">

            <label className="flex items-center gap-2 font-medium text-slate-700 mb-2">

              <MapPin
                size={18}
                className="text-green-700"
              />

              Office Address

            </label>


            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="4"
              placeholder="Enter office address"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600 resize-none"
            />

          </div>


          {/* OFFICE HOURS */}

          <div className="mb-8">

            <label className="flex items-center gap-2 font-medium text-slate-700 mb-2">

              <Clock
                size={18}
                className="text-green-700"
              />

              Office Hours

            </label>


            <input
              type="text"
              name="officeHours"
              value={formData.officeHours}
              onChange={handleChange}
              placeholder="Example: Monday - Saturday, 9:00 AM - 6:00 PM"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
            />

          </div>


          {/* SOCIAL MEDIA */}

          <div className="border-t border-slate-200 pt-8">

            <h2 className="text-xl font-bold text-slate-800 mb-6">

              Social Media Links

            </h2>


            <div className="space-y-5">


              {/* FACEBOOK */}

              <div>

                <label className="flex items-center gap-2 font-medium text-slate-700 mb-2">

                  <FaFacebook />

                  Facebook

                </label>


                <input
                  type="url"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  placeholder="https://facebook.com/..."
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
                />

              </div>


              {/* INSTAGRAM */}

              <div>

                <label className="flex items-center gap-2 font-medium text-slate-700 mb-2">

                  <FaInstagram />

                  Instagram

                </label>


                <input
                  type="url"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="https://instagram.com/..."
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
                />

              </div>


              {/* X / TWITTER */}

              <div>

                <label className="font-medium text-slate-700 mb-2 block">

                  X / Twitter

                </label>


                <input
                  type="url"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="https://x.com/..."
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
                />

              </div>


              {/* YOUTUBE */}

              <div>

                <label className="flex items-center gap-2 font-medium text-slate-700 mb-2">

                  <FaYoutube />

                  YouTube

                </label>


                <input
                  type="url"
                  name="youtube"
                  value={formData.youtube}
                  onChange={handleChange}
                  placeholder="https://youtube.com/..."
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
                />

              </div>


              {/* LINKEDIN */}

              <div>

                <label className="flex items-center gap-2 font-medium text-slate-700 mb-2">

                  <FaLinkedin />

                  LinkedIn

                </label>


                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/..."
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
                />

              </div>

            </div>

          </div>


          {/* SUCCESS MESSAGE */}

          {message && (

            <div className="mt-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">

              {message}

            </div>

          )}


          {/* ERROR MESSAGE */}

          {error && (

            <div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">

              {error}

            </div>

          )}


          {/* SAVE BUTTON */}

          <div className="flex justify-end mt-8">

            <button
              type="submit"
              disabled={saving}
              className="bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white px-8 py-3 rounded-xl font-semibold transition"
            >

              {saving
                ? "Saving..."
                : "Save Changes"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );
};

export default EditContact;