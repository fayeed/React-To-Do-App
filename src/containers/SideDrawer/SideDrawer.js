import React, {Component} from 'react';

import classes from './SideDrawer.css';

class SideDrawer extends Component {

    state = {
        drawer : false
    }

    toggleDrawer = () => {
        this.setState({
            drawer : !this.state.drawer
        })
    }
    
    render() {
        return (
            <div className={!this.state.drawer ? classes.SideDrawer : classes.SideDrawerActive} 
            onClick={this.toggleDrawer}>SideDrawer</div>
        );
    }
}

export default SideDrawer;