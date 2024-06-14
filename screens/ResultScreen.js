import React from 'react';
import { View, Text, Button, StyleSheet, Share } from 'react-native';


const ResultScreen = ({ route, navigation }) => {
  const { score, total } = route.params;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I scored ${score} out of ${total} in the SenseMan quiz! Can you beat my score?`,
      });
    } catch (error) {
      console.error('Error sharing', error.message);
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quiz Result</Text>
      <Text style={styles.scoreText}>Your Score: {score} out of {total}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Retry" onPress={() => navigation.navigate('QuizSelection')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Share Scores" onPress={handleShare} />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
});

export default ResultScreen;
