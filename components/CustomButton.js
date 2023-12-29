import { View, StyleSheet, Text, Pressable } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

function CustomButton({ iconName, buttonText, onPress }) {
    return <View style={styles.button}>
        <Pressable onPress={onPress} android_ripple={{ color: 'rgba(117,29,124,0.2)' }}>
            <View style={styles.buttonText}>
                <Text>
                    <View style={styles.flexRowSS}>
                        <AntDesign name={iconName} size={16} color="rgba(117,29,124,1)" />
                        <Text style={styles.buttonTextSS}> {buttonText}</Text>
                    </View>
                </Text>
            </View>
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#F1F1F1',
        fontSize: 24,
        borderRadius: 6,
    },
    buttonText: {
        paddingHorizontal: 96,
        paddingVertical: 12,
    },
    buttonTextSS: {
        color: "rgba(117,29,124,1)",
    },
    flexRowSS: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default CustomButton;