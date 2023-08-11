import HomePage from "./pages/HomePage/HomePage";
import ActivityPage from "./pages/ActivityPage/ActivityPage";
import Header from "./components/Header/Header";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.scss"

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/"
                    element={<HomePage/>}/>
                <Route path="/activity"
                    element={<ActivityPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
