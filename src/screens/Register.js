import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import {auth, db} from '../firebase/config'

class Register extends Component{
    constructor(){
    super()
    this.state={
        email: '',
        pass:'',
        userName:'',
        errores:'',
        bio: '',
        photo:''
    }
}

registerUser(email, pass, userName){
    auth.createUserWithEmailAndPassword(email, pass)
    .then(res => {
        db.collection('users').add({
            owner: email,
            userName: userName,
            createdAt: Date.now()
        })
        .then(()=> {
            this.setState({
                email: '',
                pass:'',
                userName:'',
                errores:'',
                bio:'',
                photo:''
            })
            this.props.navigation.navigate('Login')
        })
    })    
     .catch( error => {
       this.setState({errores: error.message})
     })
  }
 
render(){
    return(
        <View>
            <Text>Registro!</Text>
            <Text>{this.state.errores}</Text>

            <View>
                <TextInput
                    placeholder='Email'
                    keyboardType="email-address"
                    onChangeText={text => this.setState({email:text})}
                    value={this.state.email}
                />
                <TextInput
                    placeholder='Password'
                    keyboardType="default"
                    onChangeText={text => this.setState({pass:text})}
                    value={this.state.pass}
                />
                <TextInput
                    placeholder='Username'
                    keyboardType="email-address"
                    onChangeText={text => this.setState({userName:text})}
                    value={this.state.userName}
                />
                <TextInput
                    placeholder='Biografia'
                    keyboardType="default"
                    onChangeText={text => this.setState({bio:text})}
                    value={this.state.bio}
                />

            </View>
            <TouchableOpacity onPress={()=>this.registerUser(this.state.email, this.state.pass, this.state.userName, this.state.bio )}>
                <Text>Registrarme</Text>
            </TouchableOpacity>
        <Text onPress={ ()=> this.props.navigation.navigate('Login')}>Ir a login</Text>            
        </View>
        
    )
}
}
export default Register