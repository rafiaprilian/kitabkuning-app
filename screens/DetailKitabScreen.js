import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function DetailKitabScreen({ route }) {
  const { id } = route.params;
  const [kitabDetail, setKitabDetail] = useState(null);

  useEffect(() => {
    axios.get(`https://get.ichwanul.com/api/api.php/records/KitabKuningDigital/${id}?transform=1`)
      .then(res => {
        setKitabDetail(res.data.records[0]);
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);

  return (
    <View style={styles.container}>
      {kitabDetail ? (
        <>
          <Text style={styles.title}>{kitabDetail.judul}</Text>
          <Text>{kitabDetail.deskripsi}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
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
});
