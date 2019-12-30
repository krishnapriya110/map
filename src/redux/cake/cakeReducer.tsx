import {BUY_CAKE, CakeStateInterface} from './cakeTypes';
// ask how why
export const initialCakeState:CakeStateInterface ={
    noOfCakes:10
}


export let cakeReducer = (state:CakeStateInterface=initialCakeState,action:any)=>{
    switch (action.type) {
        case BUY_CAKE:
            return{
                ...state,
                noOfCakes:state.noOfCakes - 1

            }
        default:
            return state;
    }
}