import "./Header.scss"
import logo from "../../assets/images/icons/reminder-icon.png"


const Header = () => {
    return (
        <header className="header">
            <div className="header__logo"> 
                <img src={logo} alt="LOGO"/>
            </div>
            <div> 
                <h1 className="header__title">Reminder</h1>
            </div>

        </header>
    );
}

export default Header;
