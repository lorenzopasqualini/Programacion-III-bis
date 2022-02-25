import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import { auth } from '../firebase/config';
import Post from './Post';
import Profile from './Profile';
import Buscador from "./Buscador";

export default class Menu extends Component{
    constructor(props){
        super(props);
        this.state={
            loggedIn: false,
            error: null,
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user=>{
            if(user){
                this.setState({
                    loggedIn: true
                })
            }
        })
    }
    
    
    handleLogin(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(response=> {
            console.log(response);
            alert("Succesful sign in!");
            this.setState({
                loggedIn: true
            })
        })
        .catch(response=> {
            console.log(response);
            alert("Error signing in. Try again!");
            this.setState({
                error: "Error en loggeo"
            })
        })
    }
    
    handleRegister(email, password, username){
        auth.createUserWithEmailAndPassword(email, password)
        .then(response=>{
            console.log(response);
            alert("All done! Thanks for using the app!");
            response.user.updateProfile({
                displayName: username
            })
            this.setState({
                loggedIn: true
            })
        })
        .catch(e=> {
            console.log(e);
            alert("Error registering user. Try again!");
            this.setState({
                error: "Fallo en el registro"
            })
        })
    }

    handleLogout(){
        auth.signOut()
        .then(()=> {
            this.setState({
                loggedIn: false
            })
        })
        .catch(e=>{
            console.log(e);
        })
    }

    render(){
        const Drawer= createDrawerNavigator();
    
        return(
            <NavigationContainer>
                    <Drawer.Navigator initialRouteName="Login">
                        {this.state.loggedIn === true ? 
                        <>
                            <Drawer.Screen name = "Home">
                                {props => <Home {...props}/>}
                            </Drawer.Screen>
                            <Drawer.Screen name = "Post">
                                {props => <Post {...props}/>}
                            </Drawer.Screen>
                            <Drawer.Screen name="Search">
                                {props => <Buscador {...props}/>}
                            </Drawer.Screen>
                            <Drawer.Screen name = "Profile">
                                {props => <Profile {...props} handleLogout={()=>this.handleLogout()}/>}
                            </Drawer.Screen>

                        </>
                        :
                        <>
                            <Drawer.Screen name="Login">
                                {props => <Login {...props} handleLogin={(email, password)=>this.handleLogin(email, password)}/>}
                            </Drawer.Screen>
                            <Drawer.Screen name = "Registro">
                                {props => <Register {...props} handleRegister={(email, password, username)=>this.handleRegister(email, password, username)}/>}
                            </Drawer.Screen>
                        </>
                    }
                    </Drawer.Navigator>
                </NavigationContainer>
            )
        }
}