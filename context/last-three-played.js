import { createContext, useState } from 'react';

export const LastAudiosContext = createContext({
    lastThreeAudiosIDs: [],
    update: () => { }
})

function LastAudiosContextProvider({ children, lastAudio }) {

    const { lastThreeAudiosIDs, setLastThreeAudiosIDs } = useState([]);

    function updateLastThreeAudios() {
        setLastThreeAudiosIDs((current) => {
            if (current.length < 3) {
                current.push(lastAudio);
            }
            else {
                current.shift().push(lastAudio);
            }
        });
    }

    const value = {
        lastAudios: lastThreeAudiosIDs,
        update: updateLastThreeAudios
    }

    return <LastAudiosContext.Provider value={value} audio={lastAudio}>{children}</LastAudiosContext.Provider>
}

export default LastAudiosContextProvider;