import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

export default function PromoScreen({ navigation }) {
  const [promoData, setPromoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://get.ichwanul.com/api/api.php/records/PromotionSlide?transform=1')
      .then((response) => {
        setPromoData(response.data.records); // Set the promo data from the API
      })
      .catch((err) => {
        setError('Failed to fetch promo data');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Button title="Back to Daftar Kitab" onPress={() => navigation.goBack()} />
      {promoData.map((promo) => (
        promo.status === 1 && ( // Hanya tampilkan promo dengan status 1
          <View key={promo.id_img} style={styles.promoCard}>
            <Image source={{ uri: promo.src_img }} style={styles.promoImage} />
            <Text style={styles.promoText}>{promo.text_img}</Text>
            <Button
              title="Learn More"
              onPress={() => navigation.navigate('WebView', { url: promo.url })} // Jika ada halaman WebView
            />
          </View>
        )
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  promoCard: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  promoImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  promoText: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
