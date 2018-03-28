import React from 'react';
import Input from '../InputElement/InputElement';

import classes from './Controls.css';

const Controls = (props) => {

    const newBtn= {
        marginLeft:'0',
        display:'block',
        width:'300px',
        marginBottom: '1em'
    }

    const loggedOut = {
                    ...newBtn,
                    position: 'fixed',
                    bottom: '0',
                    left: '0',
                    marginLeft: '4.5em'        
                }

    return (
        <div className={!props.signout ? classes.Controls : classes.ControlsActive}>
            <Input 
                style={newBtn}
                type='button'
                label='List'
                reset={() => props.changeTo(1)}
            /> 
            <Input 
                style={newBtn}
                type='button'
                label='Completed'
                reset={() => props.changeTo(2)}
            /> 
            <Input 
                style={newBtn}
                type='button'
                label='Canceled'
                reset={() => {props.changeTo(3)}}
            />
            {
                props.signout ? <Input 
                style={loggedOut}
                type='button'
                label='SignOut' /> : null
            }
        </div>
    );
}

export default Controls;