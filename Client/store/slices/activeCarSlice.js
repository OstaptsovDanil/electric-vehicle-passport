import {createSlice} from "@reduxjs/toolkit";
import {LoadingStatuses} from "./userSlice";

const initialState = {
    info : {
        model : '',
        vin : '',
        carType : '',
        category : '',
        carName : '',
        engineType : '',
        carColor : '',
    }

}

const activeCarSlice = createSlice({
    name : "activeCar",
    initialState,
    reducers: {
        setActiveCarData(state,action){
            state.info = {...action.payload}
            console.log('STATE ACTIVE_CAR',state.info)
        }
    }
})

export default activeCarSlice.reducer;
export const {setActiveCarData} = activeCarSlice.actions;
