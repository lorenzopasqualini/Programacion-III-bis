import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { auth, db } from '../firebase/config';
import Post from '../components/Post';
import Emoji from 'a11y-react-emoji'

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
        };
    }

    componentDidMount(){
        db.collection('posts')
        .where('owner', '==', auth.currentUser.displayName)
        .orderBy('createdAt', 'desc')
        .onSnapshot(
            (docs)=>{
                let postsAux= [];
                docs.forEach((doc)=>{
                    postsAux.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                this.setState({
                    posts: postsAux,
                })
            }
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>User: {auth.currentUser.displayName}</Text>
                <Text style={styles.text}>Mail: {auth.currentUser.email}</Text>
                <Text style={styles.text}>Last sign in: {auth.currentUser.metadata.lastSignInTime}</Text>
                <Text style={styles.text}>Posts: {this.state.posts.length}</Text>{' '}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.handleLogout()}
                >
                    <Emoji symbol="🔒" label="logout" />
                </TouchableOpacity>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(post)=> post.id.toString()}
                    renderItem={({ item })=> <Post dataItem={item}></Post>}
                />
            </View>
        );
    }

}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2b3a67'
    },

    button: {
        backgroundColor: 'darksalmon',
        textAlign: 'center',
        borderRadius: 4,
        padding: 4,
        margin: 8,
        width: 50,
    },

    text: {
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 2,
        padding: 2,
        marginTop: 2,
        marginBottom: 2
    },
})
