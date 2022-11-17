import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {auth, db} from '../firebase/config';
import firebase from 'firebase';

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            numeroDeLikes: this.props.postData.data.likes.length,
            likes:false,
            numeroComentarios: this.props.postData.data.comentarios,
        }
    }

    like(){
     
        db.collection('posts')
            .doc(this.props.postData.id) 
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(()=> this.setState({
                numeroDeLikes: this.state.numeroDeLikes +1,
                likes: true, 
                })
            )
            .catch(e=>console.log(e))
    }

    unlike(){
        db.collection('posts')
        .doc(this.props.postData.id) //identificar el documento
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email) //traer el email del usuario logueado con auth.currentUser.email. Chequear que este importado auth.
        })
        .then(()=> this.setState({
            numeroDeLikes: this.state.numeroDeLikes -1,
            likes: false, 
            })
        )
        .catch(e=>console.log(e))
      
        
    }

    render(){
        return(
            <View>

                <Image 
                    style={styles.photo}
                    source={{uri: this.props.postData.data.photo}}
                    resizeMode='cover'
                />
          
                <Text> {this.props.postData.data.description} </Text>
                <Text onPress={()=>this.props.navigate.navigation('ProfileUser',)} >
                {this.props.postData.data.userName}
            </Text>
                { this.state.likes ? 
                    <TouchableOpacity onPress={ ()=> this.unlike() }>
                        <Text>No me gusta más</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={ ()=> this.like() }>
                        <Text>Me gusta</Text>
                    </TouchableOpacity>
                }
                 <Text> {this.state.numeroDeLikes} likes</Text>
                 <Text onPress={()=>this.props.navigation.navigate('ProfileUser')} >
                {this.props.postData.data.owner}
            </Text>
                 <TouchableOpacity onPress={()=>this.props.navigation.navigate('Comentarios', {id:this.props.postData.id})}>
                    <Text>Ver Comentarios</Text>
                 </TouchableOpacity>
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