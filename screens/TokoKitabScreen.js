import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Linking, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-paper';

export default function TokoKitabScreen() {
  const [tokoList, setTokoList] = useState([]);

  useEffect(() => {
    axios.get('https://get.ichwanul.com/api/api.php/records/toko_mitra?transform=1')
      .then(res => {
        console.log('Data Toko Kitab:', res.data.records);
        setTokoList(res.data.records);
      })
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  const openUrl = (url) => {
    if (url) Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toko Kitab Mitra</Text>
      <FlatList
        data={tokoList}
        keyExtractor={(item) => item.id_toko.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Image source={{ uri: item.logo_toko }} style={styles.logo} />
              <View style={styles.info}>
                <Text style={styles.namaToko}>{item.nama_toko}</Text>
                <Text style={styles.asalToko}>Asal: {item.asal_toko}</Text>
                <TouchableOpacity onPress={() => openUrl(item.link_toko)}>
                  <Text style={styles.link}>Kunjungi Toko</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  cardContent: { flexDirection: 'row', padding: 10 },
  logo: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
  info: { flex: 1, justifyContent: 'center' },
  namaToko: { fontSize: 16, fontWeight: 'bold' },
  asalToko: { fontSize: 14, color: '#666' },
  link: { marginTop: 6, color: '#007BFF', textDecorationLine: 'underline' },
});
