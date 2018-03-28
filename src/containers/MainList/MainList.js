import React, {Component} from 'react';
import Item from '../../components/Item/Item';

import classes from './MainList.css';

class MainList extends Component {

    render() {


        const items = this.props.items !== null ? this.props.items.map(ele => {
            return (<Item message={ele.message} 
                            category={ele.category} 
                            time={ele.time} 
                            key={ele.id}
                            id={ele.id}
                            complete={this.props.complete}
                            canceled={this.props.canceled}/>)
        }) : null;

        return (
            <div className={classes.MainList}>
                {items}
            </div>
        );
    }
}

export default MainList;