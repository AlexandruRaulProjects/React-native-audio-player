import { StyleSheet } from 'react-native';

import { LinearGradient } from "expo-linear-gradient";



function CustomLinearGradient({ children, style }) {

    return <LinearGradient
        style={[styles.rootSS, style]}
        colors={['rgba(121,9,105,1)', 'rgba(117,29,124,1)']}
    >
        {children}
    </LinearGradient>
}

const styles = StyleSheet.create({
    rootSS: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CustomLinearGradient;