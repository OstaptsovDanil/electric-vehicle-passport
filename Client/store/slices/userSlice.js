import {createSlice} from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AsyncStorage} from "react-native";
import {addCar, getUserInfo} from "../../http/userApi";

export const LoadingStatuses = {loading:"loading",idle:"idle",error:"error"};

export const fetchUserData = createAsyncThunk(
    'user/fetchData',
    async()=>{
        return await getUserInfo();
    }
)

export const fetchAddNewCar = createAsyncThunk(
    'user/fetchAddNewCar',
    async(data)=>{
        return await addCar(data);
    }
)

const initialState = {
    userId:null,
    fullName:'',
    mobilePhone:'',
    email:'',
    cars:[],
    entranceLoadingStatus:LoadingStatuses.idle,
    carLoadingStatus:LoadingStatuses.idle,
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers: {
        async setId(state){
            const token = await AsyncStorage.getItem('token');
            console.log('TOKEN IN STATE',token)
            if(!token)
            {
                for(let field in state){
                    state[field] = initialState[field];
                }
                return;
            }
            try{
                const payload = await jwtDecode(token);
                if(payload){
                    state.userId = payload._id;
                    console.log('STATE ID', state.userId)
                }
            }
            catch (e){
                state.entranceLoadingStatus = LoadingStatuses.error;
            }
        },
    },
    extraReducers:{
        [fetchUserData.fulfilled]: (state,action) =>{
            try{
                // jwt expired or user deleted
                if(!action.payload){
                    state.entranceLoadingStatus = LoadingStatuses.error
                    return;
                }
                state.entranceLoadingStatus = LoadingStatuses.idle;
                const {email,fullName,cars,mobilePhone,_id} = action.payload.data;
                state.email = email;
                state.fullName = fullName;
                state.cars = [...cars];
                state.mobilePhone = mobilePhone;
                state.userId = _id;
                console.log('STATE USER : ',state)
            }
            catch(e){
                console.log('GET ERROR WHILE FETCHING USER DATA...')
                state.entranceLoadingStatus = LoadingStatuses.error
            }
        },
        [fetchUserData.pending]: (state) =>{
            console.log('START FETCHING USER DATA...')
            state.entranceLoadingStatus = LoadingStatuses.loading;
        },
        [fetchAddNewCar.fulfilled]: (state,action) =>{
            if(action.payload.hasErrors){
                state.carLoadingStatus = LoadingStatuses.error;
                return;
            }
            state.cars = [...state.cars,action.payload.data]
        },
        [fetchAddNewCar.pending]: (state) =>{
            state.carLoadingStatus = LoadingStatuses.loading;
        },
    }

})

export default userSlice.reducer;
export const {setId} = userSlice.actions;