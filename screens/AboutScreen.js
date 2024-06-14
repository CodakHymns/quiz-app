import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomBottomTabBar from '../components/CustomBottomTabBar';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Senseman Quiz App</Text>
      <Text style={styles.description}>
        Senseman Quiz App is designed to bring enjoyable and educational quiz experiences
        to users of all ages. Whether you're a trivia enthusiast or simply looking to
        challenge yourself with new knowledge, Senseman Quiz App offers a wide range
        of categories and difficulty levels to suit every player.
      </Text>
      <Text style={styles.description}>
        Our mission is to make learning fun and accessible through interactive quizzes
        that cover various topics such as General Knowledge, Science, History, and more.
        Each quiz session is crafted to provide engaging content that stimulates curiosity
        and encourages continuous learning.
      </Text>
      <Text style={styles.description}>
        Download Senseman Quiz App today and embark on a journey of discovery,
        knowledge, and entertainment!
      </Text>
      <CustomBottomTabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:"#1338BC",
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 22,
  },
});

export default AboutScreen;
