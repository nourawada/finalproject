import React, {Component} from "react";
import {auth, db} from '../firebase/config'
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import { Camera } from 'expo-camera'
import {storage} from '../firebase/config'

class Camara extends Component {
    constructor(props){
        super(props);
        this.state = {
            permissions: false,
            showCamera: true,
            photo:''
       }
       this.metodosDeCamara = ''
    }
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=>{
             this.setState({
                 permissions: true,
             })
        })
        .catch( e => console.log(e))          
    }
    takePicture(){
        this.metodosDeCamara.takePictureAsync()
         .then(photo => {
            this.setState({
              photo: photo.uri, //Es una uri interna temporal de la foto.
              showCamera:false
            })
        })
      }
      savePhoto(){
        fetch(this.state.photo)
         .then(res=>res.blob())
         .then(image =>{
           const refStorage=storage.ref(`photos/${Date.now()}.jpg`)
           refStorage.put(image)
                .then(()=>{
                    //la url publica de foto
                   refStorage.getDownloadURL()
                        .then(url => {
                            //la url que recibimos la vamos a pasar a traves de onImageUpload al otro componente
                            //esta url viene del componente anterior
                            this.props.onImageUpload(url);
                         })
                 })
         })
         .catch(e=>console.log(e))
       }
       clearPhoto(){
        this.setState({
            photo:'',
            showCamera: true
        })
       }
             
    

    render(){
        return(
            <View>
            {
                this.state.permissions ? 
                    this.state.showCamera ?
                    <View style={styles.cameraBody}>
                        <Camera
                            style={styles.cameraBody}
                            type = {Camera.Constants.Type.front}
                            ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara }
                        />
                        <TouchableOpacity style={styles.button} onPress={()=>this.takePicture()}>
                            <Text style={styles.text2}>Sacar foto</Text>
                        </TouchableOpacity>
                    </View>
            :
            <View>
                <Image style={styles.preview}
                source={ {uri:this.state.photo} }
                resizeMode = 'cover'
                />
                
                <View style={styles.button}>
                <TouchableOpacity onPress={()=>this.savePhoto()}>
                <Text style={styles.text2}>Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.clearPhoto()}>
                <Text style={styles.text2}>Rechazar</Text>
                </TouchableOpacity>
                </View>
            </View>
            :
            <Text>No tengo permisos</Text>
            }
            </View>
        );
        }
};
const styles = StyleSheet.create({
    cameraBody: {
        height: '80vh',
    },
    button:{
        height: '20vh',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
        marginTop: 20
    },
    preview:{
        height:'60vh'
    },
    text2:{
        fontSize: 20,
        fontFamily: 'emoji',
    },
}) 

export default Camara