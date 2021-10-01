import React from "react";

const SsgContext = React.createContext({
    seed:"",
    char:"",
    diff:"",
    opts:{
        FLOORINDEX:0,
        ENHANCE:false,
        CHOICE:false,
        STAIRS:false,
        PRESTIGE:false,
        BLACKMARKET:false,
        PORTAL:false,
        NULLSEED:false,
        HEALTH:"",
        SHIELD:"",
        COINS:"",
        KEYS:"",
        WEAPON:"",
        AUXILARY:"",
        SECONDARY:"",
        ULTIMATE:"",
        ULTCHARGE:false,
        CURSES:[],
        STATS: {
            AMMO:"",
            ABILITY:"",
            PRECISION:"",
            DAMAGE:"",
            LUCK:"",
            RANGE:"",
            SPEED:"",
        },
        TRAITS: {
            NOWEAPONS:false,
            NOHEALTH:false,
            SMALL:false,
            BANKS:false,
            GOLDHEALTH:false,
            CLEARALL:false,
            NOSHOPS:false,
            NOTREASURE:false,
            NOARMORY:false,
        }
    }
});

export default SsgContext;