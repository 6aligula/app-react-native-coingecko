import { Text, View, FlatList, StyleSheet, TextInput, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import Coinitem from './components/Coinitem';

const App = () => {
  //arreglo que guarda los valores de las monedas, inicialmente esta en blanco
  const [coins, setCoins] = useState([]);
  //arreglo para buscar las monedas, inicialmente esta en blanco
  const [search, setSearch] = useState('');
  //State para refrescar precios
  const [refreshing, setRefreshing] = useState(false);

  //funcion que llama a la api de coingecko para pedir todos los valores de las monedas
  const loadData = async () => {
    // console.log('loaded');
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await res.json()
    //console.log(data)
    //cargo los datos
    setCoins(data);
  }

  useEffect(() => {
    loadData()
  }, []);

  return (
    <View style={styles.container}>

      <StatusBar backgroundColor='#141414' />
      <View style={styles.header}>
        <Text style={styles.title}>Mercado Crypto</Text>
        <TextInput style={styles.searchInput}
          placeholder='Search Coin'
          placeholderTextColor='#858585'
          onChangeText={(text) => setSearch(text)}
          //onChangeText={text => console.log(text.toLowerCase())}
        />
      </View>

      <FlatList
        style={styles.list}
        //comparar y buscar coincidencias
        data={
          coins.filter(
            (coin) => coin.name.toLowerCase().includes(search.toLowerCase()) ||
              coin.symbol.toLowerCase().includes(search.toLowerCase()))

        }

        //devolver uno a uno los objetos
        renderItem={({ item }) => {
          // console.log(item.name)
          return <Coinitem coin={item} />
        }}
        //ocultar la barra de scroll vertical
        showsHorizontalScrollIndicator={false}
        //refrescar app para actualizar los datos de precios
        refreshing={refreshing}
        onRefresh={async() =>{
          setRefreshing(true)
          await loadData()
          setRefreshing(false)
          //console.log('refresehing');
        }}
      />
    </View>

  )
}

export default App

//darle estilos al view
const styles = StyleSheet.create({
  container: {
    //flex 1 ocupa toda la pantalla
    flex: 1,
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    marginTop: 10,
    fontSize: 20
  },
  list: {
    width: '90%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 15
  },
  searchInput: {
    color: '#fff',
    borderBottomColor: '#4657CE',
    borderBottomWidth: 1,
    width: '40%',
    textAlign: 'center',
    //textTransform: 'lowercase'

  }
});
