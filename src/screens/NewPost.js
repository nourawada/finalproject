import React, {Component} from "react";
import {auth, db} from '../firebase/config'
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import Camara from '../components/Camara'
import {TextInput} from 'react-native-web'


class NewPost extends Component {
    constructor(){
        super()
        this.state = {
            description:'',
            photo:'',
            showCamera: true,
            likes: [],
            comentarios:[]
        }
    };
    //
    createPost(description, photo){
        db.collection('posts').add({
                owner: auth.currentUser.email, //deberia ser el usuario registrado. auth.currentUser
                description: description,
                photo: photo,
                likes: this.state.likes,
                comentarios: this.state.comentarios,
                createdAt: Date.now()
            })
            .then(() => {
                this.setState({
                    description:'',
                    likes: [],
                    comentarios: []
                })
                this.props.navigation.navigate('Home')
            })
            .catch( e => console.log(e))
    }


    onImageUpload(url){
        this.setState({
            photo:url,
            showCamera: false,
        })
    }


    render(){
        return(
            <View>
                <Text>Hace un posteo</Text>
                {
                this.state.showCamera ?
                <Camara onImageUpload={(url) => this.onImageUpload(url)} style={{width: "125vw", heigth: "125vh"}}/>
                :
                <View>
                    <Text> Nuevo posteo</Text>
                    <View>
                        <TextInput  
                            placeholder='texto post'
                            keyboardType='default'
                            //poner propiedad para transformarlo en textArea
                            onChangeText={ text => this.setState({description:text}) }
                            value={this.state.description}
                        /> 
                        <TouchableOpacity onPress={()=>this.createPost(this.state.description, this.state.photo)}>
                            <Text>Postear</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            </View>
        );
    }
};




export default NewPost