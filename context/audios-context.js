import { createContext, useReducer } from 'react';

export const AudiosContext = createContext({
    audios: [],
    setAudios: (audios) => { },
    addAudio: ({ name, author, read, play }) => { },
});

function audiosReducer(state, action) {
    switch (action.type) {
        case 'SET':
            return action.payload;
        case 'ADD':
            return [action.payload, ...state];
    }
}

function AudiosContextProvider({ children }) {
    const [ audiosState, dispatch ] = useReducer(audiosReducer, []);

    function setAudios(audioData) {
        dispatch({ type: "SET", payload: audioData });
    }

    function addAudio(audioData) {
        dispatch({ type: 'ADD', payload: audioData });
    }

    const value = {
        audios: audiosState,
        setAudios: setAudios,
        addAudio: addAudio,
    };

    return (
        <AudiosContext.Provider value={value}>
            {children}
        </AudiosContext.Provider>
    );
}

export default AudiosContextProvider;