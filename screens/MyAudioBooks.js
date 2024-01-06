import { AUDIOS } from '../data/dummy-data';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import { fetchAudios } from '../utils/http';


import CustomButton from '../components/CustomButton';
import AudioGridTile from '../components/AudioGridTile';
import CustomLinearGradient from '../components/CustomLinearGradient';
import { AudiosContext } from '../context/audios-context';
import LoadingOverlay from '../components/LoadingOverlay';
import ErrorLoadingOverlay from '../components/ErrorOverlay';

function renderAudioItem(itemData) {
    return <AudioGridTile name={itemData.item.name} image={itemData.item.image} author={itemData.item.author} textContent={itemData.item.content} />;
}

function MyAudioBooks({ navigation }) {

    const [fetchedAudios, setFetchedAudios] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();

    const audiosCtx = useContext(AudiosContext);

    useEffect(() => {
        async function getAudios() {
            setIsFetching(true);
            try {
                const audios = await fetchAudios();
                audiosCtx.setAudios(audios);
                setFetchedAudios(audios);
            } catch (error) {
                console.error('Error fetching audios:', error);
                setError('Could not fetch audios!');
            }

            setIsFetching(false);
        }

        getAudios();
    }, []);


    function pressHandler() {
        navigation.navigate('Menu', {
            numberOfAudios: AUDIOS.length,
        });
    }

    if (error && !isFetching) {
        return <CustomLinearGradient>
            <ErrorLoadingOverlay message={error} />
        </CustomLinearGradient>
    }

    if (isFetching) {
        return <CustomLinearGradient>
            <LoadingOverlay />
        </CustomLinearGradient>
    }

    return <CustomLinearGradient>
        <View style={styles.containerSS}>
            <Text style={styles.titleSS}>Audio Books</Text>
            <FlatList
                style={styles.audiosListSS}
                data={fetchedAudios}
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