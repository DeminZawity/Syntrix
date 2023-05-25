import styled from "styled-components";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { LandingPage } from "./Pages/Main/LandingPage";
import { RegisterPage } from "./Pages/Authentication/Register";
import { LoginPage } from "./Pages/Authentication/Login";
import Protected from "./Navigation/Protected"
import { ProtectedPages} from "./Navigation/ProtectedPages"
import GlobalStyle from './Assets/Fonts/Font';
import { Provider } from "react-redux";
import STORE, { Persitor } from "./Redux/State";
import { PersistGate } from "redux-persist/integration/react";
import { NavBar } from "./Components/Navbar";



function App() {
  return (
    <Provider store={STORE}>
      <PersistGate loading={null} persistor={Persitor}>
      <GlobalStyle />
        <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<LandingPage/>}/>
          <Route path="/Login" element={<LoginPage/>}/>
          <Route path="/Register" element={<RegisterPage/>}/>

          <Route
            path="*"
            element={
              <Protected>
                <NavBar />
                <ProtectedPages />
              </Protected>
            }
          />


        </Routes>
      </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
