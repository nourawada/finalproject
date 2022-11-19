import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import {auth, db} from '../firebase/config'
import Camara from "../components/Camara";
import firebase from "firebase";
import { StyleSheet } from "react-native-web";

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

registerUser(email, pass, userName, bio, photo){
    auth.createUserWithEmailAndPassword(email, pass)
    .then(res => {
        db.collection('users').add({
            owner: email,
            userName: userName,
            createdAt: Date.now(),
            bio:bio,
            photo: photo
        })
        .then(()=> {
            this.setState({
                email: '',
                pass:'',
                userName:'',
                errores:'',
                bio:'',
                photo:'',
                showCamara: false
            })
            this.props.navigation.navigate('Login')
        })
    })    
     .catch( error => {
       this.setState({errores: error.message})
     })
  }
  onImageUpload(url){
    this.setState({
        photo: url,
        showCamara: false

    })
  }
 
render(){
    return(

        <View style={styles.container}>
            <Text style={styles.title}>Registrate</Text>
            <Text>{this.state.errores}</Text>

            <View>
                <TextInput style={styles.text}
                    placeholder='Email:'
                    keyboardType="email-address"
                    onChangeText={text => this.setState({email:text})}
                    value={this.state.email}
                />
                <TextInput style={styles.text}
                    placeholder='Password:'
                    keyboardType="default"
                    onChangeText={text => this.setState({pass:text})}
                    value={this.state.pass}
                />
                <TextInput style={styles.text}
                    placeholder='Username:'
                    keyboardType="email-address"
                    onChangeText={text => this.setState({userName:text})}
                    value={this.state.userName}
                />
                <TextInput style={styles.text}
                    placeholder='Biografia'
                    keyboardType="default"
                    onChangeText={text => this.setState({bio:text})}
                    value={this.state.bio}
                />
                 {
                        this.state.showCamara ?
                        <View>
                            <Camara onImageUpload={url => this.onImageUpload(url)} style={{width: "40vw", heigth: "40vh", alignItems: 'center'}}/> 
                        </View> 
                        :
                        <TouchableOpacity onPress={()=> this.setState({showCamara:true})}>
                            <Text style={styles.text} >Subir foto de perfil</Text>
                        </TouchableOpacity> 
                    }


            <TouchableOpacity onPress={()=>this.registerUser(this.state.email, this.state.pass, this.state.userName, this.state.bio, this.state.photo )}>
                <Text style={styles.text2}>Registrarme</Text>
            </TouchableOpacity>
        <Text style={styles.text2}  onPress={ ()=> this.props.navigation.navigate('Login')}>Ir a login</Text>            
        </View>
        </View>

    )
}
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'rgb(30, 51, 70)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontSize:40  
    },
    text:{
        backgroundColor: 'rgba(204, 204 ,204, 0.1)',
        fontSize: 40,
        borderRadius: 10,
        marginTop: 5
     
    },
    text2:{
        backgroundColor: 'rgb(24, 45, 62)',
        borderRadius: 10,
        fontSize: 40,
        marginTop: 5
     
    }
})
export default Register