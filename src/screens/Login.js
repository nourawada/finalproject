import React, {Component} from "react";
import {auth, db} from '../firebase/config'
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native'

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
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
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
                    keyboardType="password"
                    onChangeText={text => this.setState({pass:text})}
                    value={this.state.pass}
                />
                 <TouchableOpacity onPress={()=>this.loginUser(this.state.email, this.state.pass)}>
                        <Text style={styles.text2} >Loguearme</Text>
                    </TouchableOpacity>

                 <Text style={styles.text2} onPress={ () => this.props.navigation.navigate('Register')} >Ir a Registro</Text>
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
        backgroundColor:'rgba(204, 204 ,204, 0.1)' ,
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
export default Login