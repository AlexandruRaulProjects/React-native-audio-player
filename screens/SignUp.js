import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';


import CustomLinearGradient from '../components/CustomLinearGradient';
import CustomButton from '../components/CustomButton';

function SignUp({ navigation }) {

    function signUpHandler() {
        //TODO: Sign Up implementation
    }

    function signInHandler() {
        navigation.navigate('SignIn');
    }

    return <CustomLinearGradient
    >
        <Text style={styles.pageTitleSS}>Create An Account</Text>
        <View>
            <TextInput style={styles.inputSS} placeholder='username'></TextInput>
            <TextInput style={styles.inputSS} placeholder='fullname'></TextInput>
            <TextInput style={styles.inputSS} placeholder='email'></TextInput>
            <TextInput style={styles.inputSS} placeholder='password' secureTextEntry={true}></TextInput>
        </View>

        <CustomButton onPress={signUpHandler} buttonStyle={styles.signUp} buttonTextStyle={styles.signUpText} buttonText={'Sign Up'} />
        <CustomButton onPress={signInHandler} buttonStyle={styles.back} buttonTextStyle={styles.backText} buttonText={'Sign In'} iconName={'back'} />
        <StatusBar style="auto" />
    </CustomLinearGradient>
}

const styles = StyleSheet.create({
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
    signUp: {
        marginTop: 96,
    },
    signUpText: {
        fontSize: 24,
        fontWeight: '700'
    },
    back: {
        marginTop: 24,
    },
    backText: {
        fontSize: 16,
        fontWeight: '500',
    },
});


export default SignUp;

