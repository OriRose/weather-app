import classes from './LocationDisplay.module.css'

const LocationDisplay = (props) => {
    return <p className={classes.display}>{props.location.name}, {props.location.country}</p>
}

export default LocationDisplay;