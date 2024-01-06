import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { useState } from 'react';


import CustomLinearGradient from '../components/CustomLinearGradient';
import CustomButton from '../components/CustomButton';
import Input from '../components/Input';

function SignUp({ navigation }) {

    const [inputs, setInputs] = useState({
        username: {
            value: '',
            isValid: true,
        },
        fullname: {
            value: '',
            isValid: true,
        },
        email: {
            value: '',
            isValid: true,
        },
        password: {
            value: '',
            isValid: true,
        }
    });

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true }
            }
        });
    }

    async function sendValidatedInputs(signUpData) {
        const usernameIsValid = signUpData.username.length > 1;
        const fullnameIsValid = signUpData.fullname.length > 10;
        const emailIsValid = signUpData.email.length > 10;
        const passwordIsValid = signUpData.password.length > 10;

        formIsValid = usernameIsValid && fullnameIsValid && emailIsValid && passwordIsValid;

        if (!formIsValid) {
            //TODO: show some feedback
            //Alert.alert('Invalid input!', 'Please check your input values!');
            setInputs((currentInputs) => {
                return {
                    username: { value: currentInputs.username.value, isValid: usernameIsValid },
                    fullname: { value: currentInputs.fullname.value, isValid: fullnameIsValid },
                    email: { value: currentInputs.email.value, isValid: emailIsValid },
                    password: { value: currentInputs.password.value, isValid: passwordIsValid },
                };
            });
        }
        if (formIsValid) {

            // navigation.navigate("Menu");
            // const id = await storeAudio(audioData);
            // audioCtx.addAudio({...audioData, id: id});
        }
    }

    function signUpHandler() {

        const signUpData = {
            username: inputs.username.value,
            fullname: inputs.fullname.value,
            email: inputs.email.value,
            password: inputs.password.value,
        }

        //TODO: Sign Up implementation
    }

    function signInHandler() {
        navigation.navigate('SignIn');
    }

    return <CustomLinearGradient
    >
        <Text style={styles.pageTitleSS}>Create An Account</Text>
        <View style={styles.inputsV}>
            <Input
                label='Username'
                invalid={!inputs.username.isValid}
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(this, 'username'),
                    value: inputs.username.value
                }}
            />
            <Input
                label='fullname'
                invalid={!inputs.username.isValid}
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(this, 'fullname'),
                    value: inputs.fullname.value
                }}
            />
            <Input
                label='email'
                invalid={!inputs.password.isValid}
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(this, 'email'),
                    value: inputs.password.value,
                    textContentType: 'email',
                }}
            />
            <Input
                label='Password'
                invalid={!inputs.password.isValid}
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(this, 'password'),
                    value: inputs.password.value,
                    secureTextEntry: true,
                }}
            />
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

