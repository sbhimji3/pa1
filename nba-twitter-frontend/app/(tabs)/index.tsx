import { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button,FlatList } from 'react-native';
import { postSearch, getSearch } from '../api/api'

export default function HomeScreen() {
  const [text, onChangeText] = useState('Enter name');

  const [recentSearches, setRecentSearches] = useState([]);
  const [searchResults, updatedResults] = useState<any[]>([])

  async function handleSubmit() {
    const response = await postSearch(text);

    if (response) {
      fetchRecentSearches()
      const articles = await getSearch(text)
      updatedResults(articles)
    }
  }

  async function fetchRecentSearches() {
    try {
      const response = await fetch('https://ca15de59-957a-4b6e-9dfc-f158c87aad6d.us-east-1.cloud.genez.io/recent-searches');
      const data = await response.json();
      console.log("yo")
      console.log(data)
      setRecentSearches(Object.values(data.names)); 
    } catch (error) {
      console.error('Error fetching recent searches:', error);
    }
  }

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.text}>Search your favorite team!</Text>
      <TextInput 
        style={styles.input} 
        onChangeText={onChangeText} 
        value={text} 
        placeholder="Enter name" 
        placeholderTextColor="#888" 
      />
      <Button 
        title="Submit" 
        onPress={handleSubmit} 
      />
      <View style={styles.recentSearchesContainer}>
      <Text style={styles.recentSearchesTitle}>Results</Text>
      <FlatList
        data={searchResults.slice(0,3)}
        renderItem={({ item }) => (
          <Text style={styles.recentSearchText}>
            {item.source} - {item.title}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
      <View style={styles.recentSearchesContainer}>
      <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
      
      <FlatList
        data={recentSearches?.slice(-5) || []}
        renderItem={({ item }) => <Text style={styles.recentSearchText}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    alignItems: 'center',
    color: '#478'
  },
  text2: {
    fontSize: 36,
    color: '#478'
  },
  input: {
    color: '#478',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    marginTop: 40,
    marginBottom: 0,
    paddingLeft: 10,
    width: '70%',
  },
  recentSearchText: {
    fontSize: 16,
    padding: 5,
    backgroundColor: '#fafafa',
    marginVertical: 5,
    borderRadius: 25,
    alignItems: 'center',
  },
  recentSearchesContainer: {
    width: '80%',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  recentSearchesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    justifyContent: 'center',
    color: '#333',
    marginBottom: 10,
  },
});
