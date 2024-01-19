import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView , Image, Dimensions, TouchableOpacity, Linking ,TouchableNativeFeedback, Modal, Alert, Button} from "react-native";
import { StatusBar } from "expo-status-bar";
import { getMovieDetailsById, getMovieProviders, getPoster,defineTrailerURL, addToRated ,addOrRemoveFromFav} from "../Services/MovieServices";
import { APPEND_TO_RESPONSE as extraInfo } from "../Constants/Urls";
import Colors from "../Constants/Colors";
import ItemSeparator from "../Components/ItemSeparator";
import { Fontisto, Feather , Ionicons} from "@expo/vector-icons";
import Styles from "../Styles/Styles";
import { AuthContext } from "../Context/AuthContext";
import { Rating } from 'react-native-ratings';

const { height, width } = Dimensions.get("window");

const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;


const Details = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [ visRating, toggleVisRating]=useState(false);
  const [ rateValue, setRateValue]=useState();
  const [ movDetails, setMovDetails] = useState({});
  const [ providers, setProviders] = useState({});
  const {sessId}= useContext(AuthContext);
  const providerName = providers?.results?.PT?.flatrate && providers.results.PT.flatrate[0].provider_name; //this will return undefined or null if there are no results for the providers to prevent errors
  const providerLogo = providers?.results?.PT?.flatrate && providers.results.PT.flatrate[0].logo_path;


  useEffect(() => {
    getMovieDetailsById(movieId, `${extraInfo.TRAILER}`).then((response)=> setMovDetails(response?.data));
    getMovieProviders(movieId).then((provResponse)=> setProviders(provResponse?.data));
  },[]);


  return (
    <ScrollView style = {Styles.detailsContainer} showsVerticalScrollIndicator={false}>
      <StatusBar style="auto"/>
      
        <Text style= {Styles.titleStyle}>
          {movDetails.original_title}
        </Text>
        
        <Text style = {Styles.subtitleStyle}>
          {movDetails?.original_language?.toUpperCase()}  -  {movDetails.release_date}  -  {movDetails.runtime}mins
        </Text>
      <ItemSeparator height={ setHeight(2)}/>
      <Modal visible={visRating} transparent={true}>
        <View style={{backgroundColor:"#000000aa", flex:1}}>
          <View style={Styles.ratingBarStyle}>
            <Rating
              type='custom'
              ratingCount={10}
              imageSize={30}
              showRating
              startingValue={5}
              tintColor={Colors.light_black}
              onFinishRating={value=>{setRateValue(value)}}
              />
            <ItemSeparator height={setHeight(2)}/>
            <Button style={Styles.rateButtonStyle}  color={Colors.yellow} title={`Rate as :${rateValue}`} onPress={()=>{toggleVisRating(!visRating) ,addToRated(sessId,movieId,rateValue)}}/>
            <ItemSeparator height={setHeight(2)}/>
            <Button style={Styles.rateButtonStyle} color={Colors.yellow} title="Cancel" onPress={()=>{toggleVisRating(!visRating)}}/>
          </View>
        </View>
      </Modal>
      <View style = {Styles.moviePosterContainer}>
        <Image style = {Styles.movieDetailsPosterImage} resizeMode = "cover"
        source={{uri:getPoster(movDetails?.backdrop_path)}}/>
          <TouchableOpacity
            style={Styles.playButton}
            onPress={() => 
            Linking.openURL(defineTrailerURL(movDetails.videos.results))}>
            <Feather name="play-circle" size={70} color={Colors.black} style={{opacity:0.8}} />
          </TouchableOpacity>
      </View>
      <ItemSeparator height={ setHeight(3)}/>

    <View style={{flexDirection: 'row'}}>
        <Image
          style={Styles.imageContainer} resizeMode = "cover"
          imageStyle={{ borderRadius: 10 }}
          source={{uri:getPoster(movDetails?.poster_path)}}>
        </Image>   
      <View style={{flexDirection: 'column'}}>
        
        <Text style={{justifyContent: 'center' , left: 25 , color: Colors.white  , marginTop: 8}}>Rate This Movie</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableNativeFeedback onPress={()=>{if (sessId !== null) {
                                      toggleVisRating(!visRating);
                                      } else {
                                          Alert.alert('Not logged in', 'You must log in to access this feature');
                                      }}}>
              <Ionicons name={ "star" } size={30} color = {Colors.yellow} style={{justifyContent: 'center' , left: 65 ,  marginBottom: 28}}/>
            </TouchableNativeFeedback>
                <Text style={{justifyContent: 'center', top:8 , left:5 , color: Colors.white}}>{movDetails.vote_average?.toFixed(1)}</Text>
          </View>


        <Text style={{justifyContent: 'center' , left: 20 , color: Colors.white}}>Favorite This Movie</Text>
          <View style={{flexDirection: 'row'}}>
           <TouchableNativeFeedback onPress={()=>{if (sessId !== null) {
                                        addOrRemoveFromFav(sessId,movieId,true).then(Alert.alert('Favorites','This movie was added to Favorites'))
                                      } else {
                                          Alert.alert('Not logged in', 'You must log in to access this feature');
                                      }}}>
              <Ionicons name={ "heart" } size={30} color = { Colors.heart_red} style={{justifyContent: 'center' , left: 65 }}/>
           </TouchableNativeFeedback>
                <Text style={{justifyContent: 'center' , top:5, color: Colors.white}}>{movDetails.vote_count}</Text>
          </View>

      </View>
    </View>
        
      <View style= {Styles.overviewContainer}>
        <Text style = {Styles.overviewTitle}>Overview</Text>
        <Text style = {Styles.subtitleStyle}>{movDetails.overview}</Text>
      </View>
      
      <View style = {Styles.overviewContainer}>
        <Text style= {Styles.overviewTitle}>Where To Watch</Text>
        <Text style = {Styles.subtitleStyle}>{providerName}</Text>
        <Image
          style={Styles.logoContainer} 
          imageStyle={{ borderRadius: 10 }}
          source={{uri:getPoster(providerLogo)}}>
        </Image>
      </View>

      

    </ScrollView>
 );
};

export default Details;
