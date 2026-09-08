import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../services/authFetch";
import { API_BASE_URL } from "../config";
import { LayoutDashboard } from "lucide-react";

const Input = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
}) => (
  <div className="mb-6">
    <label className="block text-slate-700 font-medium mb-2">
      {label}
    </label>

    <input
      type="text"
      name={name}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-slate-300 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-orange-600"
    />
  </div>
);

const Textarea = ({
  label,
  name,
  value,
  onChange,
  rows = 5,
}) => (
  <div className="mb-6">
    <label className="block text-slate-700 font-medium mb-2">
      {label}
    </label>

    <textarea
      name={name}
      value={value || ""}
      onChange={onChange}
      rows={rows}
      className="w-full border border-slate-300 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-orange-600"
    />
  </div>
);

const ImageInput = ({
  label,
  preview,
  setSelected,
  setPreview,
  alt,
  onImageChange,
}) => (
  <div>
    <label className="block text-slate-700 font-medium mb-2">
      {label}
    </label>

    <input
      type="file"
      accept="image/*"
      onChange={(event) =>
        onImageChange(
          event,
          setSelected,
          setPreview
        )
      }
      className="w-full border border-slate-300 rounded-xl px-4 py-3"
    />

    {preview && (
      <img
        src={preview}
        alt={alt}
        className="mt-5 w-full max-w-md h-[300px] object-cover rounded-2xl border border-slate-200"
      />
    )}
  </div>
);

