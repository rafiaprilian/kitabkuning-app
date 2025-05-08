import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Linking
} from 'react-native';
import axios from 'axios';

export default function PromoScreen() {
  const [promoList, setPromoList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://get.ichwanul.com/api/api.php/records/PromotionSlide?transform=1', {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          Accept: 'application/json'
        }
      })
      .then(res => {
        setPromoList(res.data.records);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const renderPromo = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => item.link && Linking.openURL(item.link)}
    >
      {item.image && (
        <Image
          source={{ uri: item.image }}
          style={styles.promoImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDesc} numberOfLines={3}>
          {item.description || 'Deskripsi belum tersedia.'}
        </Text>
      </View>
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
      <Text style={styles.title}>🔥 Promo Kitab Kuning</Text>
      <FlatList
        data={promoList}
        renderItem={renderPromo}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f2f2',
    paddingTop: 10,
  },
  listContainer: {
    padding: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#004d40',
  },
  card: {
    backgroundColor: '#ffffff',
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  promoImage: {
    width: '100%',
    height: 180,
  },
  textContainer: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 5,
  },
  cardDesc: {
    fontSize: 14,
    color: '#555',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
