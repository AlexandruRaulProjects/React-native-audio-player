import { View, Text, StyleSheet } from 'react-native';

import CustomLinearGradient from "../components/CustomLinearGradient";
import CustomButton from '../components/CustomButton';


function LastPlayedAudios({ navigation }) {

    function pressHandler() {
        navigation.navigate("Menu");
    }

    return <CustomLinearGradient>
        <View>
            <Text>This is Last Played Audios screen</Text>
            
            <CustomButton
                onPress={pressHandler}
                iconName='back'
                buttonText=' Back'
            />
        </View>
    </CustomLinearGradient>
}

const styles = StyleSheet.create({

});

export default LastPlayedAudios;