import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomBottomTabBar from '../components/CustomBottomTabBar';
import { auth } from '../firebaseConfig'; // Import Firebase auth instance

const ProfileScreen = () => {
  const [userEmail, setUserEmail] = useState('');
  const [initialLetter, setInitialLetter] = useState('');

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
        <Text style={styles.bio}>
        As a passionate user of QuizMan, I enjoy exploring diverse topics and challenging myself with quizzes. I believe continuous learning is key to personal growth, and QuizMan provides me with a fun and engaging platform to expand my knowledge in various fields.
        </Text>
      </View>
      <CustomBottomTabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    justifyContent:"center",
    alignItems:"center",
    padding: 20,
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
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
  bio: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});

export default ProfileScreen;
