import React, {Component} from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import MyCamera from '../components/MyCamera';
import Emoji from 'a11y-react-emoji'

export default class CreatePost extends Component {
    constructor(props){
        super(props);
        this.state= {
            comment: '',
            photo: '',
            showCamera: true
        }
    }

    handlePost(){
        db.collection('posts').add({
            owner: auth.currentUser.displayName,
            description: this.state.comment,
            email: auth.currentUser.email,
            createdAt: Date.now(),
            likes: [],
            comments: [],
            photo: this.state.photo
        })
        .then(response=> {
            console.log(response);
            alert('All done! Enjoy your post!');
            this.setState({
                comment: ''
            })
            console.log(this.props);
            this.props.navigation.navigate('Home');
        })
        .catch(e=> {
            console.log(e);
            alert('An error occurred');
        })
    }

    guardarFoto(url){
        this.setState({
            photo: url,
            showCamera: false,
        })
    }
    
    render(){
        return(
            <>
            {this.state.showCamera ? 
            <MyCamera savePhoto = {(url)=>this.guardarFoto(url)}/>
            :
            <>
            <View style={styles.container}>
                <Image
                    source ={{uri: this.state.photo}}
                    style = {styles.preview}
                />
                <TextInput
                    style={styles.field}
                    keyboardType='default'
                    multiline={true}
                    numberOfLines = {1}
                    onChangeText={text => this.setState({ comment: text })}
                    value = {this.state.comment}
                />
                <TouchableOpacity style = {styles.button} onPress={() => this.handlePost()}>
                    <Text> <Emoji symbol="🖼️" label="post" /> </Text>
                </TouchableOpacity>
            </View>
            </>
            }
            </>
        )
    }
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'lightseagreen'
    },

    field: {
        width: 250,
        backgroundColor: 'white',
        color: 'black',
        margin: 10,
        borderRadius: 4
    },

    button: {
        width: 250,
        backgroundColor: 'greenyellow',
        textAlign: 'center',
        padding: 10,
        borderRadius: 4
    },

    preview: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
})