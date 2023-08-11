import "./Reminder.scss"
import checkboxIcon from "../../assets/images/icons/checkbox-icon.png"
import deleteIcon from "../../assets/images/icons/delete-icon.png"
import {useRef, useState, useEffect} from 'react'
// import Calendars from "../Calendar/Calendars";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom"

const Reminder = () => {

    const [reminder, setReminder] = useState([]);
    const [value, onChange] = useState(new Date());
    const [calendVis, setCalenVis] = useState(false);
    const [uniqueDate, setUniqueDate] = useState([])
    const formRef = useRef();

    const {id} = useParams();


    useEffect(() => {
        axios.get("http://localhost:5050/reminders").then((res) => {
            setReminder(res.data);
            const newData = res.data.map(item => {
                return item.dateReminder;
            })
            const uniqueDateReminders = [...new Set(newData)]
            uniqueDateReminders.sort();

            setUniqueDate(uniqueDateReminders);
        }).catch(console.error)

    }, [])

    const handleDelete = (deletedId) => {
        axios.delete(`http://localhost:5050/reminders/${deletedId}`).then(() => {
            setReminder(reminder.filter(reminder => reminder.id !== deletedId));
        }).catch(error => {
            console.error('Error deleting reminder:', error);
        });
    };

    const handleCVis = () => {
        setCalenVis(!calendVis);
    }

    function getTodayDate() {
        const date = new Date();

        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        return date.toLocaleString('en-CA', options);
    }

    const addNewReminder = (e) => {
        e.preventDefault();
        const newObj = {
            memo: formRef.current.memo.value,
            dateReminder: value.toLocaleDateString(),
            time:formRef.current.time.value
        }

        axios.post("http://localhost:5050/reminders", newObj).then((res) => {
            console.log("sucess");
            setReminder([
                ...reminder,
                res.data
            ])
            formRef.current.reset()
        }).catch(console.error)

    }

    return (
        <>
            <div className="date__container">
                <h3 className="today">
                    {
                    getTodayDate()
                } </h3>
            </div>
            <div className="reminder">
                <div className="reminder__new">
                    <form className="reminder__form"
                        onSubmit={addNewReminder}
                        ref={formRef}>
                        <div className="reminder__form-container">
                            <label>
                                <textarea className="reminder__input" id="memo" type="text" placeholder="Enter your memo"></textarea>
                            </label>

                            <div className="reminder__date-input">


                                {/* if value causes errors, replace with Calendar in div below*/}
                                <div className="reminder__click" onClick={handleCVis}>
                                    {
                                    value.toLocaleDateString()
                                }</div>

                                {
                                calendVis && <Calendar onChange={onChange}
                                    value={value}
                                    id="dateReminder"/>
                                }
                                <input className="reminder__time-input" type="text" id="time" value="12:00 PM"/>

                            </div>


                        </div>

                        <button className="reminder__button">+</button>
                    </form>

                </div>
                <div>

                    <ul className="reminder__list">
                        {

                        uniqueDate.map(item => {

                            return (
                                <article> {
                                    console.log(item)
                                }
                                    <h2>{item}</h2>
                                    {
                                    reminder.filter((reminder) => reminder.dateReminder === item).map(list => {
                                        return (
                                            <>
                                                <li className="reminder__item">
                                                    {/* <img className="reminder__icon"
                                                    src={checkboxIcon}
                                                    alt="check box"/> */}
                                                    <input type="checkbox" className="reminder__checkbox"/>
                                                    <div className="reminder__memo-date">
                                                        <p className="reminder__memo">
                                                            {
                                                            list.memo
                                                        } </p>
                                                        <p className="reminder__time">
                                                            {
                                                            list.time
                                                        } </p>
                                                        {/* 
                                                    <p className="reminder__date">
                                                        {
                                                        list.dateReminder
                                                    }</p> */} </div>

                                                    <div onClick={
                                                        () => handleDelete(list.id)
                                                    }>
                                                        <img src={deleteIcon}
                                                            alt="delete"/>

                                                    </div>


                                                </li>
                                            </>

                                        );
                                    })
                                } </article>
                            )
                        })
                    } </ul>

                </div>
            </div>


        </>

    );
};

export default Reminder;
