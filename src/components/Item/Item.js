import React from 'react';

import classes from './Item.css';

const Item = (props) => {
    return (
        <div className={classes.Item}>
            <div 
                className={classes.Item__close}
                onClick={() => props.canceled(props.id)}><span>Close</span></div>
            <div 
                className={classes.Item__done} 
                onClick={() => props.complete(props.id)}><span>Done</span></div>
            <div className={classes.Item__content}>
                <div>
                    <h3 className={classes.Item__message}>{props.message}</h3>
                    <h4 className={classes.Item__category}>{props.category}</h4>
                </div>
                <p className={classes.Item__time}>{props.time}</p>
            </div>
            
        </div>
    );
}

export default Item;