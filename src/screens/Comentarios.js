import React, {Component} from "react";
import {auth, db} from '../firebase/config'
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {FlatList} from "react-native-web"


class Comentarios extends Component {
    //estan llegando por el posteo
    constructor(props){
        super(props)
        this.state = {
            //lo que le va a llegar a comentarios desde post
            comentarios: this.props.comentarios
        }
    };

    render(){
        return(
            <View>
            <Text>Hola Mundo</Text>      
        </View>
        );
    }
};

export default Comentarios