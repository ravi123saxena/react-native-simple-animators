import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import styles from './styles';


const TabBar = ({ tabs, activeTab, handlePress }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        return (
          <TouchableOpacity key={tab} onPress={() => handlePress(tab)} style={styles.tabContainer}>
            <Text style={[styles.text, activeTab === tab && styles.activeText]}>{tab}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};


export default TabBar;
