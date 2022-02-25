import { Camera } from 'expo-camera';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { storage } from '../firebase/config';
import Emoji from 'a11y-react-emoji'

export default class MyCamera extends Component{
    constructor(props){
        super(props);
        this.camera;
        this.state= {
            photo: '',
            permission: false,
        }
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(response=> {
            this.setState({
            permission: response.granted
            })
        })
    }

    takePicture(){
        if(!this.camera) return;
        this.camera.takePictureAsync()
        .then(photo=> {
            this.setState({
                photo: photo.uri
            })
        })
    }

    uploadImage(){
        fetch(this.state.photo)
        .then(res=> {
            return res.blob();
        })
        .then(image=> {
            const dir= storage.ref(`camera/${Date.now()}.jpg`)
            dir.put(image)
            .then(()=>{                
                dir.getDownloadURL()
                .then(url=> {
                    console.log(url);
                    this.setState({
                        photo: ''
                    })
                    this.props.savePhoto(url);
                })
            })
        })
    }

    onReject(){
        this.setState({
            photo: ''
        })
    }

    render(){
        return(
        <View style= {styles.container}>
            {
            this.state.photo ?
            <>
            <Image 
            style= {styles.preview}
            source= {{uri: this.state.photo}}
            />
            <View style= {styles.btnthumb}>
                <TouchableOpacity style={styles.reject} onPress={()=> this.onReject()}>
                    <Emoji symbol="👎" label="thumbsdown" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.accept} onPress={()=> this.uploadImage()}>
                    <Emoji symbol="👍" label="thumbsup" />
                </TouchableOpacity>
            </View>
            </>
            :         
            <Camera
            style={styles.camera}
            type={Camera.Constants.Type.front || Camera.Constants.Type.back}
            ref= {ref=> this.camera= ref}
            >
                <View style= {styles.buttonContainer}>
                    <TouchableOpacity
                        style= {styles.btnshutter}
                        onPress= {()=> this.takePicture()}>
                    </TouchableOpacity>
                </View>
            </Camera>
            }
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

    camera: {
        flex: 1,
        width: '100%',
    },

    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        height: 125,
        bottom: 40,
        position: 'absolute',
        width: '100%',
    },

    btnshutter: {
        width: 125,
        height: '100%',
        borderWidth: 5,
        borderColor: 'white',
        borderRadius: 100,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },

    preview: {
        flex: 3,
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },

    btnthumb: {
        flex: 3,
        gap: 6,
        flexDirection: 'row',
    },

    accept: {
        backgroundColor: 'greenyellow',
        width: 50,
        height: 50,
        borderRadius: 4,
        textAlign: 'center',
    },

    reject: {
        backgroundColor: 'tomato',
        width: 50,
        height: 50,
        borderRadius: 4,
        textAlign: 'center',
    }
})