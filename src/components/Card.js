import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

function Card({ imageUrl, name, description }) {
  return (
    <View style={styles.pokemoncard}  >
      <View style={{ justifyContent: 'center', alignItems: 'center', }}>

        {imageUrl &&
          <View style={styles.badge}>
            <Image
              source={{ uri: imageUrl }}
              style={{ height: 200, width: 200 }}
            />
          </View>

        }


        <Text style={{ fontSize: 48, fontWeight: 600 }}>{name?.toUpperCase()}</Text>
        <Text style={{ fontSize: 16, marginTop: 20 }}>{description}</Text>


      </View>

    </View>
  );
}


const styles = StyleSheet.create({

  pokemoncard: {
    backgroundColor: '#fff',
    boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
    padding: 20,
    borderRadius: 10,
    marginTop: 30
  },
  badge: {
    height: 300, width: 300, backgroundColor: '#fafafa', borderRadius: 300, justifyContent: 'center',
    borderColor: '#008179', alignItems: 'center',
    borderWidth: 3, marginBottom:20
  }
})

export default Card;
