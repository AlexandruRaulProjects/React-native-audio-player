import axios from 'axios';

const FIREBASE_URL = 'https://audiobook-react-native-default-rtdb.europe-west1.firebasedatabase.app';

export async function storeAudio(audioData, authToken) {
    const response = await axios.post(
        FIREBASE_URL
        + '/audios.json?auth='
        + authToken,
        audioData
    );
    const id = response.data.name;
    console.log(response.data);
    return id;
}

export async function fetchAudios(authToken) {
    const response = await axios.get(FIREBASE_URL
        + '/audios.json?auth='
        + authToken
    );

    const audios = [];

    for (const key in response.data) {
        const audioObj = {
            id: key,
            name: response.data[key].name,
            image: response.data[key].image,
            author: response.data[key].author,
            textContent: response.data[key].textContent,
        }

        audios.push(audioObj);
    }

    return audios;
}

/*
name,
        image,
        author,
        textContent,
*/