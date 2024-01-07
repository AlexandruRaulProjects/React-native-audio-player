import { Feather } from '@expo/vector-icons';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { useState, useContext } from 'react';

import CustomLinearGradient from '../components/CustomLinearGradient';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import LoadingOverlay from '../components/LoadingOverlay';
import { login } from '../utils/auth';
import { AuthContext } from '../context/auth-context';

function SignIn({ navigation }) {

    const [inputs, setInputs] = useState({
        email: {
            value: '',
            isValid: true,
        },
        password: {
            value: '',
            isValid: true,
        },
    });

    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const authCtx = useContext(AuthContext);

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true }
            }
        });
    }

    async function sendValidatedInputs(signInData) {
        const emailIsValid = signInData.email.length > 1;
        const passwordIsValid = signInData.password.length > 6;

        formIsValid = emailIsValid && passwordIsValid;

        if (!formIsValid) {
            //TODO: show some feedback
            //Alert.alert('Invalid input!', 'Please check your input values!');
            setInputs((currentInputs) => {
                return {
                    email: { value: currentInputs.email.value, isValid: emailIsValid },
                    password: { value: currentInputs.password.value, isValid: passwordIsValid },
                };
            });
        }
        if (formIsValid) {

            setIsAuthenticating(true);
            try {
                const token = await login(signInData.email, signInData.password);
                authCtx.authenticate(token);
                console.log(authCtx.isAuthenticated)
            } catch (error) {
                Alert.alert('Authentication failed!', 'Could not log you in. Check you credentials or come back later!');
            }

            setIsAuthenticating(false);
        }
    }

    function signInHandler() {
        const signInData = {
            email: inputs.email.value,
            password: inputs.password.value,
        }

        sendValidatedInputs(signInData);
        //TODO: Sign In implementation
    }

    function signUpHandler() {
        navigation.navigate('SignUp');
    }

    if (isAuthenticating) {
        return <LoadingOverlay message={"Logging in user..."} />
    }

    return <CustomLinearGradient style={styles.gradient}>
        <Text style={styles.title}>APP TITLE</Text>
        <Feather style={styles.logo} name="book" size={48} color="#F1F1F1" />
        <View style={styles.inputsV}>
            <Input
                label='Email'
                invalid={!inputs.email.isValid}
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(this, 'email'),
                    value: inputs.email.value
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
            <Text style={styles.forgotPassword}>Forgot password?</Text>
        </View>
        <CustomButton buttonText={"Sign in"} onPress={signInHandler} buttonTextStyle={styles.buttonTextStyle} buttonStyle={styles.buttonStyle} />

        <View style={styles.dontHaveAnAccountContainer}>
            <Text style={styles.dontHaveAnAccount}>Don't you have an account?</Text>
            <View style={styles.thenSignUpContainer}>
                <Text style={styles.thenSignUp}>then</Text>
                <Text style={styles.signUpButton} onPress={signUpHandler}>Sign up</Text>
            </View>
        </View>

    </CustomLinearGradient>;

}

const styles = StyleSheet.create({
    gradient: {
        justifyContent: 'flex-start',
    },
    title: {
        color: '#F1F1F1',
        fontWeight: '800',
        fontSize: 48,
        marginBottom: 64,
        marginTop: 64,
    },
    logo: {
        marginBottom: 64,

    },
    input: {

    },
    buttonStyle: {
        marginTop: 80,
    },
    buttonTextStyle: {
        fontSize: 24,
        fontWeight: '700'
    },
    forgotPassword: {
        fontWeight: '500',
        color: '#F1F1F1',
        textDecorationLine: 'underline'
    },
    dontHaveAnAccountContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 72,
    },
    dontHaveAnAccount: {
        color: '#F1F1F1',
    },
    thenSignUpContainer: {
        flexDirection: 'row',
        marginTop: 8,
    },
    thenSignUp: {
        color: '#F1F1F1',
        marginRight: 2,
        marginTop: 2,
    },
    signUpButton: {
        color: 'rgba(121,9,105,1)',
        backgroundColor: '#F1F1F1',
        marginLeft: 2,
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 8,
        fontWeight: '700',
    },
    inputsV: {
        flexDirection: "column",
        justifyContent: "flex-start"
    },
});

export default SignIn;