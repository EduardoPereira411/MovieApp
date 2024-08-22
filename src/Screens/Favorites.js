import React, { useContext, useEffect, useState } from 'react';
import { Text ,View} from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFavs, getNowPlayingMovies } from '../Services/MovieServices';
import { FlatList } from 'react-native-gesture-handler';
import MovieMiniature from '../Components/MovieMiniature';
import ItemSeparator from '../Components/ItemSeparator';
import Styles from '../Styles/Styles';

const Favorites=({navigation})=>{
    const {sessId}= useContext(AuthContext);
    const [favoritedMovies, setFavoritedMovies] =useState({});

    useEffect(()=>
    {
        getFavs(sessId).then((favResponse) =>
      setFavoritedMovies(favResponse.data)
    );
    });

    return(
        <View style={Styles.homeContainer}>
        
            <View>
                <FlatList
                data={favoritedMovies.results}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <ItemSeparator height={20} />}
                ListHeaderComponent={() => <ItemSeparator height={20} />}
                ListFooterComponent={() => <ItemSeparator height={20} />}
                renderItem={({ item }) => (
                    <MovieMiniature
                    title={item.original_title}
                    release_date={item.release_date}
                    voteAverage={item.vote_average}
                    poster={item.poster_path}
                    onPress={() =>
                        navigation.navigate("DetailsScreen", { movieId: item.id })
                    }
                    />
                )}
                />
          </View>
            
        </View>
        );
}

export default Favorites;