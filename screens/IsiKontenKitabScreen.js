import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-paper';

export default function IsiKontenKitabScreen() {
  const [kontenList, setKontenList] = useState([]);

  useEffect(() => {
    axios.get('https://get.ichwanul.com/api/api.php/records/shalawat_jalanselamat?transform=1')
      .then(res => {
        console.log('Data Konten Kitab:', res.data.records); // Tambahkan log untuk memastikan data berhasil
        setKontenList(res.data.records);
      })
      .catch(err => console.error('Error fetching data:', err)); // Log error jika terjadi kesalahan
  }, []);
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Isi Kitab: Jalan Keselamatan</Text>
      <FlatList
        data={kontenList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={`Bab ${item.bab}`} />
            <Card.Content>
              <Text style={styles.ayat}>{item.ayat}</Text>
              <Text style={styles.arti}>{item.arti}</Text>
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
  ayat: { fontSize: 16, marginBottom: 6 },
  arti: { fontSize: 14, color: '#555' },
});
