import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomBottomTabBar from '../components/CustomBottomTabBar';
import { auth } from '../firebaseConfig'; // Import Firebase auth instance
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const ButtonWithIcon = ({ iconName, text }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Icon name={iconName} size={24} color="blue" style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const ProfileScreen = () => {
  const [userEmail, setUserEmail] = useState('');
  const [initialLetter, setInitialLetter] = useState('');
  const navigation = useNavigation(); // Initialize navigation

  useEffect(() => {
    // Fetch user's email and set initial letter
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUserEmail(currentUser.email);
        setInitialLetter(currentUser.email.charAt(0).toUpperCase());
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.navigate('Login');
    }).catch((error) => {
      console.error('Error logging out:', error);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <View style={styles.avatarContainer}>
          <Text style={styles.initialLetter}>{initialLetter}</Text>
          <Text style={styles.email}>{userEmail}</Text>
        </View>
        <Image
          source={{ uri: 'https://example.com/user-profile.jpg' }}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonWithIcon iconName="share-outline" text="Share App" />
        <View style={styles.separator} />
        <ButtonWithIcon iconName="star-outline" text="Rate Us" />
        <View style={styles.separator} />
        <ButtonWithIcon iconName="file-document-outline" text="Terms of Service" />
        <View style={styles.separator} />
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Icon name="logout" size={24} color="blue" style={styles.icon} />
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
      </View>
      <CustomBottomTabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    justifyContent:"left",
    alignItems:"center",
   
    
  },
  profileInfo: {
    paddingHorizontal: '3%',
    paddingTop:'20%',
    alignItems: 'left',
    marginBottom: 20,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -90,
  },
  initialLetter: {
    backgroundColor: '#1338BC', // Example background color
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
    width: 100,
    height: 100,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 50,
    marginRight: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: '#1338BC',
  },
  // bio: {
  //   fontSize: 16,
  //   textAlign: 'center',
  //   marginBottom: 20,
  //   paddingHorizontal: 20,
  // },
  container: {
    flex: 1,
    justifyContent: '',
    alignItems: 'left',
    width:'100%',
    
  },
  buttonContainer: {
    width: '90%',
    marginHorizontal:'auto',
    borderBottom: 1,
    borderColor: 'black',
    borderRadius: 5,
    overflow: 'hidden', 
    paddingBottom:'1%',// to hide the border of the last button
    
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    // borderTopWidth: 1,
    borderTopColor: 'black',
    marginBottom:10,
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: 'black',
    fontSize:17,
    
  },
});

export default ProfileScreen;
