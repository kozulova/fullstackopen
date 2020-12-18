import React , {useEffect, useState} from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;



const RepositoryList = () => {
  const { repositories } = useRepositories();
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

    const renderItem = ({item}) => {        
        return <RepositoryItem repository={item}/>   
       
    }

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryList;