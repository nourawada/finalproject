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
    return( <View style={styles.container}>
        <TextInput style={styles.text}
            placeholder='Buscar usuarios..'
            keyboardType="default"
            onChangeText={text => this.buscar(text)}
            value={this.state.text}/>
            <TouchableOpacity onPress={()=>this.buscar(this.state.text)}>
                        <Text style={styles.text}>Buscar</Text>
            </TouchableOpacity>
            <FlatList 
                        data={this.state.posts}
                        keyExtractor={ onePost => onePost.id.toString()}
                        renderItem={ ({item})  =><TouchableOpacity onPress={()=>this.props.navigation.navigate('ProfileUser')}>
                             { this.state.text == item.data.owner ?
                     <Text style={styles.text}>{item.data.owner}</Text> : <Text>No exsiste el usuario</Text> }
                        </TouchableOpacity> }
                    /> 
        </View>
        )

}



}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'rgb(33, 64, 92)',
        
    },
    title:{
        fontSize:30  
    },
    text:{
        fontSize: 20,
        marginTop: 5
     
    },
    text2:{
        backgroundColor: 'rgb(24, 51, 73)',
        borderRadius: 10,
        fontSize: 30,
        marginTop: 5
    }
})

export default Buscador