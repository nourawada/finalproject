import React, {Component} from "react";
import {auth, db} from '../firebase/config'
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import HomeMenu from "../components/HomeMenu";

class NewPost extends Component {
    constructor(){
        super()
        this.state = {

        }
    };

    render(){
        return(
            <View>
                <Text>Hola Mundo!</Text>
                
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

export default NewPost