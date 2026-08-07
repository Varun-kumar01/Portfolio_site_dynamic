import Button from '../common/Button'

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-white py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">Official Portfolio</p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            Leadership rooted in service, vision, and progress.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">
            A trusted public platform for biography, achievements, development work, media, and official updates.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button>Explore Profile</Button>
            <Button variant="secondary">View Achievements</Button>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="aspect-[4/5] rounded-2xl bg-slate-100" />
        </div>
      </div>
    </section>
  )
}

export default Hero
