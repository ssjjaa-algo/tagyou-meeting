import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./components/test/Test";
import Home from "./containers/home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
