import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Topbutton from "./components/Topbutton";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Topbutton />
      <Footer />
    </>
  );
}

export default App;
