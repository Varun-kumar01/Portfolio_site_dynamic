import Button from '../common/Button'

const ContactCTA = () => {
  return (
    <section className="bg-slate-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10">
          <h2 className="text-3xl font-semibold">Stay connected with official updates.</h2>
          <p className="mt-4 max-w-2xl text-slate-400">Reach out for office contact, event information, and general public engagement.</p>
          <div className="mt-8">
            <Button variant="secondary" className="bg-white text-slate-900 hover:bg-slate-100">Contact Us</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactCTA
