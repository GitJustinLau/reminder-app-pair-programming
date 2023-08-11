import "./HomePage.scss"
import Reminder from "../../components/Reminder/Reminder";
import axios from 'axios'

import { useState, useEffect } from "react";

const HomePage = () => {

    const [reminder, setReminder] = useState([])
    useEffect(() => {
        axios
        .get("http://localhost:5050/reminders")
        .then((res) => {
            console.log(res.data);
            setReminder(res.data)

        })
        .catch(console.error)

    }, [])

    


    return (
        <main className='home'>
            <div>
                <Reminder  reminderData={reminder}/>
            </div>
        </main>
    );
};

export default HomePage;
