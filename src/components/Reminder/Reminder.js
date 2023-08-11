import "./Reminder.scss"
import checkboxIcon from "../../assets/images/icons/checkbox-icon.png"


const Reminder = ({ reminderData }) => {

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


    return (
        <>

            <div className="reminder__new">
                    <form className="reminder__form">
                        <label>
                            <input className="reminder__input" type="text" />
                        </label>

                        <button className="reminder__button" type="submit">+</button>
                    </form>

                </div>
            <div className="reminder">

                <div>
                    <ul className="reminder__list">
                        {
                            reminderData.map(list => {
                                return (
                                    <>
                                        <li className="reminder__item">
                                            <span><img className="reminder__icon"
                                                src={checkboxIcon}
                                                alt="check box" /></span> {
                                                list.memo
                                            }
                                            <span className="reminder__date"> {
                                                list.dateReminder
                                            }</span>
                                        </li>
                                    </>

                                );
                            })
                        }
                    </ul>

                </div>
            </div>


        </>

    );
};

export default Reminder;
