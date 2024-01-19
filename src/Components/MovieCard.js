import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Colors from "../Constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { getPoster } from "../Services/MovieServices";
import Styles from "../Styles/Styles";

const MovieCard = ({
  title,
  poster,
  language,
  voteAverage,
  voteCount,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
    <View style={{flexDirection: 'column'}}>
      <ImageBackground
        style={Styles.MovieCardContainer}
        imageStyle={{ borderRadius: 10 }}
        source={{ uri: getPoster(poster) }}
      >
        <View style={Styles.MovieCardContainer}>
          <View style={Styles.StarContainer}>
            <Ionicons name="star" size={24} color={Colors.yellow} />
            <Text style={Styles.cardHeaderTitle}>{voteAverage}</Text>
          </View>
        </View>
      </ImageBackground>
      <View>
        <Text style={Styles.movieCardTitle}>{title}</Text>
        <View style={Styles.movieCardSubtitleContainer}>
          <Text style={Styles.cardHeaderTitle}>{language}</Text>
          <View style={Styles.rowAndCenter}>
            <Ionicons name="heart" size={24} color={Colors.heart_red} />
            <Text style={Styles.cardHeaderTitle}>{voteCount}</Text>
          </View>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
};
export default MovieCard;
