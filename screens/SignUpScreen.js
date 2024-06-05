import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icons
import CustomText from '../CustomText'; // Import CustomText component
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <CustomText style={styles.loginText}>Create Account</CustomText>
        <View style={styles.titleContainer}>
          <CustomText style={styles.titleLine1}>Create your account and explore unlimited</CustomText>
          <CustomText style={styles.titleLine2}>questions with SenseMan</CustomText>
        </View>
        {/* Email Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.emailInput}
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
          />
          {/* Password Input and Confirm Password */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry={true} // Hide password characters
            />
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              secureTextEntry={true} // Hide password characters
            />
          </View>
          <TouchableOpacity style={styles.signInButton}>
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
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  titleLine1: {
    fontSize: 15,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  titleLine2: {
    fontSize: 15,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
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
  loginLink: {
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

export default SignUpScreen;
