import React from 'react'

const StateContext = React.createContext({
    seed:"",
    char:"",
    diff:"",
    opts:{
        ENHANCE:false,
        FLOORINDEX:0
    }
})

export default StateContext;