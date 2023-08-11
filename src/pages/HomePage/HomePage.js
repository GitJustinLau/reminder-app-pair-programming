import "./HomePage.scss"
import Reminder from "../../components/Reminder/Reminder";


const HomePage = () => {
    return (
        <main className='home'>
            <div>
                <Reminder />
            </div>
        </main>
    );
};

export default HomePage;
