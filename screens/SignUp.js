import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';

import CustomLinearGradient from '../components/CustomLinearGradient';

function SignUp() {
    return <CustomLinearGradient
    >
        <Text style={styles.pageTitleSS}>Sign up</Text>
        <View>
            <TextInput style={styles.inputSS} placeholder='first input'></TextInput>
            <TextInput style={styles.inputSS} placeholder='second input'></TextInput>
            <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? '#4630EB' : undefined}
            />
        </View>

        <View style={styles.button}>
            <Pressable onPress={() => console.log("Pressed")} android_ripple={{ color: 'rgba(117,29,124,0.2)' }}>
                <View style={styles.buttonText}>
                    <Text>Register</Text>
                </View>
            </Pressable>
        </View>
        <StatusBar style="auto" />
    </CustomLinearGradient>
}

const styles = StyleSheet.create({
    rootSS: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageTitleSS: {
        color: "#F1F1F1",
        fontSize: 32,
        marginBottom: 48,
    },
    inputSS: {
        color: 'rgba(121,9,105,1)',
        backgroundColor: "#F1F1F1",
        paddingHorizontal: 8,
        paddingVertical: 8,
        width: 300,
        borderStyle: "solid",
        borderBottomWidth: 3,
        borderBottomColor: "gray",
        borderStartEndRadius: 4,
        borderStartStartRadius: 4,
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#F1F1F1',
        fontSize: 24,
        borderRadius: 6,
    },
    buttonText: {
        paddingHorizontal: 24,
        paddingVertical: 12,
    }
});


export default SignUp;

