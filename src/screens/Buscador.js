import React, {Component} from "react";
import Post from "../components/Post";
import {auth, db} from '../firebase/config'
import {View, Text,TextInput, TouchableOpacity, StyleSheet} from "react-native";
import {FlatList} from 'react-native-web';
import { BottomTabBarHeightCallbackContext } from "@react-navigation/bottom-tabs";




class Buscador extends Component {
    constructor(){
        super()
        this.state = {
            text:'',
            posts: [],
            loading: true,
        }
    };



buscar(text){
    console.log(text);
    console.log( this.state.text);
    this.setState({text:text})
    db.collection('users').where('owner', '==', text).onSnapshot(
        docs => {
            let posts = [];
            docs.forEach( doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                })
                this.setState({
                    posts: posts,
                    loading:false,
                }, console.log(this.state.posts))
            })
            
        }
    )
}


render(){
    return( <View>
        <TextInput
            placeholder='buscador'
            keyboardType="default"
            onChangeText={text => this.buscar(text)}
            value={this.state.text}/>
            <TouchableOpacity onPress={()=>this.buscar(this.state.text)}>
                        <Text>Buscar</Text>
            </TouchableOpacity>
            <FlatList 
                        data={this.state.posts}
                        keyExtractor={ onePost => onePost.id.toString()}
                        renderItem={ ({item})  => <Text>{item.data.owner}</Text>}
                    /> 
        </View>
        )

}



}


export default Buscador