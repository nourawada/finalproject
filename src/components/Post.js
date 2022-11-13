import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {auth, db} from '../firebase/config';
import firebase from 'firebase';

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            numeroDeLikes: this.props.postData.data.likes.length,
            milike:false,
            comentarios: this.props.postData.data.comentarios
        }
    }
    componentDidMount(){
        if(this.props.postData.data.likes.includes(auth.currentUser.email)){ 
            this.setState({
                milike:true
            })
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
                milike: true, 
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
            milike: false, 
            })
        )
        .catch(e=>console.log(e))
      
        
    }

    render(){
        console.log(this.props);
        return(
            <View>
                <Image 
                    style={styles.photo}
                    source={{uri: this.props.postData.data.photo}}
                    resizeMode='cover'
                />
                <Text> {this.props.postData.data.description} </Text>
                { this.state.milike ? 
                    <TouchableOpacity onPress={ ()=> this.unlike() }>
                        <Text>No me gusta más</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={ ()=> this.like() }>
                        <Text>Me gusta</Text>
                    </TouchableOpacity>
                }
                 <Text> {this.state.numeroDeLikes} likes</Text>
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