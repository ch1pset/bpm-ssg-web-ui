import React from "react";

const SsgContext = React.createContext({
    seed:"",
    char:"",
    diff:"",
    opts:{
        CURSES:[],
        STATS: {},
        ABILITIES: {},
        ITEMS: {},
        TRAITS: {}
    }
});

export default SsgContext;