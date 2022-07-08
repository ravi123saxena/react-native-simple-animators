import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import styles from './styles';

const Button = ({ handlePress, text, textStyle, style }) => {
  return (
    <TouchableOpacity onPress={handlePress} style={[styles.button, style]}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};


export default Button;
