import React, { useContext, useEffect, useState } from "react";
import { Button, View ,Linking, Text, Alert, TouchableOpacity} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from "react-native-gesture-handler";
import { AuthContext } from "../Context/AuthContext";
import { getRequestToken, getSessionId, validateUserLogin } from "../Services/MovieServices";
import Styles from "../Styles/Styles";
import ItemSeparator from "../Components/ItemSeparator";
import Colors from "../Constants/Colors";


const Login = ({navigation})=>{

    const {sessId,setSessId}= useContext(AuthContext);
    const {reqToken,setReqToken}= useContext(AuthContext);
    const [username,setUsername]= useState();
    const [password,setPassword]= useState();

    const handlePress = () => {
        validateUserLogin(username, password, reqToken)
            .then(() => getSessionId(reqToken))
                .then((sessionResponse) => {
                    setSessId(sessionResponse.data.session_id);
                    AsyncStorage.setItem('savedSessId', sessionResponse.data.session_id);
                })
                .catch((error) => {
                    // Show an alert with the error message
                    Alert.alert( "Error",error.message);
                })
    };

    useEffect(()=>
    {if (sessId !== null) {
        Alert.alert('Logged In!', 'Loggin Successful');
        navigation.navigate('Home');
    }}
    );

    return(
    <View style={Styles.loginContainer}>
        <Text style={Styles.loginWarningStyle}> This app uses the TMDB API, to access certain features please login using your TMDB account</Text>
        <ItemSeparator height={50}/>
        <TextInput style={Styles.textInputStyle}
            placeholder="TMDB Username"
            onChangeText={usernameInput => 
                    setUsername(usernameInput)
            }
        />
        <TextInput style={Styles.textInputStyle}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={passwordInput => 
                    setPassword(passwordInput)
            }
        />
        <ItemSeparator height={20}/>
        <TouchableOpacity
            style={Styles.loginButtonStyle}
            onPress={handlePress}>
                <Text style={Styles.loginTextStyle}>Login</Text>
        </TouchableOpacity>
        <ItemSeparator height={10}/>
        <View style={{flexDirection:'row', alignSelf:'center'}}>
            <Text style={Styles.registerStyle}>Dont have an account?</Text>
            <TouchableOpacity
            onPress={()=>Linking.openURL('https://www.themoviedb.org/signup')}>
                <Text style={Styles.registerButtonStyle}> Register</Text>
            </TouchableOpacity>
        </View>
    </View>
    );
};

export default Login;