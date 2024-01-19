import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer"
import { useContext } from "react";
import { Alert, PermissionsAndroid, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../Constants/Colors";
import { AuthContext } from "../Context/AuthContext";
import { getRequestToken, logout } from "../Services/MovieServices";
import Styles from "../Styles/Styles";

const MyDrawer= ({navigation})=>{
    
    const {reqToken,setReqToken}= useContext(AuthContext);
    const {sessId,setSessId}= useContext(AuthContext);
    return(
    <DrawerContentScrollView backgroundColor={Colors.yellow}>

        <DrawerItem
        label='Home'
        onPress={()=>{navigation.navigate('Home')}}/>
        <DrawerItem
        label='Rating'
        onPress={()=>{if (sessId !== null) {
                        navigation.navigate('Rating');
                        } else {
                            Alert.alert('Not logged in', 'You must log in to access this feature');
                        }}}/>
        <DrawerItem
        label='Favorites'
        onPress={()=>{if (sessId !== null) {
                        navigation.navigate('Favorites');
                        } else {
                            Alert.alert('Not logged in', 'You must log in to access this feature');
                        }
                    }}/>
        <DrawerItem
        label='Login'
        onPress={()=>{if(sessId === null){
                        navigation.navigate('Login'), getRequestToken().then((tokenResponse)=>
                        setReqToken(tokenResponse.data.request_token))
                        }else{
                            Alert.alert('Already logged in', 'Logout first to access another account');
                        }
                    }
                        }/>
        <View style={{marginTop:430}}>
            <DrawerItem
            label='Logout'
            onPress={()=>{if(sessId===null){
                            Alert.alert('Not logged in', 'You must log in to access this feature');
                            }else{
                                logout(sessId)
                                AsyncStorage.removeItem('savedSessId')
                                setSessId(null)
                                navigation.navigate('Home')}
                            }
            }/>
        </View>

    </DrawerContentScrollView>
    );
}

export default MyDrawer;