const EditHome = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    heroTitle: "",
    heroSubtitle: "",
    heroDescription: "",
    heroImage: "",

    aboutImage: "",
    aboutHeading: "",
    aboutDescription: "",
    feature1: "",
    feature2: "",
    feature3: "",
    feature4: "",
    stat1Number: "",
    stat1Text: "",
    stat2Number: "",
    stat2Text: "",

    focusLabel: "",
    focusHeading: "",
    focusDescription: "",

    focus1Title: "",
    focus1Description: "",
    focus2Title: "",
    focus2Description: "",
    focus3Title: "",
    focus3Description: "",
    focus4Title: "",
    focus4Description: "",

    developmentLabel: "",
    developmentHeading: "",
    developmentDescription: "",

    development1Title: "",
    development1Description: "",
    development1Image: "",

    development2Title: "",
    development2Description: "",
    development2Image: "",

    development3Title: "",
    development3Description: "",
    development3Image: "",

    development4Title: "",
    development4Description: "",
    development4Image: "",

    galleryLabel: "",
    galleryHeading: "",
    galleryDescription: "",
    galleryMainTitle: "",
    galleryMomentsNumber: "",
    galleryMomentsText: "",

    galleryImage1: "",
    galleryImage2: "",
    galleryImage3: "",
    galleryImage4: "",
    galleryImage5: "",

    newsLabel: "",
    newsHeading: "",
    newsDescription: "",

    featuredNewsDate: "",
    featuredNewsTitle: "",
    featuredNewsDescription: "",
    featuredNewsImage: "",

    news1Date: "",
    news1Title: "",
    news1Image: "",

    news2Date: "",
    news2Title: "",
    news2Image: "",

    contactLabel: "",
    contactHeading: "",
    contactDescription: "",
    contactPhone: "",
    contactEmail: "",
    contactOffice: "",
    contactButtonText: "",
  });

  const [selectedHeroImage, setSelectedHeroImage] =
    useState(null);

  const [selectedAboutImage, setSelectedAboutImage] =
    useState(null);

  const [
    selectedDevelopment1Image,
    setSelectedDevelopment1Image,
  ] = useState(null);

  const [
    selectedDevelopment2Image,
    setSelectedDevelopment2Image,
  ] = useState(null);

  const [
    selectedDevelopment3Image,
    setSelectedDevelopment3Image,
  ] = useState(null);

  const [
    selectedDevelopment4Image,
    setSelectedDevelopment4Image,
  ] = useState(null);

  const [
    selectedGalleryImage1,
    setSelectedGalleryImage1,
  ] = useState(null);

  const [
    selectedGalleryImage2,
    setSelectedGalleryImage2,
  ] = useState(null);

  const [
    selectedGalleryImage3,
    setSelectedGalleryImage3,
  ] = useState(null);

  const [
    selectedGalleryImage4,
    setSelectedGalleryImage4,
  ] = useState(null);

  const [
    selectedGalleryImage5,
    setSelectedGalleryImage5,
  ] = useState(null);

  const [
    selectedFeaturedNewsImage,
    setSelectedFeaturedNewsImage,
  ] = useState(null);

  const [
    selectedNews1Image,
    setSelectedNews1Image,
  ] = useState(null);

  const [
    selectedNews2Image,
    setSelectedNews2Image,
  ] = useState(null);

  const [previewHeroImage, setPreviewHeroImage] =
    useState("");

  const [previewAboutImage, setPreviewAboutImage] =
    useState("");

  const [
    previewDevelopment1Image,
    setPreviewDevelopment1Image,
  ] = useState("");

  const [
    previewDevelopment2Image,
    setPreviewDevelopment2Image,
  ] = useState("");

  const [
    previewDevelopment3Image,
    setPreviewDevelopment3Image,
  ] = useState("");

  const [
    previewDevelopment4Image,
    setPreviewDevelopment4Image,
  ] = useState("");

  const [
    previewGalleryImage1,
    setPreviewGalleryImage1,
  ] = useState("");

  const [
    previewGalleryImage2,
    setPreviewGalleryImage2,
  ] = useState("");

  const [
    previewGalleryImage3,
    setPreviewGalleryImage3,
  ] = useState("");

  const [
    previewGalleryImage4,
    setPreviewGalleryImage4,
  ] = useState("");

  const [
    previewGalleryImage5,
    setPreviewGalleryImage5,
  ] = useState("");

  const [
    previewFeaturedNewsImage,
    setPreviewFeaturedNewsImage,
  ] = useState("");

  const [
    previewNews1Image,
    setPreviewNews1Image,
  ] = useState("");

  const [
    previewNews2Image,
    setPreviewNews2Image,
  ] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadHomeContent = async () => {
      try {
        setLoading(true);

        const response = await authFetch(
          `${API_BASE_URL}/api/content`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load Home content"
          );
        }

        const data = await response.json();
        const home = data.home || {};

        setFormData({
          heroTitle: home.heroTitle || "",
          heroSubtitle: home.heroSubtitle || "",
          heroDescription:
            home.heroDescription || "",
          heroImage: home.heroImage || "",

          aboutImage: home.aboutImage || "",
          aboutHeading:
            home.aboutHeading || "",
          aboutDescription:
            home.aboutDescription || "",

          feature1: home.features?.[0] || "",
          feature2: home.features?.[1] || "",
          feature3: home.features?.[2] || "",
          feature4: home.features?.[3] || "",

          stat1Number:
            home.stats?.[0]?.number || "",
          stat1Text:
            home.stats?.[0]?.text || "",
          stat2Number:
            home.stats?.[1]?.number || "",
          stat2Text:
            home.stats?.[1]?.text || "",

          focusLabel:
            home.focusAreas?.label || "",
          focusHeading:
            home.focusAreas?.heading || "",
          focusDescription:
            home.focusAreas?.description || "",

          focus1Title:
            home.focusAreas?.items?.[0]?.title ||
            "",
          focus1Description:
            home.focusAreas?.items?.[0]
              ?.description || "",

          focus2Title:
            home.focusAreas?.items?.[1]?.title ||
            "",
          focus2Description:
            home.focusAreas?.items?.[1]
              ?.description || "",

          focus3Title:
            home.focusAreas?.items?.[2]?.title ||
            "",
          focus3Description:
            home.focusAreas?.items?.[2]
              ?.description || "",

          focus4Title:
            home.focusAreas?.items?.[3]?.title ||
            "",
          focus4Description:
            home.focusAreas?.items?.[3]
              ?.description || "",

          developmentLabel:
            home.developmentHighlights?.label ||
            "",
          developmentHeading:
            home.developmentHighlights?.heading ||
            "",
          developmentDescription:
            home.developmentHighlights
              ?.description || "",

          development1Title:
            home.developmentHighlights?.items?.[0]
              ?.title || "",
          development1Description:
            home.developmentHighlights?.items?.[0]
              ?.description || "",
          development1Image:
            home.developmentHighlights?.items?.[0]
              ?.image || "",

          development2Title:
            home.developmentHighlights?.items?.[1]
              ?.title || "",
          development2Description:
            home.developmentHighlights?.items?.[1]
              ?.description || "",
          development2Image:
            home.developmentHighlights?.items?.[1]
              ?.image || "",

          development3Title:
            home.developmentHighlights?.items?.[2]
              ?.title || "",
          development3Description:
            home.developmentHighlights?.items?.[2]
              ?.description || "",
          development3Image:
            home.developmentHighlights?.items?.[2]
              ?.image || "",

          development4Title:
            home.developmentHighlights?.items?.[3]
              ?.title || "",
          development4Description:
            home.developmentHighlights?.items?.[3]
              ?.description || "",
          development4Image:
            home.developmentHighlights?.items?.[3]
              ?.image || "",

          galleryLabel:
            home.galleryPreview?.label || "",
          galleryHeading:
            home.galleryPreview?.heading || "",
          galleryDescription:
            home.galleryPreview?.description ||
            "",
          galleryMainTitle:
            home.galleryPreview?.mainTitle || "",
          galleryMomentsNumber:
            home.galleryPreview?.momentsNumber ||
            "",
          galleryMomentsText:
            home.galleryPreview?.momentsText ||
            "",

          galleryImage1:
            home.galleryPreview?.images?.[0] ||
            "",
          galleryImage2:
            home.galleryPreview?.images?.[1] ||
            "",
          galleryImage3:
            home.galleryPreview?.images?.[2] ||
            "",
          galleryImage4:
            home.galleryPreview?.images?.[3] ||
            "",
          galleryImage5:
            home.galleryPreview?.images?.[4] ||
            "",

          newsLabel:
            home.newsPreview?.label || "",
          newsHeading:
            home.newsPreview?.heading || "",
          newsDescription:
            home.newsPreview?.description || "",

          featuredNewsDate:
            home.newsPreview?.featured?.date ||
            "",
          featuredNewsTitle:
            home.newsPreview?.featured?.title ||
            "",
          featuredNewsDescription:
            home.newsPreview?.featured
              ?.description || "",
          featuredNewsImage:
            home.newsPreview?.featured?.image ||
            "",

          news1Date:
            home.newsPreview?.news?.[0]?.date ||
            "",
          news1Title:
            home.newsPreview?.news?.[0]?.title ||
            "",
          news1Image:
            home.newsPreview?.news?.[0]?.image ||
            "",

          news2Date:
            home.newsPreview?.news?.[1]?.date ||
            "",
          news2Title:
            home.newsPreview?.news?.[1]?.title ||
            "",
          news2Image:
            home.newsPreview?.news?.[1]?.image ||
            "",

          contactLabel:
            home.contactCTA?.label || "",
          contactHeading:
            home.contactCTA?.heading || "",
          contactDescription:
            home.contactCTA?.description || "",
          contactPhone:
            home.contactCTA?.phone || "",
          contactEmail:
            home.contactCTA?.email || "",
          contactOffice:
            home.contactCTA?.office || "",
          contactButtonText:
            home.contactCTA?.buttonText || "",
        });

        setPreviewHeroImage(
          home.heroImage || ""
        );

        setPreviewAboutImage(
          home.aboutImage || ""
        );

        setPreviewDevelopment1Image(
          home.developmentHighlights?.items?.[0]
            ?.image || ""
        );

        setPreviewDevelopment2Image(
          home.developmentHighlights?.items?.[1]
            ?.image || ""
        );

        setPreviewDevelopment3Image(
          home.developmentHighlights?.items?.[2]
            ?.image || ""
        );

        setPreviewDevelopment4Image(
          home.developmentHighlights?.items?.[3]
            ?.image || ""
        );

        setPreviewGalleryImage1(
          home.galleryPreview?.images?.[0] ||
          ""
        );

        setPreviewGalleryImage2(
          home.galleryPreview?.images?.[1] ||
          ""
        );

        setPreviewGalleryImage3(
          home.galleryPreview?.images?.[2] ||
          ""
        );

        setPreviewGalleryImage4(
          home.galleryPreview?.images?.[3] ||
          ""
        );

        setPreviewGalleryImage5(
          home.galleryPreview?.images?.[4] ||
          ""
        );

        setPreviewFeaturedNewsImage(
          home.newsPreview?.featured?.image ||
          ""
        );

        setPreviewNews1Image(
          home.newsPreview?.news?.[0]?.image ||
          ""
        );

        setPreviewNews2Image(
          home.newsPreview?.news?.[1]?.image ||
          ""
        );
      } catch (error) {
        console.error(error);

        setMessage(
          "Error loading Home content: " +
          error.message
        );
      } finally {
        setLoading(false);
      }
    };

    loadHomeContent();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleImageChange = (
    event,
    setSelectedImage,
    setPreviewImage
  ) => {
    const file = event.target.files[0];

    if (!file) return;

    setSelectedImage(file);

    setPreviewImage(
      URL.createObjectURL(file)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");

      const uploadData = new FormData();

      Object.keys(formData).forEach((key) => {
        if (!key.includes("Image")) {
          uploadData.append(
            key,
            formData[key]
          );
        }
      });

      if (selectedHeroImage) {
        uploadData.append(
          "heroImage",
          selectedHeroImage
        );
      }

      if (selectedAboutImage) {
        uploadData.append(
          "aboutImage",
          selectedAboutImage
        );
      }

      if (selectedDevelopment1Image) {
        uploadData.append(
          "development1Image",
          selectedDevelopment1Image
        );
      }

      if (selectedDevelopment2Image) {
        uploadData.append(
          "development2Image",
          selectedDevelopment2Image
        );
      }

      if (selectedDevelopment3Image) {
        uploadData.append(
          "development3Image",
          selectedDevelopment3Image
        );
      }

      if (selectedDevelopment4Image) {
        uploadData.append(
          "development4Image",
          selectedDevelopment4Image
        );
      }

      if (selectedGalleryImage1) {
        uploadData.append(
          "galleryImage1",
          selectedGalleryImage1
        );
      }

      if (selectedGalleryImage2) {
        uploadData.append(
          "galleryImage2",
          selectedGalleryImage2
        );
      }

      if (selectedGalleryImage3) {
        uploadData.append(
          "galleryImage3",
          selectedGalleryImage3
        );
      }

      if (selectedGalleryImage4) {
        uploadData.append(
          "galleryImage4",
          selectedGalleryImage4
        );
      }

      if (selectedGalleryImage5) {
        uploadData.append(
          "galleryImage5",
          selectedGalleryImage5
        );
      }

      if (selectedFeaturedNewsImage) {
        uploadData.append(
          "newsFeaturedImage",
          selectedFeaturedNewsImage
        );
      }

      if (selectedNews1Image) {
        uploadData.append(
          "newsImage1",
          selectedNews1Image
        );
      }

      if (selectedNews2Image) {
        uploadData.append(
          "newsImage2",
          selectedNews2Image
        );
      }

      const response = await authFetch(
        `${API_BASE_URL}/api/content/home`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "adminToken"
            )}`,
          },
          body: uploadData,
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
          "Failed to update Home content"
        );
      }

      setMessage(
        result.message ||
        "Home content updated successfully!"
      );

      setSelectedHeroImage(null);
      setSelectedAboutImage(null);

      setSelectedDevelopment1Image(null);
      setSelectedDevelopment2Image(null);
      setSelectedDevelopment3Image(null);
      setSelectedDevelopment4Image(null);

      setSelectedGalleryImage1(null);
      setSelectedGalleryImage2(null);
      setSelectedGalleryImage3(null);
      setSelectedGalleryImage4(null);
      setSelectedGalleryImage5(null);

      setSelectedFeaturedNewsImage(null);
      setSelectedNews1Image(null);
      setSelectedNews2Image(null);
    } catch (error) {
      console.error(
        "Error updating Home content:",
        error
      );

      setMessage(
        "Error: " +
          (
            error.message ||
            "Failed to update Home content"
          )
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-600">
          Loading Home content...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-8">
          <div>
            <p className="text-sm font-semibold tracking-widest text-orange-600 uppercase">
              Admin Panel
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">
              Edit Home Page
            </h1>

            <p className="text-slate-500 mt-2">
              Update all sections of the Home page.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/secure/admin/dashboard")
            }
            className="flex items-center gap-2 border border-slate-300 bg-white px-5 py-3 rounded-xl hover:bg-slate-100 transition"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* HERO */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">
              Hero Section
            </h2>

            <Input
              label="Hero Title"
              name="heroTitle"
              value={formData.heroTitle}
              onChange={handleChange}
            />

            <Input
              label="Hero Subtitle"
              name="heroSubtitle"
              value={formData.heroSubtitle}
              onChange={handleChange}
            />

            <Textarea
              label="Hero Description"
              name="heroDescription"
              value={formData.heroDescription}
              onChange={handleChange}
              rows={7}
            />

            <ImageInput
              label="Hero Image"
              preview={previewHeroImage}
              setSelected={setSelectedHeroImage}
              setPreview={setPreviewHeroImage}
              alt="Hero preview"
              onImageChange={handleImageChange}
            />
          </div>

          {/* ABOUT */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">
              About Preview Section
            </h2>

            <Input
              label="About Heading"
              name="aboutHeading"
              value={formData.aboutHeading}
              onChange={handleChange}
            />

            <Textarea
              label="About Description"
              name="aboutDescription"
              value={formData.aboutDescription}
              onChange={handleChange}
              rows={7}
            />

            <ImageInput
              label="About Image"
              preview={previewAboutImage}
              setSelected={setSelectedAboutImage}
              setPreview={setPreviewAboutImage}
              alt="About preview"
              onImageChange={handleImageChange}
            />

            <h3 className="text-xl font-bold text-slate-800 mt-10 mb-5">
              Features
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              {[1, 2, 3, 4].map((number) => (
                <Input
                  key={number}
                  label={`Feature ${number}`}
                  name={`feature${number}`}
                  value={formData[`feature${number}`]}
                  onChange={handleChange}
                />
              ))}
            </div>

            <h3 className="text-xl font-bold text-slate-800 mt-6 mb-5">
              Statistics
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2].map((number) => (
                <div
                  key={number}
                  className="border border-slate-200 rounded-2xl p-5"
                >
                  <Input
                    label={`Statistic ${number} Number`}
                    name={`stat${number}Number`}
                    value={formData[`stat${number}Number`]}
                    onChange={handleChange}
                  />

                  <Input
                    label={`Statistic ${number} Text`}
                    name={`stat${number}Text`}
                    value={formData[`stat${number}Text`]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* FOCUS AREAS */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">
              Focus Areas
            </h2>

            <Input
              label="Section Label"
              name="focusLabel"
              value={formData.focusLabel}
              onChange={handleChange}
            />

            <Input
              label="Main Heading"
              name="focusHeading"
              value={formData.focusHeading}
              onChange={handleChange}
            />

            <Textarea
              label="Section Description"
              name="focusDescription"
              value={formData.focusDescription}
              onChange={handleChange}
            />

            {[1, 2, 3, 4].map((number) => (
              <div
                key={number}
                className="border border-slate-200 rounded-2xl p-6 mb-6"
              >
                <h3 className="text-xl font-bold text-slate-800 mb-5">
                  Focus Area {number}
                </h3>

                <Input
                  label="Title"
                  name={`focus${number}Title`}
                  value={formData[`focus${number}Title`]}
                  onChange={handleChange}
                />

                <Textarea
                  label="Description"
                  name={`focus${number}Description`}
                  value={
                    formData[
                      `focus${number}Description`
                    ]
                  }
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            ))}
          </div>

          {/* DEVELOPMENT */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">
              Development Highlights
            </h2>

            <Input
              label="Section Label"
              name="developmentLabel"
              value={formData.developmentLabel}
              onChange={handleChange}
            />

            <Input
              label="Main Heading"
              name="developmentHeading"
              value={formData.developmentHeading}
              onChange={handleChange}
            />

            <Textarea
              label="Section Description"
              name="developmentDescription"
              value={formData.developmentDescription}
              onChange={handleChange}
            />

            {[1, 2, 3, 4].map((number) => {
              const previews = [
                previewDevelopment1Image,
                previewDevelopment2Image,
                previewDevelopment3Image,
                previewDevelopment4Image,
              ];

              const selectedSetters = [
                setSelectedDevelopment1Image,
                setSelectedDevelopment2Image,
                setSelectedDevelopment3Image,
                setSelectedDevelopment4Image,
              ];

              const previewSetters = [
                setPreviewDevelopment1Image,
                setPreviewDevelopment2Image,
                setPreviewDevelopment3Image,
                setPreviewDevelopment4Image,
              ];

              return (
                <div
                  key={number}
                  className="border border-slate-200 rounded-2xl p-6 mb-6"
                >
                  <h3 className="text-xl font-bold text-slate-800 mb-5">
                    Development Highlight {number}
                  </h3>

                  <Input
                    label="Title"
                    name={`development${number}Title`}
                    value={
                      formData[
                        `development${number}Title`
                      ]
                    }
                    onChange={handleChange}
                  />

                  <Textarea
                    label="Description"
                    name={`development${number}Description`}
                    value={
                      formData[
                        `development${number}Description`
                      ]
                    }
                    onChange={handleChange}
                    rows={4}
                  />

                  <ImageInput
                    label="Image"
                    preview={previews[number - 1]}
                    setSelected={
                      selectedSetters[number - 1]
                    }
                    setPreview={
                      previewSetters[number - 1]
                    }
                    alt={`Development ${number}`}
                    onImageChange={handleImageChange}
                  />
                </div>
              );
            })}
          </div>

          {/* GALLERY */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">
              Gallery Preview
            </h2>

            <Input
              label="Section Label"
              name="galleryLabel"
              value={formData.galleryLabel}
              onChange={handleChange}
            />

            <Input
              label="Main Heading"
              name="galleryHeading"
              value={formData.galleryHeading}
              onChange={handleChange}
            />

            <Textarea
              label="Section Description"
              name="galleryDescription"
              value={formData.galleryDescription}
              onChange={handleChange}
            />

            <Input
              label="Main Image Title"
              name="galleryMainTitle"
              value={formData.galleryMainTitle}
              onChange={handleChange}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Moments Number"
                name="galleryMomentsNumber"
                value={formData.galleryMomentsNumber}
                onChange={handleChange}
              />

              <Input
                label="Moments Text"
                name="galleryMomentsText"
                value={formData.galleryMomentsText}
                onChange={handleChange}
              />
            </div>

            {[
              {
                preview: previewGalleryImage1,
                selected: setSelectedGalleryImage1,
                previewSetter: setPreviewGalleryImage1,
              },
              {
                preview: previewGalleryImage2,
                selected: setSelectedGalleryImage2,
                previewSetter: setPreviewGalleryImage2,
              },
              {
                preview: previewGalleryImage3,
                selected: setSelectedGalleryImage3,
                previewSetter: setPreviewGalleryImage3,
              },
              {
                preview: previewGalleryImage4,
                selected: setSelectedGalleryImage4,
                previewSetter: setPreviewGalleryImage4,
              },
              {
                preview: previewGalleryImage5,
                selected: setSelectedGalleryImage5,
                previewSetter: setPreviewGalleryImage5,
              },
            ].map((image, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl p-6 mb-6"
              >
                <h3 className="text-lg font-semibold mb-5">
                  Gallery Image {index + 1}
                </h3>

                <ImageInput
                  label="Upload Image"
                  preview={image.preview}
                  setSelected={image.selected}
                  setPreview={image.previewSetter}
                  alt={`Gallery ${index + 1}`}
                  onImageChange={handleImageChange}
                />
              </div>
            ))}
          </div>

          {/* NEWS */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">
              News Preview
            </h2>

            <Input
              label="Section Label"
              name="newsLabel"
              value={formData.newsLabel}
              onChange={handleChange}
              placeholder="Latest News"
            />

            <Input
              label="Main Heading"
              name="newsHeading"
              value={formData.newsHeading}
              onChange={handleChange}
            />

            <Textarea
              label="Section Description"
              name="newsDescription"
              value={formData.newsDescription}
              onChange={handleChange}
            />

            <div className="border border-slate-200 rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold text-slate-800 mb-6">
                Featured News
              </h3>

              <Input
                label="Date"
                name="featuredNewsDate"
                value={formData.featuredNewsDate}
                onChange={handleChange}
              />

              <Input
                label="Title"
                name="featuredNewsTitle"
                value={formData.featuredNewsTitle}
                onChange={handleChange}
              />

              <Textarea
                label="Description"
                name="featuredNewsDescription"
                value={
                  formData.featuredNewsDescription
                }
                onChange={handleChange}
                rows={5}
              />

              <ImageInput
                label="Featured News Image"
                preview={previewFeaturedNewsImage}
                setSelected={
                  setSelectedFeaturedNewsImage
                }
                setPreview={
                  setPreviewFeaturedNewsImage
                }
                alt="Featured news"
                onImageChange={handleImageChange}
              />
            </div>

            <div className="border border-slate-200 rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold text-slate-800 mb-6">
                Recent News 1
              </h3>

              <Input
                label="Date"
                name="news1Date"
                value={formData.news1Date}
                onChange={handleChange}
              />

              <Input
                label="Title"
                name="news1Title"
                value={formData.news1Title}
                onChange={handleChange}
              />

              <ImageInput
                label="News Image"
                preview={previewNews1Image}
                setSelected={setSelectedNews1Image}
                setPreview={setPreviewNews1Image}
                alt="News 1"
                onImageChange={handleImageChange}
              />
            </div>

            <div className="border border-slate-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-6">
                Recent News 2
              </h3>

              <Input
                label="Date"
                name="news2Date"
                value={formData.news2Date}
                onChange={handleChange}
              />

              <Input
                label="Title"
                name="news2Title"
                value={formData.news2Title}
                onChange={handleChange}
              />

              <ImageInput
                label="News Image"
                preview={previewNews2Image}
                setSelected={setSelectedNews2Image}
                setPreview={setPreviewNews2Image}
                alt="News 2"
                onImageChange={handleImageChange}
              />
            </div>
          </div>

          {/* CONTACT CTA */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">
              Contact CTA Section
            </h2>

            <Input
              label="Section Label"
              name="contactLabel"
              value={formData.contactLabel}
              onChange={handleChange}
              placeholder="Get In Touch"
            />

            <Textarea
              label="Main Heading"
              name="contactHeading"
              value={formData.contactHeading}
              onChange={handleChange}
              rows={3}
            />

            <Textarea
              label="Description"
              name="contactDescription"
              value={formData.contactDescription}
              onChange={handleChange}
              rows={5}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Phone Number"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
              />

              <Input
                label="Email Address"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
              />

              <Input
                label="Office Location"
                name="contactOffice"
                value={formData.contactOffice}
                onChange={handleChange}
                placeholder="Dharmapuri, Telangana"
              />

              <Input
                label="Button Text"
                name="contactButtonText"
                value={formData.contactButtonText}
                onChange={handleChange}
                placeholder="Contact Office"
              />
            </div>
          </div>

          {message && (
            <div
              className={`px-5 py-4 rounded-xl border ${
                message.startsWith("Error")
                  ? "bg-red-50 text-red-700 border-red-200"
                  : "bg-green-50 text-green-700 border-green-200"
              }`}
            >
              {message}
            </div>
          )}

          <div className="flex justify-end gap-4 pb-10">
            <button
              type="button"
              onClick={() =>
                navigate("/secure/admin/dashboard")
              }
              className="px-6 py-3 border border-slate-300 bg-white rounded-xl hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white px-8 py-3 rounded-xl font-medium transition"
            >
              {saving
                ? "Saving..."
                : "Save All Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHome;