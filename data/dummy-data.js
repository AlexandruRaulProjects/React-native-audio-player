import User from "../models/User";
import Audio from "../models/Audio";

// Generate 3 users
export const USERS = [];
for (let i = 1; i <= 3; i++) {
    const user = new User(
        i,
        `User${i} Full Name`,
        `user${i}_username`,
        `user${i}@example.com`,
        `password${i}`
    );
    USERS.push(user);
}

// Generate 20 audios
export const AUDIOS = [];
for (let i = 1; i <= 20; i++) {
    const audio = new Audio(
        i,
        `Audio${i} Name`,
        `audio${i}.jpg`,
        `Author${i}`,
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
    );
    AUDIOS.push(audio);
}


// Number of Audios for logged user
// export var AUDIOS_NUMBER = 0;

// function calculateNumberOfAudios() {
//     // TODO: the actual implementation
//     AUDIOS_NUMBER = AUDIOS.length;
//     return AUDIOS_NUMBER;
// }

// AUDIOS_NUMBER = calculateNumberOfAudios();