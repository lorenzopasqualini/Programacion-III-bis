import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "firebase";
import Emoji from 'a11y-react-emoji'

export default class Post extends Component {
    constructor(props){
        super(props);
        this.state={
            comment: '',
        };
    }

    onComment(){
        const posteoActualizar= db.collection("posts").doc(this.props.postId);
        if(this.state.comment == ''){
            alert('Comment anything!')
        } else {
            posteoActualizar.update({
                comments: firebase.firestore.FieldValue.arrayUnion({
                    id: Date.now(),
                    email: auth.currentUser.email,
                    owner: auth.currentUser.displayName,
                    comment: this.state.comment,
                }),
            })
            .then(()=>{
                this.setState({
                    comment: '',
                });
            });
        }
    }

    render(){
        return(
            <View>
                {this.props.comments.length != 0 ? (
                    <FlatList
                    data={this.props.comments}
                    keyExtractor={(comment)=> comment.id}
                    renderItem={({ item })=>(
                        <>
                        <Text>
                            {item.owner}: {item.comment}
                        </Text>
                        </>
                    )}
                    />
                ) : null
                }

                <TextInput
                keyboardType="default"
                multiline={true}
                numberOfLines={1}
                onChangeText={(text) => this.setState({ comment: text })}
                value={this.state.comment}
                style={styles.placeholder}
                />
                <TouchableOpacity style={styles.post} onPress={() => this.onComment()}>
                    <Emoji symbol="✉️" label="send" />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    container:{
        flex: 1,
    },

    post:{
        flex: 1,
        alignItems: 'center',
        width: 50,
        backgroundColor: 'greenyellow',
        padding: 4,
        margin: 4,
        borderRadius: 4,
    },

    placeholder:{
        backgroundColor: 'white',
        borderRadius: 4,
    },
});