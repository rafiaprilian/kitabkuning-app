import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function DetailKitabScreen({ route }) {
  const { id } = route.params;
  const [kitabDetail, setKitabDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('ID kitab tidak valid');
      setLoading(false);
      return;
    }

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
  }, [id]);

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
    <View style={styles.container}>
      {kitabDetail ? (
        <>
          <Text style={styles.title}>{kitabDetail.judul}</Text>
          <Text>{kitabDetail.deskripsi || 'Tidak ada deskripsi tersedia.'}</Text>
        </>
      ) : (
        <Text>Data tidak ditemukan</Text>
      )}
    </View>
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
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
