import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icons
import CustomText from '../CustomText'; // Import CustomText component
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebaseConfig'; // Import Firebase config

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const navigation = useNavigation(); // Initialize navigation

  const handleEmailChange = (text) => setEmail(text);
  const handlePasswordChange = (text) => setPassword(text);
  const handleConfirmPasswordChange = (text) => setConfirmPassword(text);

  const navigateToLogin = () => {
    navigation.navigate('Login'); // Navigate to LoginScreen
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

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <CustomText style={styles.loginText}>Create Account</CustomText>
        <View style={styles.titleContainer}>
          <CustomText style={styles.titleLine1}>Create your account and explore unlimited</CustomText>
          <CustomText style={styles.titleLine2}>questions with SenseMan</CustomText>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            secureTextEntry
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.signInButton} onPress={handleSignUp}>
            <CustomText style={styles.signInText}>Sign Up</CustomText>
          </TouchableOpacity>
        </View>
        {!keyboardVisible && (
          <>
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <CustomText style={styles.dividerText}>Already have an Account?</CustomText>
              <TouchableOpacity onPress={navigateToLogin}>
                <CustomText style={styles.loginLink}>Login</CustomText>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loginText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 30,
    color: "#1338BC",
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleLine1: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  titleLine2: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  inputContainer: {
    width: '90%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(153, 204, 255, 0.2)',
    fontFamily: 'Poppins-Regular',
    marginBottom: 15,
  },
  signInButton: {
    padding: 20,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#1338BC',
    alignItems: 'center',
    marginBottom: 20,
  },
  signInText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  dividerLine: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
  loginLink: {
    textDecorationLine: 'underline',
    color: '#1338BC',
    fontFamily: 'Poppins-Bold',
  },
  orText: {
    marginTop: 60,
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#1338BC',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  socialButton: {
    marginHorizontal: 10,
  },
});

export default SignUpScreen;
