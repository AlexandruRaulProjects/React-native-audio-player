import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { useState, useContext } from 'react';


import CustomLinearGradient from '../components/CustomLinearGradient';
import CustomButton from '../components/CustomButton';
import Input from '../components/Input';
import { createUser } from '../utils/auth';
import LoadingOverlay from '../components/LoadingOverlay';
import { AuthContext } from '../context/auth-context';

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

    async function sendValidatedInputs(signUpData) {
        const usernameIsValid = signUpData.username.length > 4;
        const fullnameIsValid = signUpData.fullname.length > 4;
        const emailIsValid = signUpData.email.includes('@');
        const passwordIsValid = signUpData.password.length > 6;

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
            setIsAuthenticating(true);
            try {
                const token = await createUser(signUpData.email, signUpData.password);
                authCtx.authenticate(token);
            }
            catch (error) {
                Alert.alert('Authentication failed!', 'Could not create a new user. Check your inputs or come back later!');
            }
            setIsAuthenticating(false);
        }
    }

    function signUpHandler() {

        const signUpData = {
            username: inputs.username.value,
            fullname: inputs.fullname.value,
            email: inputs.email.value,
            password: inputs.password.value,
        }

        sendValidatedInputs(signUpData);
        //TODO: Sign Up implementation
    }

    function signInHandler() {
        navigation.navigate('SignIn');
    }

    if (isAuthenticating) {
        return <LoadingOverlay message={"Creating user..."} />
    }

    return <CustomLinearGradient
    >
        <Text style={styles.pageTitleSS}>Create An Account</Text>
        <View>
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
                invalid={!inputs.email.isValid}
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(this, 'email'),
                    value: inputs.email.value,
                    textContentType: 'emailAddress',
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

