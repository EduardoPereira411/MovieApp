import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList , TouchableOpacity} from "react-native";
import { StatusBar } from "expo-status-bar";
import Colors from "../Constants/Colors";
import MovieCard from "../Components/MovieCard";
import ItemSeparator from "../Components/ItemSeparator";
import {
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../Services/MovieServices";
import Styles from "../Styles/Styles";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../Context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Home = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState({}); // the empty {} define the default as an empty object
  const [topRatedMovies, setTopRatedMovies] = useState({});
  const [upcomingMovies, setUpcomingMovies] = useState({});
  const {setSessId} = useContext(AuthContext);


  const navigation = useNavigation();
  useEffect(() => {

    AsyncStorage.getItem('savedSessId').then((sesId)=>{
        setSessId(sesId)
    });
    getNowPlayingMovies().then((movieResponse) =>
      setNowPlayingMovies(movieResponse.data)
    ),
      getUpcomingMovies().then((movieResponse) =>
        setUpcomingMovies(movieResponse.data)
      ),
      getTopRatedMovies().then((movieResponse) =>
        setTopRatedMovies(movieResponse.data)
      );
      navigation.setOptions({
        headerRight: () =>(
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Icon name="search" size={28} color={Colors.black} />
          </TouchableOpacity>)
      });
  }, [navigation]); // no dependencies on the useEffect, meaning this will only run once, to prevent infinite looping

  return (
    <ScrollView contentContainerStyle={Styles.homeContainer}>

      <StatusBar
        style="auto"
        translucent={false}
        backgroundColor={Colors.yellow}
      />
      <View style={Styles.homeBoxesContainer}>
        <Text style={Styles.homeItemsTitle}>Now Playing</Text>
      </View>
      <View>
        <FlatList
          data={nowPlayingMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCard
              title={item.original_title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              onPress={() =>
                navigation.navigate("DetailsScreen", { movieId: item.id })
              }
            />
          )}
        />
      </View>

      <View style={Styles.homeBoxesContainer}>
        <Text style={Styles.homeItemsTitle}>Top Rated</Text>
      </View>
      <View>
        <FlatList
          data={topRatedMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCard
              title={item.original_title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              onPress={() =>
                navigation.navigate("DetailsScreen", { movieId: item.id })
              }
            />
          )}
        />
      </View>

      <View style={Styles.homeBoxesContainer}>
        <Text style={Styles.homeItemsTitle}>Upcoming</Text>
      </View>
      <View>
        <FlatList
          data={upcomingMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCard
              title={item.original_title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              onPress={() =>
                navigation.navigate("DetailsScreen", { movieId: item.id })
              }
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Home;
