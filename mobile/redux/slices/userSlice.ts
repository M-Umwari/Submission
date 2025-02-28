import { createSlice } from "@reduxjs/toolkit";
import { errorToast, successToast } from "@/utils/toast";
import { changePassword, editProfile, getAllCounselors, getOwnProfile, initializeAuth, login, logout, signUp, submitQuestionnaire } from "../actions/userActions";
import { User } from "@/types/authFormData";


interface InitialState {
    token: string | null,
    user: User | null,
    counselors: User[],
    signUpState: 'successful' | 'failed' | 'idle',
    isLoggingIn: boolean,
    isSigningUp: boolean,
    fetching: boolean,
    initializeStatus: 'idle'|'complete'
    isChangingPassword: boolean,
    changePasswordState: 'idle'| 'successful' | 'failed',
    loading: boolean,
    recommendedGroup: {name:string, id:string} | null,
    status: 'idle'| 'successful' | 'failed'
}

const initialState: InitialState = {
    token: null,
    user: null,
    signUpState: 'idle',
    isLoggingIn: false,
    isSigningUp: false,
    initializeStatus: 'idle',
    counselors: [],
    fetching: false,
    isChangingPassword: false,
    changePasswordState: 'idle',
    loading: false,
    recommendedGroup: null,
    status: 'idle'
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        resetSignUpState: (state) => {
            state.signUpState = 'idle'
        },
        resetInitializeStatus: (state) => {
            state.initializeStatus = 'idle'
        },
        resetChangePasswordStatus: (state) => {
            state.changePasswordState = 'idle'
        },
        resetStatus: (state) => {
            state.status = 'idle'
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(initializeAuth.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.initializeStatus = 'complete'
        })
        .addCase(initializeAuth.rejected, (state) => {
            state.token = null;
            state.user = null;
            state.initializeStatus = 'complete'
        })
        .addCase(logout.fulfilled, (state) => {
            state.token = null;
            state.user = null;
        })
        .addCase(logout.rejected, (_, action) => {
            errorToast(action.payload as string)
        })
        .addCase(signUp.pending, (state) => {
            state.isSigningUp = true
        })
        .addCase(signUp.fulfilled, (state, action) => {
            state.isSigningUp = false
            state.signUpState = 'successful'
            successToast(action.payload.message!)
        })
        .addCase(signUp.rejected, (state, action) => {
            state.isSigningUp = false
            state.signUpState = 'failed'
            errorToast(action.payload as string)
        })
        .addCase(login.pending, (state) => {
            state.isLoggingIn = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.token = action.payload.token!
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoggingIn = false
            errorToast(action.payload as string)
        })
        .addCase(getOwnProfile.fulfilled, (state, action) => {
            state.isLoggingIn = false
            state.user = action.payload
            successToast('Login successful')
        })
        .addCase(getOwnProfile.rejected, (state, action) => {
            state.isLoggingIn = false
            errorToast(action.payload as string)
        })
        .addCase(getAllCounselors.pending, (state) => {
            state.fetching = true
        })
        .addCase(getAllCounselors.fulfilled, (state, action) => {
            state.fetching = false
            state.counselors = action.payload
        })
        .addCase(getAllCounselors.rejected, (state, action) => {
            state.fetching = false
            errorToast(action.payload as string)
        })
        .addCase(changePassword.pending, (state, action) => {
            state.isChangingPassword = true
        })
        .addCase(changePassword.fulfilled, (state, action) => {
            state.isChangingPassword = false
            state.changePasswordState = 'successful'
            successToast(action.payload.message as string)
        })
        .addCase(changePassword.rejected, (state, action) => {
            state.isChangingPassword = false
            state.changePasswordState = 'failed'
            errorToast(action.payload as string)
        })
        .addCase(editProfile.pending, (state, action) => {
            state.loading = true
        })
        .addCase(editProfile.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            successToast('Profile updated successfully')
        })
        .addCase(editProfile.rejected, (state, action) => {
            state.loading = false
            errorToast(action.payload as string)
        })
        .addCase(submitQuestionnaire.pending, (state) => {
            state.loading = true
        })
        .addCase(submitQuestionnaire.fulfilled, (state, action) => {
            state.loading = false
            state.recommendedGroup = action.payload.supportGroup
            if(state.user){
                state.user = {...state.user, hasTakenQuestionnaire: true}
            }
            state.status = 'successful'
        })
        .addCase(submitQuestionnaire.rejected, (state, action) => {
            state.loading = false
            state.status = 'failed'
            errorToast(action.payload as string)
        })
    }
})

export const {resetSignUpState, resetInitializeStatus, resetChangePasswordStatus, resetStatus} = userSlice.actions
export default userSlice.reducer