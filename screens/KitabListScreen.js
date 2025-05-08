import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';

export default function KitabListScreen({ navigation }) {
  const [kitabList, setKitabList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mengambil data dari API
    axios
      .get('https://get.ichwanul.com/api/api.php/records/KitabKuningDigital?transform=1', {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          Accept: 'application/json'
        }
      })
      .then(res => {
        setKitabList(res.data.records);  // Menyimpan data ke state kitabList
        setLoading(false);  // Mengubah status loading menjadi false setelah data berhasil diterima
      })
      .catch(err => {
        console.error(err);  // Menangani error jika terjadi
        setLoading(false);  // Mengubah status loading menjadi false meskipun terjadi error
      });
  }, []);  // Efek hanya dijalankan sekali saat komponen pertama kali dimuat

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetailKitab', { id: item.id, kitab: item })}  // Aksi saat item ditekan
    >
      <Text style={styles.cardTitle}>{item.judul}</Text>
      <Text style={styles.cardDesc} numberOfLines={2}>
        {item.deskripsi || 'Deskripsi belum tersedia.'}  // Menampilkan deskripsi kitab jika ada, jika tidak menampilkan pesan default
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#008080" />  // Menampilkan indikator loading saat data sedang diambil
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Daftar Kitab</Text>
      <FlatList
        data={kitabList}  // Menggunakan data yang telah diambil untuk ditampilkan di FlatList
        renderItem={renderItem}  // Menampilkan item dalam bentuk card
        keyExtractor={item => item.id.toString()}  // Menggunakan id item sebagai key untuk setiap item
        contentContainerStyle={styles.listContainer}  // Menambahkan padding pada container list
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',  // Warna latar belakang
    paddingTop: 10,  // Memberikan padding di bagian atas
  },
  listContainer: {
    padding: 10,  // Padding pada list
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',  // Menyelaraskan teks ke tengah
    marginVertical: 10,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,  // Membuat sudut card melengkung
    elevation: 3,  // Memberikan efek bayangan
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',  // Warna teks judul
  },
  cardDesc: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,  // Memberikan margin atas pada deskripsi
  },
  centered: {
    flex: 1,
    justifyContent: 'center',  // Menyelaraskan konten secara vertikal
    alignItems: 'center',  // Menyelaraskan konten secara horizontal
  }
});
