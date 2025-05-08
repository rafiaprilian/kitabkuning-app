// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

export default function HomeScreen() {
  const [kitabList, setKitabList] = useState([]);

  // Mengambil data dari API
  useEffect(() => {
    axios.get('https://get.ichwanul.com/api/api.php/records/KitabKuningDigital?transform=1')
      .then(res => {
        setKitabList(res.data.records); // Simpan data kitab ke state
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Daftar Kitab</Text>
      {kitabList.map((kitab, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemText}>{kitab.judul}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

// Styling komponen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 18,
  },
});
