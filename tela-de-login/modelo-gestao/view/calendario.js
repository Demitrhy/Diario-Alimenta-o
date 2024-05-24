import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import { Card } from 'react-native-paper';
import firebase from '../database/dbConfig';
import { estilos } from '../css/estilos';
import { ScrollView } from 'react-native';

const daysOfWeek = [
  { id: '1', name: 'Sunday' },
  { id: '2', name: 'Monday' },
  { id: '3', name: 'Tuesday' },
  { id: '4', name: 'Wednesday' },
  { id: '5', name: 'Thursday' },
  { id: '6', name: 'Friday' },
  { id: '7', name: 'Saturday' },
];

const meals = [
  'Café da Manhã',
  'Merenda de manhã',
  'Almoço',
  'Merenda de tarde',
  'Janta',
]; // Alteração aqui

export default function Calendario() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [mealDescriptions, setMealDescriptions] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleDayPress = (day) => {
    setSelectedDay(day);
    setModalVisible(true);
  };

  const handleSave = (meal) => {
    const description = mealDescriptions[`${selectedDay.name}-${meal}`] || '';
    if (description === '') {
      Alert.alert('Favor Digite a descrição para todas as refeições!');
    } else {
      setIsLoading(true);
      const key = `${selectedDay.name}-${meal}`;

      // Salvar no Firebase
      firebase
        .database()
        .ref(`meals/${key}`)
        .set(description)
        .then(() => {
          setIsLoading(false);
          console.log(
            `Description for ${meal} on ${selectedDay.name} saved successfully!`
          );
          setModalVisible(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error(
            `Error saving description for ${meal} on ${selectedDay.name}:`,
            error
          );
        });
    }
  };

  const handleChangeText = (meal, text) => {
    setMealDescriptions((prevState) => ({
      ...prevState,
      [`${selectedDay.name}-${meal}`]: text,
    }));
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Escolha o dia da semana:</Text>
        <View style={estilos.containerPreto}>
          <FlatList
            data={daysOfWeek}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleDayPress(item)}
                style={styles.cardWrapper}>
                <Card style={styles.card}>
                  <Card.Content>
                    <Text style={styles.dayText}>{item.name}</Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />

          {selectedDay && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>{selectedDay.name}</Text>
                {meals.map((meal) => (
                  <View key={meal} style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>{meal}</Text>
                    <TextInput
                      placeholder={`Digite sua refeição da ${meal}`}
                      value={
                        mealDescriptions[`${selectedDay.name}-${meal}`] || ''
                      }
                      onChangeText={(text) => handleChangeText(meal, text)}
                      style={styles.input}
                    />
                    <TouchableOpacity
                      style={styles.button}
                      disabled={isLoading}
                      onPress={() => handleSave(meal)}>
                      <Text style={estilos.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                  </View>
                ))}
                <Button title="Sair " onPress={() => setModalVisible(false)} />
              </View>
            </Modal>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
  },
  cardWrapper: {
    marginBottom: 10,
    borderWidth: 1, // Largura da borda
    borderColor: 'orange', // Cor da borda laranja
  },
  card: {
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 2,
  },
  dayText: {
    fontSize: 18,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 15,
  },
  mealContainer: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: 'white',
  },
  mealTitle: {
    fontSize: 18,
    backgroundColor: 'white',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    width: '100%',
  },
  button: {
    width: '50%',
    backgroundColor: 'orange', // Change this to your desired background color
    padding: 10,
    borderRadius: 50,
    marginLeft: 80,
    marginTop: 5,
    alignItems: 'center',
  },
});
