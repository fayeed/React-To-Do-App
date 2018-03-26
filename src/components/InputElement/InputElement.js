import React from 'react';

import classes from './InputElement.css';

const inputElement = (props) => {
        return (
            <div className={classes.InputElement}>
                <label className={classes.Label} >{props.value}</label>
                <input className={classes.Input} name={props.name} id={props.name} placeholder={props.placeholder}/>
            </div>
        );
}

export default inputElement;