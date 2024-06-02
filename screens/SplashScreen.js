import React from 'react';
import { View, Text,Image, TouchableOpacity, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const handleStartHome = () => {
    navigation.navigate('Login');
  };

  return (
    <TouchableOpacity
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}
      onPress={handleStartHome}
    >
      {/* Your content */}
      <Image source={require('../assets/splashicon.png')} />
    </TouchableOpacity>
  );
};


export default SplashScreen;