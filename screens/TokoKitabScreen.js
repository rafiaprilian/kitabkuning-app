import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Linking } from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-paper';

export default function TokoKitabScreen() {
  const [tokoList, setTokoList] = useState([]);

  useEffect(() => {
    axios.get('https://get.ichwanul.com/api/api.php/records/toko_mitra?transform=1')
      .then(res => {
        console.log('Data Toko Kitab:', res.data.records); // Tambahkan log untuk memastikan data berhasil
        setTokoList(res.data.records);
      })
      .catch(err => console.error('Error fetching data:', err)); // Log error jika terjadi kesalahan
  }, []);
  

  const openUrl = (url) => {
    if (url) Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toko Kitab Mitra</Text>
      <FlatList
        data={tokoList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => openUrl(item.link)}>
            <Card.Title title={item.nama_toko} subtitle={item.alamat} />
            <Card.Content>
              <Text>No. WA: {item.no_wa}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: { marginBottom: 12, elevation: 3, borderRadius: 10 },
});
