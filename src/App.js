import HomePage from "./pages/HomePage/HomePage";
import BMIPage from "./pages/BMIPage/BMIPage";
import Header from "./components/Header/Header";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/"
                    element={<HomePage/>}/>
                <Route path="/bmi"
                    element={<BMIPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
