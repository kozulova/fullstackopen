import React from 'react'
import { Text, View, Image , StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    topContainer: {
        maxWidth: 400,
        padding: 20,
        backgroundColor: "#fff"
    },
    container: {
      display: "flex",
      flexDirection: "row",
    },
    tinyLogo: {
      width: 50,
      height: 50,
      borderRadius: 5
    }
  });

const RepositoryItem = ({repository}) => {
    console.log(repository)
    return (
        <View style={styles.topContainer}>   
            <View style={styles.container}>
            <Image source={{uri: repository.ownerAvatarUrl}} style={styles.tinyLogo}/>
            <View style={{paddingLeft: 20}}>
            <Text>{repository.fullName}</Text>
            <Text style={{color: "grey", width: 200}}>{repository.description}</Text>
            <Text style={{height: 20, maxWidth: 100, borderRadius: 5,
             backgroundColor: "#0366d6", color: "#fff",
             textAlign: "center"
             }}>{repository.language}</Text>
            </View>
            </View>
            <View style={{display: "flex", flexDirection: "row",  justifyContent: "space-between"}}>
            <View>
            <Text>{repository.stargazersCount}</Text>            
            <Text style={{color: "grey"}}>Stars:</Text>
            </View>
            <View>
            <Text>{repository.forksCount}</Text>            
            <Text style={{color: "grey"}}>Forks:</Text>
            </View>
            <View>
            <Text style={{textAlign: "center"}}>{repository.reviewCount}</Text>            
            <Text style={{color: "grey"}}>Reviews:</Text>
            </View>
            <View>
            <Text style={{textAlign: "center"}}>{repository.ratingAverage}</Text>            
            <Text style={{color: "grey"}}>Rating:</Text>
            </View>
            </View>
        </View>
    )
}

export default RepositoryItem
