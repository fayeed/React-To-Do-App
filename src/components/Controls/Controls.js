import React from 'react';
import Input from '../InputElement/InputElement';

import classes from './Controls.css';

const Controls = (props) => {

    const newBtn= {
        marginLeft:'0em',
        display:'block',
        width:'100%',
        marginBottom: '1em'
    }

    const loggedOut = {
                    ...newBtn,
                    position: 'fixed',
                    bottom: '0',
                    left: '0',
                    marginLeft: '0em'        
                }

    return (
        <div style={{marginLeft: 0}} className={!props.signout ? classes.Controls : classes.ControlsActive}>
            <Input 
                style={newBtn}
                width={true}
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
                label='SignOut'
                reset={props.logOut} /> : null
            }
        </div>
    );
}

export default Controls;