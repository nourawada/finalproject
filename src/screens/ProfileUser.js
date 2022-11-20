import React, {Component} from "react";
import {auth, db} from '../firebase/config'
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
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
        console.log(this.props.route);
            db.collection('posts').where('owner', '==', this.props.route.params.email).onSnapshot(
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
            db.collection('users').where("owner", "==", this.props.route.params.email).onSnapshot(
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
        <View style={styles.conteiner}>
                    <Image
                        style={styles.foto}
                        source={{ uri: this.state.user.photo }}
                        resizeMode='cover'
                        />
                    <Text style={styles.text}>Username: {this.state.user.userName}</Text>
                    <Text style={styles.text}>Email: {this.state.user.owner}</Text>
                    <Text style={styles.text}>Biografia: {this.state.user.bio}</Text>
                    <Text style={styles.text}>Cantidad de posts: {this.state.posts.length}</Text>


            <Text style={styles.text3}>Lista de Posteos</Text>
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
    foto:{
        width: 90,
        height: 90,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "black",
        marginTop: 10,
        marginLeft: 10
    },
    conteiner:{
        flex:1,
        backgroundColor: 'rgb(33, 64 ,92)'
    
    },
    title:{
        fontSize: 22,
    },
    text:{
        marginLeft: 10,
        fontFamily: 'emoji',
        fontSize: 18

    },
    text2:{
        fontSize: 18,
        fontFamily: 'emoji',
        marginLeft: 10
    },
    text3:{
        marginLeft: 150,
        fontFamily: 'emoji',
        fontSize: 18,
        marginTop: 60

    },
    view:{
        borderWidth:1
    }
    

    })

export default ProfileUser