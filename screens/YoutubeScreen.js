import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

export default function YoutubeScreen({ navigation }) {
  const [youtubeList, setYoutubeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mengambil data dari API
    axios
      .get('https://get.ichwanul.com/api/api.php/records/ChannelYoutube?transform=1', {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          Accept: 'application/json',
        },
      })
      .then((res) => {
        // Jika berhasil, set data dari API
        setYoutubeList(res.data.records);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => Linking.openURL(item.link_toko)} // Navigasi ke link YouTube playlist
    >
      <Image source={{ uri: item.logo_toko }} style={styles.image} />
      <Text style={styles.cardTitle}>{item.nama_toko}</Text>
      <Text style={styles.cardSubTitle}>{item.asal_toko}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#00796b" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📺 Channel Youtube</Text>
      <FlatList
        data={youtubeList} // Menampilkan semua data dari API
        renderItem={renderItem}
        keyExtractor={(item) => item.id_toko.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#00796b',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
    marginTop: 10,
  },
  cardSubTitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  listContainer: {
    padding: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
