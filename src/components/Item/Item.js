import React from 'react';

import cancelLogo from '../../assets/svg/cancel.svg'
import doneLogo from '../../assets/svg/checked.svg'
import classes from './Item.css';

const Item = (props) => {
    return (
        <div className={classes.Item}>
            <div 
                className={[classes.Item__btn, classes.Item__close].join(" ")}
                onClick={() => props.canceled(props.id)}><img src={cancelLogo} alt='cancel'/></div>
            <div 
                className={[classes.Item__btn, classes.Item__done].join(" ")} 
                onClick={() => props.complete(props.id)}><img src={doneLogo} alt='check'/></div>
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