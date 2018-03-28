import React, {Component} from 'react';
import Input from '../InputElement/InputElement';
import Controls from '../Controls/Controls';
import config from '../../firebase/firebaseconfig';

import classes from './SignUp.css';

class SignUp extends Component{

    state = {
        email: '',
        password: '',
    }


database = config.database();

writeUserData = (e, email, password) => {
    e.preventDefault()
    email = email.replace(/\./i, 'j')
    this.database.ref('users/' + email).set({
      email: email,
      password: password
    }).then(
        this.setState({email: email,
                        password: password})
    );
}


getUserData = (e, email, password) => {
    e.preventDefault();
    email = email.replace(/\./i, 'j')
    this.database.ref('/users/' + email).once('value').then(snapshot => {
        if(snapshot.val() === null){
            console.log('cliked')
            return false;
        } else if(snapshot.val().email !== email && snapshot.val().password !== password) {
            console.log('cliked 1')
            return false;
        } else {
            console.log('cliked 2')
            this.setState({email: email,
                password: password})
            this.props.toggleLogged()
            return true;
        }
      }).catch((e) => {
          console.log(e);
      });
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
                                reset={(e) => this.getUserData(e, this.state.email, this.state.password)}
                            /> 
                            <Input 
                                style={{marginLeft:'0'}}
                                type='button'
                                label='Register'
                                reset={(e) => this.writeUserData(e, this.state.email, this.state.password)}
                            /> 
                        </div>
                    </form>

                    <Controls 
                        signout={false}
                        changeTo={this.props.changeTo} />

                </React.Fragment> : 
                
                <Controls 
                        signout={true}
                        changeTo={this.props.changeTo} 
                        logOut={this.props.toggleLogged}/>}
            </div>
        );
    }
}

export default SignUp;