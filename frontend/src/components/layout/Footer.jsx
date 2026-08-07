// const Footer = () => {
//   return (
//     <footer className="border-t border-slate-200 bg-slate-950 py-10 text-slate-400">
//       <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
//         <p>© 2026 Official Leadership Portal</p>
//         <p>Built with React, Vite, and Tailwind CSS.</p>
//       </div>
//     </footer>
//   )
// }

// export default Footer

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-xl font-semibold mb-2">
          Politician Portfolio
        </h3>

        <p className="text-gray-400">
          © {new Date().getFullYear()} All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}