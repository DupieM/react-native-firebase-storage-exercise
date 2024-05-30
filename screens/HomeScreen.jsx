import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getMemoryList } from '../services/BucketService';


const HomeScreen = ({ navigation }) => {

    const [memories, setMemories] = useState(null);

    useEffect(() => {
        const getMemories = async () => {
            console.log(memories);
            setMemories(await getMemoryList())
        }
        

        const unsubscribe = navigation.addListener('focus', () => {
            getMemories();
        });

        return unsubscribe;

    }, [navigation])

    const renderData = async () => {
        if (!memories) {
            return <Text>Loading......</Text>
        }

        return memories.map((data, index) => (
            <View style={styles.card} key={index}>
                <Image
                    style={styles.img}
                    source={{ uri: data.ImageURL }} />

                <Text>{data.title}</Text>
            </View>
        ))
    }



    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate("Add")}>
                <Text>Add</Text>
            </Pressable>

            {/* Card of your images that you need to loop through */}

            {renderData()}

        </View>

    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20
    },
    img: {
        width: '100%',
        height: 200,
        objectFit: 'cover'
    }
})