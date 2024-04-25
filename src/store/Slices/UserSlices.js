import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    login: false,
    token: null,
    data: null,
    likes : 0
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        isLogin: (state, {payload}) =>{
            state.login = true
            state.token = payload
        },
        
        isLogout: (state) =>{
            state.login = false
            state.data = null
            state.token = null
        },

        userInfo: (state, {payload}) =>{
            state.data =  payload
        },

        TotalLikes: (state, {payload}) =>{
            state.likes = payload
        },

        updateLikes: (state) =>{
            state.likes--
        }
        
        
      
    }
})

export const { isLogin, isLogout, userInfo, TotalLikes, updateLikes } = userSlice.actions
export default userSlice.reducer