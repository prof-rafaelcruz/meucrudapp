import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/styles';

const HomeScreen = () => {
  const [people, setPeople] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await fetch('http://localhost:3000/people');
      const data = await response.json();
      setPeople(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePerson = async (id) => {
    try {
      await fetch(`http://localhost:3000/people/${id}`, {
        method: 'DELETE',
      });
      fetchPeople();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={people}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.firstname} {item.lastname}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Edit', { person: item })}>
              <Icon name="edit" size={20} color="blue" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deletePerson(item.id)}>
              <Icon name="trash" size={20} color="red" style={styles.icon} />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addIcon} onPress={() => navigation.navigate('Add')}>
        <Icon name="plus-circle" size={50} color="#007bff" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;