import React from 'react';
import { View, Text,Image,TouchableOpacity,Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';


const SplashScreen = ({ navigation }) => {
  const handleStartLogin = () => {
    navigation.navigate('Login');
  };
  const handleStartSignup = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}
    >
      {/* Your content */}
      <Image source={require('../assets/splashicon.png')} style={{width:320, height: 300, marginBottom:29, marginTop:62}}/>
      <Text style={{fontSize:32, color:'#1338BC', textAlign:'center', fontWeight:500, marginTop:0}}>Quiz Yourself With SenseMan</Text>
      <Text style={{marginVertical:30, marginHorizontal:60, textAlign:'center'}}>Answer quizzes on available topics to boost your mind and intelligence quotient</Text>
      
      <View style={{display:'flex', flexDirection:'row', gap:25, marginTop:93, marginBottom:102}}>
      <TouchableOpacity onPress={handleStartLogin}>
      <Text style={{backgroundColor:'#1338bc', paddingHorizontal:30, paddingVertical:10, color:'white', borderRadius:36,fontSize:20, fontWeight:500, width:'100%'}}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleStartSignup}>
      <Text style={{backgroundColor:'#f8f7f7', paddingHorizontal:30, paddingVertical:10, color:'black', borderRadius:36,fontSize:20, fontWeight:500,width:'100%'}}>SingUp</Text>
      </TouchableOpacity>
      </View>
      

    </SafeAreaView>
  );
};


export default SplashScreen;