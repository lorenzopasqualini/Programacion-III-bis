import React, { Component }  from "react";
import {View, StyleSheet, FlatList, TextInput } from "react-native";
import Post from '../components/Post';
import { db } from '../firebase/config';

export default class Buscador extends Component{
    constructor (props){
        super(props);
        this.state = {
            posts: [],
        }
    }

    onSearch(text){
        db.collection("posts")
        .where("email", "==", text)
        .get()
            .then(docs=>{
                let postsAux= []
                docs.forEach(doc=>{
                    postsAux.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posts: postsAux
                })
            })
    }

    render(){
        console.log(this.state.posts);
        return(
            <View style={styles.container}>
                <TextInput style={styles.container}
                    style={styles.field}
                    keyboardType = 'default'
                    onChangeText = {text => this.onSearch({ posts: text})}
                />
                <FlatList
                    data = {this.state.posts}
                    keyExtractor = {post=> post.id.toString()}
                    renderItem = {({item})=>
                        <Post dataItem={item}></Post>
                    }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'lightseagreen'
    },

    field: {
        width: 250,
        backgroundColor: 'white',
        padding: 4,
        margin: 8,
        borderRadius: 4,
    },
})