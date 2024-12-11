const Student = (props) => {
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        <strong>{props.major}</strong>
        <p>{props.name.first} is taking {props.numCredits} and is {(props.fromWisconsin ? "" : "not")} from Wisconsin</p>
        <p>They have {props.interests.length} interest(s) including...</p>
        <ul>
            {props.interests.map(i => <li>{i}</li>)}
        </ul>
    </div>
}

export default Student;