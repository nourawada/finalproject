import React, {Component} from "react";
import {auth, db} from '../firebase/config'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'

class Login extends Component{
    constructor(){
        super()
        this.state={
            email: '',
            pass:'',
            userName:'',
            errores:''
        }
        
    }
    loginUser(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
            .then( res => {
                this.props.navigation.navigate('HomeMenu')
            })
            .catch( error => {
                this.setState({errores: error.message})
              })
    }
    render(){
    return(
        <View>
            <Text>Login</Text>
            <Text>{this.state.errores}</Text>
            <View>
                <TextInput
                    placeholder='email'
                    keyboardType="email-address"
                    onChangeText={text => this.setState({email:text})}
                    value={this.state.email}
                />
                <TextInput
                    placeholder='password'
                    keyboardType="password"
                    onChangeText={text => this.setState({pass:text})}
                    value={this.state.pass}
                />
                 <TouchableOpacity onPress={()=>this.loginUser(this.state.email, this.state.pass)}>
                        <Text>Loguearme</Text>
                    </TouchableOpacity>

                 <Text onPress={ () => this.props.navigation.navigate('Register')} >Ir a Registro</Text>
            </View>
        </View>
    )
}

}
export default Login