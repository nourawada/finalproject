import React, {Component} from "react";
import {auth, db} from '../firebase/config'
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";

class Portada extends Component {
    constructor(){
        super()
        this.state = {

        }
    };
    componentDidMount(){
        auth.onAuthStateChanged(user =>{
            if(user){
                this.props.navigation.navigate('Home')
            }
        })
    }
    render(){
        return(
            <View>
                <Text onPress={()=> this.props.navigation.navigate('Register')}>Registrate</Text>
                <Text onPress={()=> this.props.navigation.navigate('Login')}>Logueate</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    title:{
        fontSize: 22,
        color: "red"
    }
})

export default Portada