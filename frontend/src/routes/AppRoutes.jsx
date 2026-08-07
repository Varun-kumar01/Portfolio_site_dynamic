// import { Routes, Route } from "react-router-dom";

// import MainLayout from "../layouts/MainLayout";

// import Home from "../pages/Home";
// import About from "../pages/About";
// import Biography from "../pages/Biography";
// import Development from "../pages/Development";
// import Gallery from "../pages/Gallery";
// import News from "../pages/News";
// import Videos from "../pages/Videos";
// import Articles from "../pages/Articles";
// import Contact from "../pages/Contact";
// import AdminLogin from "../pages/AdminLogin";
// import Dashboard from "../pages/Dashboard";

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route element={<MainLayout />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/biography" element={<Biography />} />
//         <Route path="/development" element={<Development />} />
//         <Route path="/gallery" element={<Gallery />} />
//         <Route path="/news" element={<News />} />
//         <Route path="/videos" element={<Videos />} />
//         <Route path="/articles" element={<Articles />} />
//         <Route path="/contact" element={<Contact />} />
//       </Route>

//       <Route path="/admin-login" element={<AdminLogin />} />
//       <Route path="/admin" element={<Dashboard />} />
//     </Routes>
//   );
// }


import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Biography from "../pages/Biography";
import Development from "../pages/Development";
import Gallery from "../pages/Gallery";
import News from "../pages/News";
import Videos from "../pages/Videos";
import Articles from "../pages/Articles";
import Contact from "../pages/Contact";
import AdminLogin from "../pages/AdminLogin";
import Dashboard from "../pages/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/biography" element={<Biography />} />
        <Route path="/development" element={<Development />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/news" element={<News />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin" element={<Dashboard />} />
    </Routes>
  );
}