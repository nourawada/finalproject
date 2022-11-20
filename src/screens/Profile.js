import React, {Component} from "react";
import {auth, db} from '../firebase/config'
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import {FlatList} from "react-native-web"
import Post from "../components/Post";


class Profile extends Component {
    constructor(){
        super()
        this.state = {
            user:[],
            posts:[],
            email:'',
            bio:'',

        }
    };
    componentDidMount(){
            db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
                docs =>{
                        let posts = [];
                   docs.forEach( doc => {
                        posts.push({
                            id: doc.id,
                            data: doc.data()
                })
                       this.setState({
                        posts: posts,
                        loading: false,
                   })
                })
                }
            )
            db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
                docs => {
                    let user = [];
                    docs.forEach( doc => {
                        user.push({
                            id: doc.id,
                            data: doc.data(),
                        })
                        this.setState({
                            user: user[0].data,
                        })
                    }) 
                }
            )
        }
        cerrarSesion() {
            auth.signOut()
            this.props.navigation.navigate("Register")
        }

    render(){
        console.log(this.state.user);
        return(
            <View style={styles.conteiner}>
            <Image
                style={styles.foto}
                source={{ uri: this.state.user.photo }}
                resizeMode='cover'
                /> 
            {
                this.state.user.length == 0 ?
                <Text>No hay perfil</Text> :
                <Text style={styles.text2}>{this.state.user.userName} </Text>
            } 
            <View>
                <Text style={styles.text} onPress={() => this.cerrarSesion()}>Cerrar sesión</Text>
            </View>  
            <Text style={styles.text3}>Lista de posteos</Text>
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
    },
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
        fontSize: 16

    },
    text2:{
        fontSize: 18,
        fontFamily: 'emoji',
        marginLeft: 10
    },
    text3:{
        marginLeft: 150,
        fontFamily: 'emoji',
        fontSize: 16,
        marginTop: 60

    },
    

    })


export default Profile