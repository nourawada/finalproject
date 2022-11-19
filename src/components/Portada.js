import React, {Component} from "react";
import {auth, db} from '../firebase/config'
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";

class Portada extends Component {
    constructor(){
        super()
        this.state = {

        }
    };
    componentDidMount(){
        auth.onAuthStateChanged(user =>{
            if(user){
                this.props.navigation.navigate('HomeMenu')
            }
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text} onPress={()=> this.props.navigation.navigate('Register')}>No tenes una cuenta? Registrate</Text>
                <Text style={styles.text2} onPress={()=> this.props.navigation.navigate('Login')}>Si ya tenes cuenta, inicia sesion</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgb(33, 64 ,92)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontSize:40  
    },
    text:{
        backgroundColor: 'rgb(168, 187, 201)',
        fontSize: 20,
        padding:15,
        marginTop: 5,
        borderRadius: 10
     
    },
    text2:{
        backgroundColor: 'rgb(44, 90 ,131)',
        fontSize: 20,
        padding: 15,
        marginTop: 35,
        borderRadius: 10
    }
})

export default Portada