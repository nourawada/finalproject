import React, {Component} from "react";
import Post from "../components/Post";
import {auth, db} from '../firebase/config'
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {FlatList} from 'react-native-web';



class Home extends Component {
    constructor(){
        super()
        this.state = {
            posts: []
        }
    };
    componentDidMount(){
        db.collection('posts').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posts,
                        loading:false
                    })
                })
                
            }
        )
    }
    render(){
        return(
            <View>
                <Text>Lista de posteos</Text>
                <FlatList 
                        data={this.state.posts}
                        keyExtractor={ onePost => onePost.id.toString()}
                        renderItem={ ({item}) => <Post postData={item} />}
                    /> 
                    <Text onPress={()=> this.props.navigation.navigate('Login')}>Login</Text>
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

export default Home