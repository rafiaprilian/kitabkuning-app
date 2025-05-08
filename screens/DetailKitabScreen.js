import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, ScrollView, Image } from 'react-native';
import axios from 'axios';
import ImageSlider from 'react-native-image-slider'; // Pastikan untuk menginstal react-native-image-slider

export default function DetailKitabScreen({ route, navigation }) {
  const { id, kitab } = route.params; // Dapatkan id dan kitab dari params
  const [kitabDetail, setKitabDetail] = useState(kitab || null); // Gunakan data dari params jika tersedia
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id && !kitabDetail) { // Jika tidak ada data kitab yang sudah diambil
      axios
        .get(`https://get.ichwanul.com/api/api.php/records/KitabKuningDigital/${id}?transform=1`)
        .then(res => {
          if (res.data) {
            setKitabDetail(res.data);
          } else {
            setError('Data kitab tidak ditemukan');
          }
        })
        .catch(err => {
          setError('Terjadi kesalahan saat mengambil data');
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false); // Jika data kitab sudah ada di params, langsung stop loading
    }
  }, [id, kitabDetail]);

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
      {kitabDetail ? (
        <>
          {/* Slider Gambar Kitab */}
          <View style={styles.sliderContainer}>
            {kitabDetail.img_kitab ? (
              <ImageSlider
                images={[kitabDetail.img_kitab]} // Menampilkan gambar dari img_kitab
                autoPlayWithInterval={3000}
              />
            ) : (
              <Image source={{ uri: kitabDetail.img_kitab }} style={styles.image} />
            )}
          </View>

          <Text style={styles.title}>{kitabDetail.nama_kitab_indo || 'Judul Tidak Tersedia'}</Text>
          <Text style={styles.arabTitle}>{kitabDetail.nama_kitab_arab || 'عنوان غير متوفر'}</Text>
          <Text>{kitabDetail.deskripsi_kitab || 'Tidak ada deskripsi tersedia.'}</Text>
          <Text style={styles.tag}>Tag: {kitabDetail.tag_kitab || 'Tidak ada tag'}</Text>
          <Button title="Kembali ke Daftar Kitab" onPress={() => navigation.goBack()} />
        </>
      ) : (
        <Text>Data tidak ditemukan</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  arabTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00796b',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  tag: {
    fontStyle: 'italic',
    color: '#555',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
