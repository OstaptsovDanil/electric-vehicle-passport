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
            const token = await  AsyncStorage.getItem('token');
            if(!token)
            {
                for(let field in state){
                    state[field] = initialState[field];
                }
                return;
            }
            try{
                const payload = jwtDecode(token);
                if(payload){
                    state.userId = payload.userId;
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
                const {email,fullName,cars,mobilePhone} = action.payload;
                state.email = email;
                state.fullName = fullName;
                state.cars = [...cars];
                state.mobilePhone = mobilePhone;
                console.log('STATE USER : ',action.payload)
            }
            catch(e){
                state.entranceLoadingStatus = LoadingStatuses.error
            }
        },
        [fetchUserData.pending]: (state) =>{
            state.entranceLoadingStatus = LoadingStatuses.loading;
        },
        [fetchAddNewCar.fulfilled]: (state,action) =>{
            state.carLoadingStatus = LoadingStatuses.idle;
            state.cars = [...state.cars,action.payload]
        },
        [fetchAddNewCar.pending]: (state) =>{
            state.carLoadingStatus = LoadingStatuses.loading;
        },
    }

})

export default userSlice.reducer;
