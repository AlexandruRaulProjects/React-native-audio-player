import { View, Text, StyleSheet } from 'react-native';

function ErrorLoadingOverlay({ message }) {

    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error ocurred!</Text>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    text: {
        textAlign: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ErrorLoadingOverlay;

