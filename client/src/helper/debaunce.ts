import React from "react";


export const debounce =  (fn, limit) =>{
    let initTO;
    return function (...args){
        clearTimeout(initTO);
        initTO = setTimeout(()=>fn.apply(this, args), limit)
    }

}
