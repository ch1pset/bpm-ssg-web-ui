import React from "react";

const SsgContext = React.createContext({
    seed:"",
    char:"",
    diff:"",
    opts:{
        CURSES:[],
        STATS: {},
        TRAITS: {}
    }
});

export default SsgContext;