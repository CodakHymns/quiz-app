import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomBottomTabBar from '../components/CustomBottomTabBar';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis,
        urna non cursus aliquam, erat arcu lacinia nunc, eget gravida risus erat
        sed diam.
      </Text>
      <Text style={styles.description}>
        Phasellus consectetur eu sem ac feugiat. Proin blandit orci non felis
        pellentesque, in convallis nisi gravida. Nulla facilisi.
      </Text>
      <CustomBottomTabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default AboutScreen;
