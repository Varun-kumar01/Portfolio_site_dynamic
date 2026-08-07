// import { Outlet } from "react-router-dom";

// import TopBar from "../components/layout/TopBar";
// import Navbar from "../components/layout/Navbar";
// import Footer from "../components/layout/Footer";

// export default function MainLayout() {
//   return (
//     <>
//       <TopBar />
//       <Navbar />

//       <main>
//         <Outlet />
//       </main>

//       <Footer />
//     </>
//   );
// }

import { Outlet } from "react-router-dom";

import TopBar from "../components/layout/TopBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function MainLayout() {
  return (
    <>
      {/* <TopBar /> */}
      <Navbar />

      <main className="min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}