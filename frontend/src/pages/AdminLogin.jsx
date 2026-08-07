import MainLayout from '../layouts/MainLayout'
import SectionTitle from '../components/common/SectionTitle'

const AdminLogin = () => {
  return (
    <MainLayout>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Admin" title="Admin login." subtitle="Secure access for authorized content management." />
        </div>
      </section>
    </MainLayout>
  )
}

export default AdminLogin
