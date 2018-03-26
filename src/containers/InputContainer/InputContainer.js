import React, {Component} from 'react';
import InputElement from '../../components/InputElement/InputElement';

import classes from './InputContainer.css';

class InputContainer extends Component {
    
    render() {
        return (
            <div className={classes.InputContainer}>
                <form>
                    <InputElement name='item' value='To-Do item' placeholder='Enter the item here...'/>
                </form>
            </div>
        );
    }
}

export default InputContainer;