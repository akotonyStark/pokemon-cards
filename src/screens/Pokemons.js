import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Button, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import { getPokemonDescription, getPokemonList, getPokemonSpriteUrl } from '../api/utils'
import Card from '../components/Card'
import SelectDropdown from 'react-native-select-dropdown'
import RNPickerSelect from 'react-native-picker-select';

function Pokemons() {
    const [pokemonList, setPokemonList] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [pokemonIndex, setPokemonIndex] = useState(1);


    useEffect(() => {
        async function getData() {
            const apiData = await getPokemonList();

            const desc = await getPokemonDescription(1);
            setImageUrl(getPokemonSpriteUrl(1));
            setPokemonList(apiData);
            setSelectedPokemon(apiData[0]);
            setDescription(desc);
        }
        getData();
    }, []);


    const handleChangePokemon = async (index) => {
        setSelectedPokemon(pokemonList[index - 1]);
        setImageUrl(getPokemonSpriteUrl(pokemonIndex));
        const desc = await getPokemonDescription(pokemonIndex);
        setDescription(desc);
    };


    const handlePreviousClick = () => {
        setPokemonIndex(pokemonIndex - 1);
        setSelectedPokemon(pokemonList[pokemonIndex - 1]);
        setImageUrl(getPokemonSpriteUrl(pokemonIndex));
    };

    const handleNextClick = () => {
        setPokemonIndex(pokemonIndex + 1);
        setSelectedPokemon(pokemonList[pokemonIndex - 1]);
        setImageUrl(getPokemonSpriteUrl(pokemonIndex));
    };


    useEffect(() => {
        //console.log(selectedPokemon)
        handleChangePokemon(pokemonIndex);
    }, [pokemonIndex]);

    const pokemonNames = pokemonList.map((pokemon) => pokemon.name)

    const pokemonOptions = pokemonList.map((pokemon, idx) => {
        return {
            label: pokemon.name,
            value: idx + 1
        }
    })


    return (
        <SafeAreaView style={styles.body}>
            <StatusBar barStyle="dark-content" />
            {/* <RNPickerSelect
                //placeholder={placeholder}
                items={pokemonOptions}
                onValueChange={(item) => setPokemonIndex(item.value)}
                value={pokemonIndex}
            /> */}

            <Text style={{fontSize:16, marginBottom:10, fontWeight:400, color:'white'}}>Tap to Select a Pokemon</Text>
            <SelectDropdown
                data={pokemonNames} search={true} 
                buttonStyle={{width:'100%'}}
                defaultValue={selectedPokemon?.name}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                    setPokemonIndex(index + 1)
                }} />
            <View >
                <Card
                    {...selectedPokemon}
                    imageUrl={imageUrl}
                    description={description}
                />
            </View>

            <View style={{ flex: 2 }}></View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.buttons} onPress={handlePreviousClick}>
                    <Text style={{color:'white'}}>Previous</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttons} onPress={handleNextClick}>
                    <Text style={{color:'white'}}>Next</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        justifyContent: 'flex-end',
        backgroundColor: 'darkred',
        flex: 1,
        padding: 10,
        paddingTop: 60,

    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    buttons: {
        backgroundColor: '#008179',
        height: 50,
        width: '40%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Pokemons