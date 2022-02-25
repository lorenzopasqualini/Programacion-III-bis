import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';
import Emoji from 'a11y-react-emoji'

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    render() {
        console.log(this.state.loggedIn);
        return (
            <View style= {styles.container}>
                <TextInput
                    style= {styles.field}
                    keyboardType= 'email-address'
                    placeholder= 'E-Mail'
                    onChangeText= {text=> this.setState({ email: text })}
                />
                <TextInput
                    style={styles.field}
                    keyboardType= 'number-pad'
                    placeholder= 'Password'
                    secureTextEntry= {true}
                    onChangeText= {text => this.setState({ password: text })}
                />
                <TouchableOpacity style= {styles.button} onPress={()=> this.props.handleLogin(this.state.email, this.state.password)}>
                    <Text style= {styles.text}> <Emoji symbol="🌻" label="singin" /> </Text>
                </TouchableOpacity>
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
        padding: 10,
        marginVertical: 10,
        borderRadius: 4
    },

    button: {
        width: 250,
        backgroundColor: 'greenyellow',
        textAlign: 'center',
        padding: 10,
        borderRadius: 4
    },

    text: {
        color: 'white',
        fontSize: 20
    },

    image: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%'        
    },
})