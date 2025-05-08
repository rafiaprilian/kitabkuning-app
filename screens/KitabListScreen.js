import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';
import axios from 'axios';
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";

export default function KitabListScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [kitabList, setKitabList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Tambahkan state untuk error
  const stripHtmlTags = (html) => {
    if (!html) return "Deskripsi belum tersedia.";
    return html.replace(/<[^>]+>/g, "").trim();
  };

  useEffect(() => {
    axios
      .get('https://get.ichwanul.com/api/api.php/records/KitabKuningDigital?transform=1')
      .then(res => {
        if (res.data && res.data.records) {
          setKitabList(res.data.records);
        } else {
          setError('Data tidak ditemukan');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Terjadi kesalahan pada server atau API');
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("DetailKitab", {
          id: item?.id,
          kitab: item,
        })
      }
    >
      <Image source={{ uri: item.img_kitab }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>
        {item.nama_kitab_indo || "Judul tidak tersedia"}
      </Text>
      {/* <Text style={styles.cardDesc} numberOfLines={2}>
        {item.deskripsi_kitab || "Deskripsi belum tersedia."}
      </Text> */}
      <Text style={styles.cardDesc} numberOfLines={2} ellipsizeMode="tail">
        {stripHtmlTags(item.deskripsi_kitab)}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#008080" />
        <Text>Memuat data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Daftar Kitab</Text>
      <FlatList
        data={kitabList}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id_kitab?.toString() || index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingTop: 10,
  },
  listContainer: {
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
  },
  cardDesc: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
