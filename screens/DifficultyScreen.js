import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DifficultyScreen = ({ route, navigation }) => {
  const { category } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Difficulty for {category}</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Quiz', { category, difficulty: 'easy' })}>
        <Text style={styles.buttonText}>Easy</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Quiz', { category, difficulty: 'medium' })}>
        <Text style={styles.buttonText}>Medium</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Quiz', { category, difficulty: 'hard' })}>
        <Text style={styles.buttonText}>Hard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default DifficultyScreen;
