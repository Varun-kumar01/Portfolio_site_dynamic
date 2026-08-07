import MainLayout from '../layouts/MainLayout'
import SectionTitle from '../components/common/SectionTitle'

const Contact = () => {
  return (
    <MainLayout>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Contact" title="Get in touch with the office." subtitle="Official communication for inquiries, support, and public engagement." />
        </div>
      </section>
    </MainLayout>
  )
}

export default Contact
