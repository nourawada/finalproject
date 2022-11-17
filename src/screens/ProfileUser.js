import React, {Component} from "react";
import {auth, db} from '../firebase/config'
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {FlatList} from "react-native-web"
import Post from "../components/Post";

class ProfileUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            user:[],
            posts:[],
            email:'',
            bio:'',
            photo:'',
        }
    };
    componentDidMount(){
            db.collection('posts').where('email', '==', this.props.route.params.email).onSnapshot(
                docs =>{
                        let posts = [];
                   docs.forEach( doc => {
                        posts.push({
                            id: doc.id,
                            data: doc.data()
                })
                       this.setState({
                        posts: posts,
                   })
                })
                }
            )
            db.collection('users').where("email", "==", this.props.route.params.email).onSnapshot(
                docs => {
                    let user = [];
                    docs.forEach( doc => {
                        user.push({
                            id: doc.id,
                            data: doc.data()
                        })
                        this.setState({
                            user: user[0].data
                        })
                    }) 
                }
            )
        }

    render(){
        return(
            <View>
                    <Text> {this.state.user.userName}</Text>
                    <Text>{this.state.user.bio}</Text>
                    <Text>{this.state.user.owner}</Text>
                    <Text>Cantidad de posts: {this.state.posts.length}</Text>
            <FlatList 
                data={this.state.posts}
                keyExtractor={ onePost => onePost.id.toString()}
                renderItem={ ({item}) => <Post postData={item} />}
            />       
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

export default ProfileUser