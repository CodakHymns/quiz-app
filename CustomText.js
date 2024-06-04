// CustomText.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.defaultFont, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: 'Poppins-Regular',
  },
});

export default CustomText;
