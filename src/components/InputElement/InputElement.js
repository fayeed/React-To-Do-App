import React from 'react';

import classes from './InputElement.css';

const inputElement = (props) => {

    let element = null;

        switch (props.type) {
            case 'input':
                element = (<React.Fragment>
                            <input 
                                style={props.style} 
                                className={classes.Input} 
                                name={props.name} 
                                id={props.name} 
                                value={props.value}
                                placeholder={props.placeholder}
                                onChange={props.changed} required/>
                            <label className={classes.Label} >{props.content}</label>
                         </React.Fragment>)
                break;
            case 'select':
                element = (<React.Fragment>
                    <select 
                        className={classes.Dropdown}
                        onChange={props.changed}>
                        value={props.value}
                        {props.list.map(ele => {
                            return <option
                                        key={ele.value} 
                                        value={ele.value}>{ele.option}</option>
                        })}
                    </select>
                </React.Fragment>)
                break;
            case 'button':
                        element = <button 
                                    className={classes.Button} 
                                    type='submit'
                                    style={props.style}
                                    onClick={props.reset}>{props.label}</button>
                    break;
            default:
                    element = null
                break;
        }

        return (
            <div className={classes.InputElement} style={{marginLeft: '2em'}}>
                {element}
            </div>
        );
}

export default inputElement;