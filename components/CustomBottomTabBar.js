import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomBottomTabBar = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigateToScreen('QuizSelection')}
      >
        <Icon name="home" size={50} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigateToScreen('About')}
      >
        <Icon name="information" size={50} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigateToScreen('Profile')}
      >
        <Icon name="account" size={50} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 0,
        borderTopColor: '#ccc',
        backgroundColor: '#1338BC',
        paddingBottom: '2%',
        paddingTop: '2%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default CustomBottomTabBar;
