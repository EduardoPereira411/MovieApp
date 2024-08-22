import React, { useContext, useEffect, useState } from 'react';
import { Text ,View} from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { getRatedList } from '../Services/MovieServices';
import { FlatList } from 'react-native-gesture-handler';
import MovieMiniature from '../Components/MovieMiniature';
import ItemSeparator from '../Components/ItemSeparator';
import Styles from '../Styles/Styles';


const Rating=({navigation})=>{
    const {sessId}= useContext(AuthContext);
    const [ratedMovies, setRatedMovies] =useState({});

    useEffect(()=>
    {
        getRatedList(sessId).then((ratedResponse) =>
      setRatedMovies(ratedResponse.data)
    );
    });

    

    return(
        <View style={Styles.homeContainer}>
        
            <View>
                <FlatList
                data={ratedMovies.results}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <ItemSeparator height={20} />}
                ListHeaderComponent={() => <ItemSeparator height={20} />}
                ListFooterComponent={() => <ItemSeparator height={20} />}
                renderItem={({ item }) => (
                    <MovieMiniature
                    title={item.original_title}
                    release_date={item.release_date}
                    voteAverage={item.rating}
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

export default Rating;