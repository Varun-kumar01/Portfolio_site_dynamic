import SectionTitle from '../components/common/SectionTitle'
import { useTranslation } from 'react-i18next'

const Videos = () => {
  const { t } = useTranslation()

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow={t('gallery.videos')} title={t('videos.title')} subtitle={t('videos.subtitle')} />
      </div>
    </section>
  )
}

export default Videos
