import { AUDIOS } from '../data/dummy-data';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import CustomButton from '../components/CustomButton';
import AudioGridTile from '../components/AudioGridTile';
import CustomLinearGradient from '../components/CustomLinearGradient';

function renderAudioItem(itemData) {
    return <AudioGridTile name={itemData.item.name} image={itemData.item.image} author={itemData.item.author} textContent={itemData.item.content} />;
}

function MyAudioBooks({ navigation }) {


    function pressHandler() {
        navigation.navigate('Menu', {
            numberOfAudios: AUDIOS.length,
        });
    }

    return <CustomLinearGradient>
        <View style={styles.containerSS}>
            <Text style={styles.titleSS}>Audio Books</Text>
            <FlatList
                style={styles.audiosListSS}
                data={AUDIOS}
                keyExtractor={(item) => item.id}
                renderItem={renderAudioItem}
                alwaysBounceVertical={false}
            />
            <CustomButton
                onPress={pressHandler}
                iconName='back'
                buttonText=' Back'
            />
        </View>
    </CustomLinearGradient >
}

const styles = StyleSheet.create({
    rootSS: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerSS: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 48
    },
    titleSS: {
        marginTop: 48,
        marginBottom: 48,
        fontSize: 32,
        color: "#F1F1F1"
    },
    audioItemSS: {
        flex: 1,
        flexDirection: 'row',
        maxWidth: '90%'
    },
    audiosListSS: {
        marginBottom: 24
    }
});

export default MyAudioBooks;