import React from 'react';

import classes from './Backdrop.css';

const Backdrop = (props) => {
    return <div 
            className={classes.Backdrop}
            onClick={props.click}
            style={{opacity:"1"}}></div>
}

export default Backdrop;