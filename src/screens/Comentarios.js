import React, {Component} from "react";
import {auth, db} from '../firebase/config'
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {FlatList, TextInput} from "react-native-web"
import firebase from "firebase";


class Comentarios extends Component {
    //estan llegando por el posteo
    constructor(props){
        super(props)
        this.state = {
            //lo que le va a llegar a comentarios desde post
            comentarios: [], //el array que te llega con todos los comentarios anteriores
            comentario: '', //lo que esribe la persona en el input que va a ser un string vacio
            data: '', //seria toda la data de los posteos que tiene el id que queremos buscar
            id: this.props.route.params.id //busca el id que coincide con los comentarios 
        }
    };
    //se va a buscar a posteos el posteo que tenga el id y lo que quiero recuperar es toda la data
    componentDidMount(){
        db.collection('posts').doc(this.state.id).onSnapshot(
            docs => {
                this.setState({
                    comentarios: docs.data().comentarios
                })
            })
    };

    subirMiComentario(comentario){
        db.collection("posts")
        .doc(this.state.id)
        .update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({owner:auth.currentUser.email,comentario:comentario,createdAt: Date.now()})  
    })
    .then(() => {
        this.setState({
            comentario: "",     
    }) })
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Comentarios del posteo actual </Text>
                {this.state.comentarios.length === 0 ?
                <View > 
                    <Text style={styles.text}>Aún no hay comentarios. Sé el primero en opinar </Text>  
                </View>
                :
                <FlatList style={styles.text}
                    data={this.state.comentarios}
                    keyExtractor={ unComentario => unComentario.createdAt.toString()}
                    renderItem={({item}) => <Text style={styles.text2}>{item.owner} comento: {item.comentario}</Text>}
                />
                }
            <TextInput style={styles.text}
                placeholder='Agregar comentario'
                keyboardType='default'
                onChangeText={comentario=> this.setState({comentario:comentario})}
                value={this.state.comentario}
            />
            
            {this.state.comentario === '' ?
                <></>
                :
                <TouchableOpacity onPress={()=> this.subirMiComentario(this.state.comentario) }>
                    <Text style={styles.text}>Subir comentario</Text>
                </TouchableOpacity> 
       } 
        </View>
        );
    }
};
const styles = StyleSheet.create({
    
    container:{
        flex:1,
        backgroundColor: 'rgb(33, 64 ,92)'
    
    },
    text:{
        marginTop: 10,
        fontFamily: 'emoji',
        fontSize: 17

    },
    text2:{
        fontSize: 18,
        fontFamily: 'emoji',
    },
    text3:{
        marginLeft: 100,
        fontFamily: 'emoji',
        fontSize: 24,

    },
    

    })

export default Comentarios