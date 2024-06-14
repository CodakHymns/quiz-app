import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomBottomTabBar from '../components/CustomBottomTabBar'
import { SafeAreaView } from 'react-native';
import { auth } from '../firebaseConfig';

const screenWidth = Dimensions.get('window').width;
const numColumns = 2;
const itemWidth = (screenWidth - 40) / numColumns; // Adjust the padding accordingly

const iconsMap = {
  'General Knowledge': 'book-open-variant',
  'Entertainment: Books': 'book',
  'Entertainment: Film': 'movie',
  'Entertainment: Music': 'music',
  'Entertainment: Musicals & Theatres': 'theater',
  'Entertainment: Television': 'television',
  'Entertainment: Video Games': 'gamepad-variant',
  'Entertainment: Board Games': 'dice-multiple',
  'Science & Nature': 'flask',
  'Science: Computers': 'laptop',
  'Science: Mathematics': 'calculator',
  'Mythology': 'account-question',
  'Sports': 'soccer',
  'Geography': 'earth',
  'History': 'history',
  'Politics': 'gavel',
  'Art': 'palette',
  'Celebrities': 'star',
  'Animals': 'dog',
  'Vehicles': 'car',
  'Entertainment: Comics': 'emoticon-devil',
  'Science: Gadgets': 'cellphone',
  'Entertainment: Japanese Anime & Manga': 'emoticon-happy',
  'Entertainment: Cartoon & Animations': 'emoticon-poop',
};

const QuizSelectionScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api_category.php');
        setCategories(response.data.trivia_categories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const renderCategory = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryButton} 
      onPress={() => navigation.navigate('Difficulty', { category: item.name, categoryId: item.id })}>
      <Icon name={iconsMap[item.name] || 'help'} size={40} color="#1338BC" />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );
  const [userEmail, setUserEmail] = useState('');
 

  useEffect(() => {
    // Fetch user's email and set initial letter
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUserEmail(currentUser.email);
      }
    };

    fetchUserData();
  }, []);

  return (
    
    <SafeAreaView style={styles.container}>
      <Text style={styles.subHeader}>Hi, {userEmail}</Text>
      <Text style={styles.header}>Let’s make the day productive</Text>
      <Text style={styles.instruction}>Choose your topic of interest. Are you ready??</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.listContainer}
      />
    <CustomBottomTabBar />
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:'10%',
    padding: 14,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color:'blue',
    fontWeight:'bold',
  },
  instruction: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    color:'blue',
  },
  listContainer: {
    alignItems: 'center',
    paddingBottom: '20%',
  },
  categoryButton: {
    marginHorizontal:'1%',
    backgroundColor: '#E7ECFF',
    padding: 20,
    margin: 10,
    borderRadius: 8,
    width: itemWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:2,
    borderColor:'#1338BC',
  },
  categoryText: {
    color: '#1338BC',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default QuizSelectionScreen;
