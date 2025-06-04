import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../styles/styles';

const AddEditScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const person = route.params?.person;

  const [firstname, setFirstname] = useState(person ? person.firstname : '');
  const [lastname, setLastname] = useState(person ? person.lastname : '');
  const [email, setEmail] = useState(person ? person.email : '');

  const handleSubmit = async () => {
    const url = person
      ? `http://localhost:3000/people/${person.id}`
      : 'http://localhost:3000/people';

    const method = person ? 'PUT' : 'POST';

    const newPerson = {
      firstname,
      lastname,
      email,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    };

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPerson),
      });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{person ? 'Editar Pessoa' : 'Adicionar Pessoa'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={firstname}
        onChangeText={setFirstname}
      />
      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        value={lastname}
        onChangeText={setLastname}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>{person ? 'Atualizar' : 'Adicionar'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddEditScreen;