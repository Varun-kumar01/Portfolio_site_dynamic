import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-gray-900 mb-8">
        {t("contact.title")}
      </h2>

      <form className="space-y-5">
        {/* Name */}
        <input
          type="text"
          placeholder={t("contact.form.name")}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition duration-300 focus:border-green-600 focus:ring-2 focus:ring-green-200"
        />

        {/* Email */}
        <input
          type="email"
          placeholder={t("contact.form.email")}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition duration-300 focus:border-green-600 focus:ring-2 focus:ring-green-200"
        />

        {/* Subject */}
        <input
          type="text"
          placeholder={t("contact.form.subject")}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition duration-300 focus:border-green-600 focus:ring-2 focus:ring-green-200"
        />

        {/* Message */}
        <textarea
          placeholder={t("contact.form.message")}
          rows="6"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none resize-none transition duration-300 focus:border-green-600 focus:ring-2 focus:ring-green-200"
        ></textarea>

        {/* Button */}
        <button
          type="submit"
          className="bg-green-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-300 hover:bg-green-700 hover:shadow-lg hover:scale-105"
        >
          {t("contact.form.submit")}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;