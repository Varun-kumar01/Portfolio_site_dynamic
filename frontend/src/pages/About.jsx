import MainLayout from '../layouts/MainLayout'
import SectionTitle from '../components/common/SectionTitle'

const About = () => {
  return (
    <MainLayout>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="About" title="About the public leadership journey." subtitle="A profile grounded in service, responsibility, and public trust." />
        </div>
      </section>
    </MainLayout>
  )
}

export default About
