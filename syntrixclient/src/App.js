import styled from "styled-components";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { LandingPage } from "./Pages/Main/LandingPage";
import { RegisterPage } from "./Pages/Main/Register";
import { LoginPage } from "./Pages/Main/Login";
import { Protected } from "./Navigation/Protected"
import { ProtectedPages} from "./Navigation/ProtectedPages"
import GlobalStyle from './Assets/Fonts/Font';

function App() {
  return (
    <>
    <GlobalStyle />
      <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<LandingPage/>}/>
        <Route path="/Login" element={<LoginPage/>}/>
        <Route path="/Register" element={<RegisterPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
