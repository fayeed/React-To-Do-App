import React, {Component} from 'react';
import Input from '../InputElement/InputElement';
import Controls from '../Controls/Controls';

import classes from './SignUp.css';

class SignUp extends Component{

    state = {
        email: '',
        password: '',
    }

    inputChanged = (e, id) => {
        e.preventDefault();
        let s = {...this.state}
        
        if(id === '1'){
            s.email = e.target.value
            this.setState({...s})
        } else if(id === '2'){
            s.password = e.target.value
            this.setState({...s})
        }
    }

    render () {
        return (
            <div className={classes.SignUp}>
                <h1>TO-DO LIST</h1>
                {!this.props.logged ?
                <React.Fragment>
                    <form>
                        <Input
                            id='1'
                            type='input'
                            style={{width:'300px',
                                    marginLeft:'0',
                                    marginTop:'2em'}} 
                            name='email' 
                            content='Email' 
                            placeholder='Email Address'
                            value={this.state.email}
                            changed={(e) => this.inputChanged(e, '1')}/>

                        <Input
                            id='1'
                            type='input'
                            style={{width:'300px',
                                    marginTop:'2em',}} 
                            name='password' 
                            content='Password' 
                            placeholder='*******'
                            value={this.state.password}
                            changed={(e) => this.inputChanged(e, '2')}/>

                        <div className={classes.btns}>
                            <Input 
                                style={{marginLeft:'0'}}
                                type='button'
                                label='LogIn'
                            /> 
                            <Input 
                                style={{marginLeft:'0'}}
                                type='button'
                                label='Register'
                            /> 
                        </div>
                    </form>

                    <Controls 
                        signout={false}
                        changeTo={this.props.changeTo} />

                </React.Fragment> : 
                
                <Controls 
                        signout={true}
                        changeTo={this.props.changeTo} />}
            </div>
        );
    }
}

export default SignUp;