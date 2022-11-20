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
            <View>
            <View>
                <Text onPress={() => this.cerrarSesion()}>Cerrar sesión</Text>
            </View>
            {
                this.state.user.length == 0 ?
                <Text></Text> :
                <Text> Profile Name : {this.state.user.userName} </Text>
            }
            <Image
                style={styles.foto}
                source={{ uri: this.state.user.photo }}
                resizeMode='contain'
                />
            <Text> Lista de posteos</Text>
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
        width:250,
        height:250
    }
})

export default Profile