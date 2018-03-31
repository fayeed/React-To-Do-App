import React from 'react';

import classes from './Header.css';
import userIcon from '../../assets/svg/user.svg';

const Header = () => {
    return (
        <header className={classes.header}>
            <h1 className={classes.header__title}>Nova</h1>
            <embed className={classes.header__userIcon} src={userIcon} alt='user icon' />
        </header>
    )
}

export default Header;