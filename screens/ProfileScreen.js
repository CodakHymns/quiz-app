import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import CustomBottomTabBar from '../components/CustomBottomTabBar';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://example.com/user-profile.jpg' }} 
        style={styles.profileImage} 
      />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>john.doe@example.com</Text>
      <Text style={styles.bio}>
        Software Developer with a passion for building amazing applications. Loves to explore new technologies and work on challenging projects.
      </Text>
      <Button 
        title="Edit Profile" 
        onPress={() => alert('Edit Profile pressed')} 
        color="#1E90FF"
      />
      <CustomBottomTabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});

export default ProfileScreen;
