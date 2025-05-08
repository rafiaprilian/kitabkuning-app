import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const KitabCard = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default KitabCard;
