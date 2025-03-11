// import React from 'react'
// import Header from './pages/Header/Header'
// import Footer from './pages/Footer/Footer'
// import {Outlet} from 'react-router-dom'

// function Layout() {
//     return (
//       <>
//         <Header />
//         <Outlet />
//         <Footer />
//       </>
//     );
// }

// export default Layout


import React from "react";
import { Outlet } from "react-router-dom";
// import Header from "./components/Header";
// import Footer from "./components/Footer";

import Header from './pages/Header/Header'
import Footer from './pages/Footer/Footer'

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />  {/* This is needed for child routes like /dashboard and /users */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
