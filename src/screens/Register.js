import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';
import Emoji from 'a11y-react-emoji'

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state= {
            email: '',
            password: '',
            username: ''
        }
    }

    handleRegister(){
        if (this.state.email !== "" && this.state.password !== "" && this.state.username !== ""){
            this.props.handleRegister(this.state.email, this.state.password, this.state.username)
        }
        else {
            console.log('Faltan datos')
        }
    }

    render(){
        return (
            <View style= {styles.container}>
                <TextInput
                    style= {styles.field}
                    keyboardType= 'default'
                    placeholder= 'Username'
                    onChangeText={text => this.setState({ username: text })}
                />
                <TextInput
                    style= {styles.field}
                    keyboardType= 'email-address'
                    placeholder= 'E-Mail'
                    onChangeText= {text=> this.setState({ email: text })}
                />
                <TextInput
                    style= {styles.field}
                    keyboardType='default'
                    placeholder= 'Password'
                    secureTextEntry= {true}
                    onChangeText= {text=> this.setState({ password: text })}
                />
                <TouchableOpacity style= {styles.button} onPress={()=> this.handleRegister()}>
                    <Emoji symbol="🥰" label="register" />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2b3a67'
    },

    field: {
        width: 300,
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 10,
        marginBottom: -2,
        borderRadius: 4
    },

    button: {
        backgroundColor: 'greenyellow',
        padding: 10,
        marginVertical: 10,
        borderRadius: 4,
        textAlign: 'center'
    },

    text: {
        color: 'black',
        fontSize: 20
    },

    image: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%'        
    },
})