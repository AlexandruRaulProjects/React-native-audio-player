import { createContext, useState } from 'react';

export const NumberContext = createContext({
    nrOfAudios: 0,
    decrement: () => { nrOfAudios-- },
    increment: () => { nrOfAudios++ }
})

function NumberContextProvider({ children }) {

    const { numberOfAudios, setNumberOfAudios } = useState(0);

    function incrementNumberOfAudios() {
        setNumberOfAudios((current) => current++);
    }

    function decrementNumberOfAudios() {
        setNumberOfAudios((current) => current--);
    }

    const value = {
        nrOfAudios: numberOfAudios,
        decrement: decrementNumberOfAudios,
        increment: incrementNumberOfAudios
    }

    return <NumberContext.Provider value={value}>{children}</NumberContext.Provider>
}

export default NumberContextProvider;