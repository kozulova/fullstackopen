import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback , Text, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import {Link} from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    minHeight: 50,
    backgroundColor: "#24292e"
  },
 text: {
     paddingLeft: 10,
     color: "white"
 }
});

const AppBar = () => {
    
  return  <TouchableWithoutFeedback>
  <View style={styles.container}>
  <ScrollView horizontal>
    <Link to="/">
        <Text style={styles.text}>Repositories</Text> 
    </Link>
    <Link to="/signIn">
        <Text style={styles.text}>SignIn</Text>
    </Link>
    <Link to="/mass">
        <Text style={styles.text}>mass</Text>
    </Link>
    </ScrollView>
  </View>
  </TouchableWithoutFeedback>
};

export default AppBar;