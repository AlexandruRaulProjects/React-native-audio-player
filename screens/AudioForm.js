import { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import CustomLinearGradient from '../components/CustomLinearGradient';
import CustomButton from '../components/CustomButton';
import Input from '../components/Input';
import { storeAudio } from '../utils/http';
import { AudiosContext } from '../context/audios-context';
import { AuthContext } from '../context/auth-context';

function AudioForm({ navigation }) {

    const [inputs, setInputs] = useState({
        name: {
            value: '',
            isValid: true,
        },
        image: {
            value: '',
            isValid: true,
        },
        author: {
            value: '',
            isValid: true,
        },
        read: {
            value: '',
            isValid: true,
        }
    });

    const audioCtx = useContext(AudiosContext);
    const authCtx = useContext(AuthContext);

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true }
            }
        });
    }

    let formIsValid;

    async function sendValidatedInputs(audioData) {
        const nameIsValid = audioData.name.length > 1;
        const imageIsValid = audioData.image.length > 1;
        const authorIsValid = audioData.author.length > 3;
        const readIsValid = audioData.read.length > 10;

        formIsValid = nameIsValid && imageIsValid && authorIsValid && readIsValid;

        if (!formIsValid) {
            //TODO: show some feedback
            //Alert.alert('Invalid input!', 'Please check your input values!');
            setInputs((currentInputs) => {
                return {
                    name: { value: currentInputs.name.value, isValid: nameIsValid },
                    image: { value: currentInputs.image.value, isValid: imageIsValid },
                    author: { value: currentInputs.author.value, isValid: authorIsValid },
                    read: { value: currentInputs.read.value, isValid: readIsValid },
                };
            });
        }
        if (formIsValid) {

            navigation.navigate("Menu");
            const id = await storeAudio(audioData, authCtx.token);
            audioCtx.addAudio({ ...audioData, id: id });
        }
    }

    function addAudioHandler() {
        const audioData = {
            name: inputs.name.value,
            image: inputs.image.value,
            author: inputs.author.value,
            read: inputs.read.value,
        }

        sendValidatedInputs(audioData);
    }

    function cancelHandler() {
        navigation.navigate("Menu");
    }

    return <CustomLinearGradient
    >
        <Text style={styles.pageTitleSS}>Audio</Text>
        <View style={styles.inputsV}>
            <Input
                label='Name'
                invalid={!inputs.name.isValid}
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(this, 'name'),
                    value: inputs.name.value
                }}
            />
            <Input
                label='Image'
                invalid={!inputs.image.isValid}
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(this, 'image'),
                    value: inputs.image.value
                }}
            />
            <Input
                label='Author'
                invalid={!inputs.author.isValid}
                textInputConfig={{
                    autoCapitalize: 'words',
                    onChangeText: inputChangeHandler.bind(this, 'author'),
                    value: inputs.author.value
                }}
            />
            <Input
                label='Read'
                invalid={!inputs.read.isValid}
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangeHandler.bind(this, 'read'),
                    value: inputs.read.value
                }}
            />
        </View>

        <View style={styles.buttonsV}>
            <CustomButton style={styles.button} iconName={"pluscircleo"} buttonText={"Add"} onPress={addAudioHandler} />

            <CustomButton style={styles.button} iconName={"minuscircleo"} buttonText={"Cancel"} onPress={cancelHandler} />
        </View>

        <StatusBar style="auto" />
    </CustomLinearGradient>
}

const styles = StyleSheet.create({
    rootSS: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    pageTitleSS: {
        color: "#F1F1F1",
        fontSize: 32,
        marginBottom: 48,
    },
    inputsV: {
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    buttonsV: {
        marginTop: 12,
        height: 95,
        justifyContent: "space-between"
    },
    button: {
        marginTop: 12,
        marginBottom: 6,
    },
    buttonText: {
        paddingHorizontal: 24,
        paddingVertical: 12,
    }
});


export default AudioForm;

