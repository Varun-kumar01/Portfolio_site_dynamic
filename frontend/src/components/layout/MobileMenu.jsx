const MobileMenu = () => {
  return (
    <div className="border-t border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 md:hidden">
      <div className="flex flex-col gap-3">
        <a href="/about" className="hover:text-blue-700">About</a>
        <a href="/biography" className="hover:text-blue-700">Biography</a>
        <a href="/achievements" className="hover:text-blue-700">Achievements</a>
        <a href="/gallery" className="hover:text-blue-700">Gallery</a>
        <a href="/news" className="hover:text-blue-700">News</a>
      </div>
    </div>
  )
}

export default MobileMenu
