import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icons
import CustomText from '../CustomText'; // Import CustomText component
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebaseConfig'; // Import Firebase config

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const navigation = useNavigation(); // Initialize navigation

  const handleEmailChange = (text) => setEmail(text);
  const handlePasswordChange = (text) => setPassword(text);

  const navigateToSignUp = () => {
    navigation.navigate('SignUp'); // Navigate to SignUpScreen
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSignIn = async () => {
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Logged in successfully');
      // Navigate to the main screen or wherever you want after login
      navigation.navigate('QuizSelection');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <CustomText style={styles.loginText}>Login Here</CustomText>
        <CustomText style={styles.welcomeText}>Hello, we are happy having you back!!!</CustomText>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.emailInput}
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry={true} // Hide password characters
              autoCapitalize="none"
            />
            <CustomText style={styles.forgotPassword}>Forgot Your password?</CustomText>
          </View>
          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <CustomText style={styles.signInText}>Sign In</CustomText>
          </TouchableOpacity>
        </View>
        {!keyboardVisible && (
          <>
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <CustomText style={styles.dividerText}>Don't have an account?</CustomText>
              <TouchableOpacity onPress={navigateToSignUp}>
                <CustomText style={styles.createLink}>Create</CustomText>
              </TouchableOpacity>
              <View style={styles.dividerLine} />
            </View>
            <CustomText style={styles.orText}>Or Continue With</CustomText>
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <Icon name="google" size={45} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Icon name="facebook" size={45} color="#4267B2" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make container fill the screen
    justifyContent: 'center', // Center elements vertically
    alignItems: 'center', // Center elements horizontally
    backgroundColor: '#fff',
  },
  loginText: {
    fontFamily: 'Poppins-SemiBold', // Use Poppins font with bold weight
    fontSize: 30,
    color: "#1338BC",
    marginBottom: 1,
  },
  welcomeText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginBottom: 1,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  emailInput: {
    marginTop: 20,
    padding: 15,
    width: '90%',
    borderRadius: 10,
    backgroundColor: 'rgba(153, 204, 255, 0.2)', // Sky blue with low opacity
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
  passwordContainer: {
    width: '90%',
    marginTop: 10,
    marginBottom: 10, // Add margin at the bottom to create space
  },
  passwordInput: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(153, 204, 255, 0.2)', // Sky blue with low opacity
    fontFamily: 'Poppins-Regular',
    marginBottom: 5, // Add margin at the bottom to create space for the forgot password text
    marginBottom: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#1338BC',
  },
  signInButton: {
    marginTop: 10,
    padding: 20,
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#1338BC', // Blue color
    alignItems: 'center',
    marginBottom: 20,
  },
  signInText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    fontWeight: '800',
  },
  divider: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    marginHorizontal: 20, // Add margin on left and right sides
  },
  dividerLine: {
    flex: 1, // Grow to fill available space
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10, // Add spacing between text and line
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
  createLink: {
    textDecorationLine: 'underline', // Underline the text
    color: '#1338BC',
    fontFamily: 'Poppins-Bold',
    marginRight: 10,
  },
  orText: {
    marginTop: 60,
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#1338BC',
  },
  socialButtons: {
    flexDirection: 'row', // Arrange buttons in a row
    justifyContent: 'center', // Center buttons horizontally
    marginTop: 10,
  },
  socialButton: {
    marginHorizontal: 10, // Add some space between buttons
  },
});

export default LoginScreen;
