// import { BrowserRouter } from 'react-router-dom'
// import AppRoutes from './routes/AppRoutes'

// function App() {
//   return (
//     <BrowserRouter>
//       <AppRoutes />
//     </BrowserRouter>
//   )
// }

// export default App
//import ApiTest from "./ApiTest";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <AppRoutes />
    </>
  );
  //return<ApiTest />
}

export default App;