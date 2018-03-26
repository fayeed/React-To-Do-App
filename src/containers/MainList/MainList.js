import React, {Component} from 'react';
import Item from '../../components/Item/Item';

import classes from './MainList.css';

class MainList extends Component {

    render() {

        const items = this.props.items.map(ele => {
            return (<Item message={ele.message} 
                            category={ele.category} 
                            time={ele.time} 
                            key={ele.id}/>)
        });

        return (
            <div className={classes.MainList}>
                {items}
            </div>
        );
    }
}

export default MainList;