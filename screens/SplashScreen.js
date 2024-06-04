import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import CustomText from '../CustomText'; // Import CustomText component

const SplashScreen = ({ navigation }) => {
  const handleStartLogin = () => {
    navigation.navigate('Login');
  };
  const handleStartSignup = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/splashicon.png')} style={styles.image} />
      <View style={styles.titleContainer}>
        <CustomText style={styles.titleLine1}>Quiz Yourself</CustomText>
        <CustomText style={styles.titleLine2}>With SenseMan</CustomText>
      </View>
      <CustomText style={styles.description}>
        Answer quizzes on available topics to boost your mind and intelligence quotient
      </CustomText>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleStartLogin}>
          <CustomText style={styles.loginButton}>Login</CustomText>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleStartSignup}>
          <CustomText style={styles.signupButton}>Sign Up</CustomText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 29,
    marginTop: 92,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  titleLine1: {
    fontSize: 32,
    color: '#1338BC',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  titleLine2: {
    fontSize: 32,
    color: '#1338BC',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },

  description: {
    fontSize: 17,
    marginVertical: 30,
    marginHorizontal: 60,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 25,
    marginTop: 50,
    marginBottom: 102,
  },
  loginButton: {
    backgroundColor: '#1338bc',
    paddingHorizontal: 60,
    paddingVertical: 10,
    color: 'white',
    borderRadius: 36,
    fontSize: 20,
    fontWeight: '500',
    width: '100%',
  },
  signupButton: {
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 60,
    paddingVertical: 10,
    color: 'black',
    borderRadius: 36,
    fontSize: 20,
    fontWeight: '500',
    width: '100%',
  },
});

export default SplashScreen;
