import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/index.css";
import Header from "./containers/Header";
import Footer from "./containers/Footer";
import MainPage from "./containers/MainPage/MainPage";

function App() {
  return (
    <Fragment>
      <Header />
      <BrowserRouter>
        <main className="max-w-[1200px] mx-auto px-[45px]">
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </main>
      </BrowserRouter>
      <Footer />
    </Fragment>
  );
}

export default App;
