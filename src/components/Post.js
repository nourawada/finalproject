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
        console.log(this.props.postData.data);
        return(
            <View style={styles.container2}>
            <View style={styles.container}>
            <Text style={styles.text2} onPress={()=>this.props.navigation.navigate('ProfileUser',  { email: this.props.postData.data.owner })} >
                {this.props.postData.data.owner}
            </Text>
                <Image 
                    style={styles.photo}
                    source={{uri: this.props.postData.data.photo}}
                    resizeMode='cover'
                />
          
                <Text style={styles.text}>{this.props.postData.data.owner} {this.props.postData.data.description} </Text>
                
                { this.state.likes ? 
                    <TouchableOpacity onPress={ ()=> this.unlike() }>
                        <Text style={styles.text}>No me gusta más</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={ ()=> this.like() }>
                        <Text style={styles.text}>Me gusta</Text>
                    </TouchableOpacity>
                }
                 <Text style={styles.text}> {this.state.numeroDeLikes} likes</Text>
                 
                 <TouchableOpacity onPress={()=>this.props.navigation.navigate('Comentarios', {id:this.props.postData.id})}>
                    <Text style={styles.text}>Ver Comentarios</Text>
                 </TouchableOpacity>
            </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container2:{
        
        margin:30,
        backgroundColor:'rgb(24, 49, 69)',
        borderRadius: 10,
    },
    container:{
        flex:1,
        backgroundColor: 'rgb(24, 49, 69)',
        margin:30,
        justifyContent: 'center',
        marginTop: 10,
    },
    title:{
        fontSize:22  
    },
    text:{
        fontSize: 18,
        marginBottom: 8,
        fontFamily: 'emoji',
        marginLeft: 3    
    },
    text2:{
        fontSize: 18,
        marginTop: 5,
        fontFamily: 'emoji',
        marginLeft: 3  
     
    },
    photo:{
        marginTop: 10,
        marginBottom: 8,
        height:300,
        width: 300,
        borderRadius: 8,
    }
}) 

export default Post;