import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const Coinitem = ({ coin }) => {
    //props.coin
    return (
        <View style={styles.containerItem}>
            <View style={styles.coinName}>
                <Image
                    style={styles.image}
                    source={{ uri: coin.image }}
                />
                <View style={styles.containerNames}>
                    <Text style={styles.text}>{coin.name}</Text>
                    <Text style={styles.coinSymbol}>{coin.symbol}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.textPrice}>{coin.current_price} $</Text>
                {/* en el estilo hay un arreglo para el cambio de color entre verde y rojo */}
                <Text style={[styles.pricePercentage, coin.price_change_percentage_24h > 0 ? styles.priceUp : styles.priceDown]}>{coin.price_change_percentage_24h} %</Text>
            </View>

        </View>
    )
}

export default Coinitem

//darle estilos al view
const styles = StyleSheet.create({
    containerItem: {
        //flex 1 ocupa toda la pantalla
        flex: 1,
        backgroundColor: '#121212',
        paddingTop: 10,
        //colocar imagen junto a nambre de crypto
        flexDirection: 'row',
        //separar la imagen del nombre y precio
        justifyContent: 'space-between',
        textAlign: 'center'

    },
    text: {
        color: '#ffffff'
    },
    image: {
        width: 30,
        height: 30
    },
    coinName: {
        flexDirection: 'row',

    },
    coinSymbol: {
        color: '#434343',
        textTransform: 'uppercase'
    },
    containerNames: {
        marginLeft: 10
    },
    textPrice: {
        color: 'white',
        textAlign: 'right'
    },
    //estilos para el cambio del precio de rojo a verde
    pricePercentage: {
        textAlign: 'right'
    },
    priceUp: {
        color: 'green'
    },
    priceDown: {
        color: 'red'
    }
});