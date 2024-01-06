import axios from 'axios';

const FIREBASE_URL = 'https://audiobook-react-native-default-rtdb.europe-west1.firebasedatabase.app';

export async function storeAudio(expenseData) {
    const response = await axios.post(
        FIREBASE_URL + '/audios.json',
        expenseData
    );
    const id = response.data.name;
    return id;
}

export async function fetchAudios() {
    const response = await axios.get(FIREBASE_URL + '/audios.json');

    const expenses = [];

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            name: response.data[key].name,
            image: response.data[key].image,
            author: response.data[key].author,
            textContent: response.data[key].textContent,
        }

        expenses.push(expenseObj);
    }

    return expenses;
}

/*
name,
        image,
        author,
        textContent,
*/