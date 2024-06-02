// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import QuizScreen from './screens/QuizScreen';
import ResultScreen from './screens/ResultScreen';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import QuizSelectionScreen from './screens/QuizSelectionScreen';
import DifficultyScreen from './screens/DifficultyScreen';
import QuizScreenLayer from './screens/QuizLayerScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        
        <Stack.Screen name="QuizSelection" component={QuizSelectionScreen} />
        <Stack.Screen name="Difficulty" component={DifficultyScreen} />
        {/* <Stack.Screen name="Quiz" component={QuizScreen} /> */}
        <Stack.Screen name="Quiz" component={QuizScreenLayer} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
