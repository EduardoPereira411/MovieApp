import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getPoster } from "../Services/MovieServices";
import Styles from "../Styles/Styles";
import Colors from "../Constants/Colors";
import ItemSeparator from "./ItemSeparator";

const { height, width } = Dimensions.get("window");

const setHeight = (h) => (height / 100) * h;

const MovieMiniature = ({
    title,
    poster,
    release_date,
    voteAverage,
    onPress,
  }) => {
    return (
       <TouchableOpacity onPress={onPress}>
        <View style={{flexDirection: 'row' ,backgroundColor: Colors.light_black}}>
          <Image style={Styles.searchImageContainer}
          imageStyle={{ borderRadius: 10 }}
          source={{ uri: getPoster(poster) }}
          >
          </Image>
            <View style={{flexDirection: 'column'}}>
              <Text style= {Styles.MiniatureTextStyle}  numberOfLines={3}>{title}</Text>
              <ItemSeparator height={ setHeight(8)}/>
              <Text style= {Styles.MiniatureTextStyle}>{release_date}</Text>
              <ItemSeparator height={ setHeight(8)}/>
                <View style={{flexDirection: 'row' , paddingHorizontal: 10} }>
                  <Ionicons name="star" size={24} color={Colors.yellow} />
                  <Text style= {Styles.MiniatureTextStyle}>{voteAverage.toFixed(2)}</Text>
                </View>
            </View>
        </View>
       </TouchableOpacity>
      );
    };

    export default MovieMiniature;