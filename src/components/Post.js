import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {auth, db} from '../firebase/config';
import firebase from 'firebase';

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        console.log(this.props);
        return(
            <View>
                <Image 
                    style={styles.photo}
                    source={{uri: this.props.postData.data.photo}}
                    resizeMode='cover'
                />
                <Text> {this.props.postData.data.description} </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    photo:{
        height:250,
        width: 250
    }
}) 

export default Post;