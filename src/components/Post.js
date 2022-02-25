import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import Comments from '../components/Comments';
import Emoji from 'a11y-react-emoji'

export default class Post extends Component{

    constructor(props){
        super(props);
        this.state = {
            liked: false,
            likes: 0,
            showModal: false,
        }
    }

    componentDidMount(){
        if (this.props.dataItem){
            if (this.props.dataItem.data.likes.length !== 0){
                this.setState({
                    likes: this.props.dataItem.data.likes.length
                })
                if (this.props.dataItem.data.likes.includes(auth.currentUser.email)){
                    this.setState({
                        liked: true
                    })
                }
            }
        }
    }

    onLike(){
        const posteoActualizar = db.collection('posts').doc(this.props.dataItem.id)
        posteoActualizar.update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=> {
            this.setState({
                liked: true,
                likes: this.state.likes + 1
            })
        })
    }

    onDislike(){
        const posteoActualizar = db.collection('posts').doc(this.props.dataItem.id)      
        posteoActualizar.update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=> {
            this.setState({
                liked: false,
                likes: this.state.likes - 1
            })
        })
    }
    
    showModal(){
        this.setState({
            showModal: true,
        })
    }
    
    
    closeModal(){
        this.setState({
            showModal: false,
        })
    }

    formatDate(date) {
        const fecha= new Date(date),
        month= (fecha.getMonth() + 1),
        day= fecha.getDate(),
        year= fecha.getFullYear();
        return [day, month, year].join('.');
      }
    
    render(){
        console.log(this.props.dataItem);
        return(
            <View style={styles.container}>

                <Text style={styles.descBold}>{this.props.dataItem.data.owner}</Text>

                <TouchableOpacity style={styles.comment} onPress={()=>{this.showModal()}}>
                    <Emoji symbol="✍️" label="comments" />
                </TouchableOpacity>
                {
                    this.state.showModal ?
                        <Modal 
                        animationType = 'fade'
                        transparent = {false}
                        visible = {this.state.showModal}
                        style = {styles.modal}
                        >
                            <View style={styles.modalView}>
                                <TouchableOpacity onPress={()=>{this.closeModal()}}>
                                    <Emoji symbol="❌" label="delete" />
                                </TouchableOpacity>
                                <Comments
                                comments={this.props.dataItem.data.comments}
                                postId={this.props.dataItem.id}
                                />
                            </View>
                        </Modal>
                        :
                        null
                }

                <Image 
                style={styles.image}
                source={{uri: this.props.dataItem.data.photo}}
                />

                <Text style={styles.description}>{this.props.dataItem.data.description}</Text>
                <Text style={styles.descBold}>{this.formatDate(this.props.dataItem.data.createdAt)}</Text>

                <View style={styles.twobtn}>
                    {
                        !this.state.liked ?
                        <TouchableOpacity style={styles.like} onPress = {()=> this.onLike()}>
                            <Emoji symbol="💕" label="like" />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.delete} onPress = {()=> this.onDislike()}>
                            <Emoji symbol="💕" label="unlike" />
                        </TouchableOpacity>
                    }

                    {
                        this.props.dataItem.data.owner == auth.currentUser.displayName ? (
                        <TouchableOpacity
                            onPress={()=>
                                this.props.deletePost(this.props.dataItem.data.createdAt)
                            }
                            style={styles.delete}
                        > <Emoji symbol="❌" label="delete" />
                        </TouchableOpacity>
                        )
                        : null
                    }
                </View>

                <Text style={styles.descBold}><Emoji symbol="💕" label="like" />{this.state.likes}</Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        padding: 10,
        margin: 10,
        width: 250,
        borderRadius: 4,
        backgroundColor: 'darkslategrey',
        position: 'relative',
        zIndex: -1000,
    },

    image: {
        flex: 1,
        width: 250,
        height: 250,
        resizeMode: 'contain'
    },

    like:{
        backgroundColor: 'greenyellow',
        textAlign: 'center',
        borderRadius: 4,
        padding: 4,
        margin: 2,
        width: 50,
        flex: 1,
        alignItems: 'center'
    },

    delete:{
        backgroundColor: 'tomato',
        textAlign: 'center',
        borderRadius: 4,
        padding: 4,
        margin: 2,
        width: 50,
        flex: 1,
        alignItems: 'center'
    },

    comment:{
        backgroundColor: 'dodgerblue',
        textAlign: 'center',
        borderRadius: 4,
        padding: 4,
        width: 50,
    },

    description:{
        backgroundColor: 'dodgerblue',
        color: 'white',
        padding: 8,
        width: 250,
    },

    descBold:{
        color: 'white',
        padding: 8,
        width: 250,
    },

    twobtn:{
        display: 'flex',
        flexDirection: 'row'
    },

    modal:{
        flex: 1,
        width: 200,
        height: 100,
        resizeMode: 'contain',
        border: 'none',
        margin: 4,
        position: 'fixed',
        zIndex: 9999,
    },

    modalView:{
        backgroundColor: 'aquamarine',
        borderRadius: 4,
        padding: 4,
    }
})