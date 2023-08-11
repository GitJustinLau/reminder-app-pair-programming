import "./Header.scss"
import logo from "../../assets/images/icons/reminder-icon.png"
import { Link } from "react-router-dom";


const Header = () => {
    return (
        
        <header className="header">
            <Link to="/">
            <div className="header__logo"> 
                <img src={logo} alt="LOGO"/>
            </div>
            <div> 
                <h1 className="header__title">Reminder</h1>
            </div>
            </Link>

        </header>
    );
}

export default Header;
