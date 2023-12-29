import Checkbox from "expo-checkbox";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

function AudioGridTile({ name, image, author, textContent }) {

    const [isChecked, setChecked] = useState(false);

    return <View>
        <View style={styles.audioDetails}>
            <Text style={styles.image}>Jpg</Text>
            <View style={styles.nameAndAuthor}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.author}>{author}</Text>
            </View>
            <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? 'indigo' : undefined}
            />

            <Pressable android_ripple={{ color: '#ccc', radius: 10 }}>
                <View>
                    <AntDesign name="play" size={24} color="#EFE7FF" />
                </View>
            </Pressable>
        </View>
    </View>
}

const styles = StyleSheet.create({
    audioDetails: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: 340,
        marginBottom: 12,
        backgroundColor: '#71498F',
        borderRadius: 4,
        paddingVertical: 16,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#130045'
    },
    name: {
        color: '#F1F1F1',
        fontSize: 16,
        fontWeight: '500'
    },
    author: {
        color: '#F1F1F1',
        fontSize: 12,
        fontWeight: '200'
    },
    image: {
        color: '#F1F1F1'
    },
    play: {
        borderRadius: 10
    },
});

export default AudioGridTile;