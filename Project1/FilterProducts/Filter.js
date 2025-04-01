import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const Filter = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  async function getQuotes() {
    try {
      const response = await fetch('https://dummyjson.com/quotes');
      const result = await response.json();
      setData(result.quotes); // assuming 'quotes' is the key in the response data
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error(error);
      setLoading(false); // Set loading to false even if there's an error
    }
  }

  useEffect(() => {
    getQuotes();
  }, []);

  if (loading) {
    return <Text style={styles.text}>Loading...</Text>;
  }

  return (
    <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>Filter Products</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()} // Using index as a key for FlatList
        renderItem={({ item }) => (
          <View style={styles.quoteView}>
            <Text>{item.quote}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quoteView: {
    padding: 15,
    margin: 5,
    borderRadius: 10,
    backgroundColor: 'yellow',
  },
});

export default Filter;
