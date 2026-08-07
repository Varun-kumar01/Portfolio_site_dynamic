import MainLayout from '../layouts/MainLayout'
import SectionTitle from '../components/common/SectionTitle'

const AchievementsPage = () => {
  return (
    <MainLayout>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Achievements" title="Key achievements and milestones." subtitle="Highlights of service, reform, and public outreach." />
        </div>
      </section>
    </MainLayout>
  )
}

export default AchievementsPage
