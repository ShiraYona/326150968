import style from "./DateComponent.module.css"
const DateComponent = (props) => {

    return (
        <>
            <div className={style.stylesDate}>
                <h5>{props.date.title}</h5>
                <p>{props.date.description}</p>
                <h6>{props.date.start}</h6>
            </div>
        </>
    )
}
export default DateComponent