// import MainLayout from '../layouts/MainLayout'
// import SectionTitle from '../components/common/SectionTitle'

// const Contact = () => {
//   return (
//     <MainLayout>
//       <section className="py-20">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <SectionTitle eyebrow="Contact" title="Get in touch with the office." subtitle="Official communication for inquiries, support, and public engagement." />
//         </div>
//       </section>
//     </MainLayout>
//   )
// }

// export default Contact


import ContactForm from "../components/contact/ContactForm";
import ContactCard from "../components/contact/ContactCard";

const Contact = () => {
  return (
    <>
      {/* <section className="bg-[#2f2f2f] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-light tracking-wide text-white">
            Contact
          </h1>

          <div className="w-20 h-1 bg-green-600 mx-auto mt-5 rounded-full"></div>

          <div className="flex justify-center items-center gap-2 mt-6 text-lg">
            <span className="text-gray-300">Home</span>
            <span className="text-green-500">/</span>
            <span className="text-white font-medium">Contact</span>
          </div>
        </div>
      </section> */}

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;