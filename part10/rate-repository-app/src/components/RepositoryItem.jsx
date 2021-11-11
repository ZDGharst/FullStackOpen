import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import Text from './Text';
const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
  },
  profileImage: {
    borderRadius: 5,
    height: 30,
    marginHorizontal: 10,
    marginVertical: 5,
    width: 30,
  },
  fullName: {
    fontWeight: 'bold',
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    borderRadius: 3,
    color: 'white',
    fontSize: 12,
    marginVertical: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  flexItems: {
    flexDirection: 'row',
    padding: 5,
  },
  flexItem: {
    flexGrow: 1,
    textAlign: 'center',
  },
  itemValue: {
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

const FlexItem = ({ name, value }) => {
  const round = (number, places) => {
    return +(Math.round(number + "e+" + places) + "e-" + places);
  };

  if(value  > 1000) {
    value = round(value / 1000, 1) + 'k';
  }

  return (
    <View style={style.flexItem}>
      <Text style={style.itemValue}>{value}</Text>
      <Text style={{ textAlign: 'center' }}>{name}</Text>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={style.container}>
      <View style={style.top}>
        <View>
          <Image style={style.profileImage} source={{ uri: item.ownerAvatarUrl}} />
        </View>
        <View>
          <Text style={style.fullName}>{item.fullName}</Text>
          <Text>{item.description}</Text>
          <Text style={style.language}>{item.language}</Text>
        </View>
      </View>
      <View style={style.flexItems}>
        <FlexItem name='Stars' value={item.stargazersCount} />
        <FlexItem name='Forks' value={item.forksCount} />
        <FlexItem name='Reviews' value={item.reviewCount} />
        <FlexItem name='Rating' value={item.ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;