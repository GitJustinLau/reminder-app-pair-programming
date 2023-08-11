import "./Reminder.scss"
import checkboxIcon from "../../assets/images/icons/checkbox-icon.png"
import deleteIcon from "../../assets/images/icons/delete-icon.png"
import {useRef, useState, useEffect} from 'react'
// import Calendars from "../Calendar/Calendars";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import axios from "axios";
import { useParams } from "react-router-dom"

const Reminder = () => {

    const [reminder, setReminder] = useState([]);
    const [value, onChange] = useState(new Date());
    const [calendVis, setCalenVis] = useState(false);
    const formRef = useRef();

    const {id} = useParams();

    useEffect(() => {
        axios.get("http://localhost:5050/reminders").then((res) => {
            setReminder(res.data)
        }).catch(console.error)

    }, [])

    const handleDelete = (deletedId) => {
        console.log(deletedId)
        axios.delete(`http://localhost:5050/reminders/${deletedId}`)
          .then(() => {
            setReminder(reminder.filter(reminder => reminder.id !== deletedId));
          })
          .catch(error => {
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
            dateReminder: value.toLocaleDateString()
        }

        axios.post("http://localhost:5050/reminders", newObj).then(() => {
            console.log("sucess");
            setReminder([
                ...reminder,
                newObj
            ])
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
                        <label>
                            <input className="reminder__input" id="memo" type="text" placeholder="Enter your memo"/>
                        </label>
                        <div> {/* if value causes errors, replace with Calendar in div below*/}
                            <div onClick={handleCVis}>
                                {
                                value.toLocaleDateString()
                            }</div>

                            {
                            calendVis && <Calendar onChange={onChange}
                                value={value}
                                id="dateReminder"/>
                            }
                         </div>

                        <button>Add Reminder</button>
                    </form>

                </div>
                <div>
                    <ul className="reminder__list">
                        {
                        reminder.map(list => {
                            return (
                                <>
                                    <li key={
                                            list.id
                                        }
                                        className="reminder__item">
                                        <img className="reminder__icon"
                                            src={checkboxIcon}
                                            alt="check box"/>
                                        <p className="reminder__memo">
                                            {
                                            list.memo
                                        } </p>

                                        <p className="reminder__date">
                                            {
                                            list.dateReminder
                                        }</p>
                                        <div onClick={() => handleDelete(list.id)}>
                                            <img src={deleteIcon}
                                                alt="delete"/>
                                        </div>


                                    </li>
                                </>
                            );
                        })
                    } </ul>

                </div>
            </div>


        </>

    );
};

export default Reminder;
