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
            <View style={styles.conteiner} >
                <Text style={styles.title}>Lista de posteos</Text>
                <FlatList 
                        data={this.state.posts}
                        keyExtractor={ onePost => onePost.id.toString()}
                        renderItem={ ({item})  => <Post postData={item} navigation={this.props.navigation} />}
                    /> 
            </View> 
        );
    }
};
const styles = StyleSheet.create({
    conteiner:{flex:1,
        backgroundColor: 'rgb(33, 64 ,92)'

    },
    title:{
        fontSize: 22,
        marginLeft: 125
    }
})



export default Home