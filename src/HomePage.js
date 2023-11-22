import { useState } from "react";
import { Calendar } from 'primereact/calendar';
import styles from "./HomePage.module.css";
import DateComponent from "./DateComponent";
import { Fieldset } from 'primereact/fieldset';


const HomePage = () => {
    const [firstDate, setFirstDate] = useState("");
    const [lastDate, setLastDate] = useState("");
    const [checked, setChecked] = useState(false);
    const [data, setData] = useState([]);
    let date = new Date()

    const handleChange = () => {
        setChecked(!checked);
    };

    const handleLastDate = (value) => {
        date = value
        setLastDate(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
    };

    const handleFirstDate = (value) => {
        date = value
        setFirstDate(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
    };

    const fetchData = () => {
        fetch(`https://www.hebcal.com/hebcal?cfg=fc&v=1&i=off&maj=on&min=on&nx=on&mf=on&ss=on&mod=on&lg=he&s=on&start=${firstDate}&end=${lastDate}`)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                setData(data)
            }).catch((error) => {

            });
    }

    return (
        <div className={styles.homePageWrapper}>
            {/* <Calendar placeholder="First date" dateFormat='yy-mm-dd' value={firstDate} onChange={(e) => handleFirstDate(e.value)}></Calendar> */}
            {/* <Calendar placeholder="Last date" dateFormat='yy-mm-dd' value={lastDate} onChange={(e) => handleLastDate(e.value)}></Calendar> */}
            <input
                type="date"
                placeholder="First date"
                onBlur={(e) => setFirstDate(e.target.value)}
            />
            <input
                type="date"
                placeholder="Last date"
                onBlur={(e) => setLastDate(e.target.value)}
            />
            <label>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                />
                הצג פרשות שבוע בלבד
            </label>
            {/* <button onClick={() => firstDate !== "" && lastDate !== "" ? fetchData() : alert("הכנס תאריכים")}>התחל</button> */}
            {firstDate !== "" && lastDate !== "" ? fetchData() : console.log("wait")}
            <div>
                {data?.map(item => {
                    if (checked) {
                        if (item.className === "parashat")
                            return (
                                <Fieldset legend={item.title} toggleable>
                                    <p>{item.description}</p>
                                    <h6>{item.start}</h6>
                                </Fieldset>
                            )
                    }
                    else {
                        return (
                            <Fieldset legend={item.title} toggleable>
                                <p>{item.description}</p>
                                <h6>{item.start}</h6>
                            </Fieldset>
                        )
                    }
                })}
            </div>

        </div>
    );
};

export default HomePage;