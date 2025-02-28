import { createSlice } from "@reduxjs/toolkit";
import { createGroup, getGroups, joinGroup, leaveGroup } from "../actions/groupActions";
import { errorToast } from "@/utils/toast";
import { Group } from "@/types/Group";

interface IinitialState {
    groups: Group[],
    fetching: boolean,
    loading: boolean,
    status: 'idle'|'successful'|'failed',
    createStatus: 'idle'|'successful'|'failed'
};

const groupSlice = createSlice({
    name: "group",
    initialState:{
        groups: [],
        fetching: false,
        loading: false,
        status:'idle',
        createStatus: 'idle'
    } as IinitialState,
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle'
        },
        resetCreateStatus: (state) => {
            state.createStatus = 'idle'
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGroup.pending, (state) => {
                state.loading = true
            })
            .addCase(createGroup.fulfilled, (state, action) => {
                state.loading = false
                state.groups = [...state.groups, action.payload]
                state.createStatus = 'successful'
            })
            .addCase(createGroup.rejected, (state, action) => {
                state.loading = false;
                state.createStatus = 'failed'
                errorToast(action.payload as string);
            })

            .addCase(getGroups.pending, (state) => {
                state.fetching = true
            })
            .addCase(getGroups.fulfilled, (state, action) => {
                state.fetching = false
                state.groups = action.payload
            })
            .addCase(getGroups.rejected, (state, action) => {
                state.fetching = false
                errorToast(action.payload as string);
            })

            .addCase(joinGroup.pending, (state) => {
                state.loading = true
            })
            .addCase(joinGroup.fulfilled, (state, action) => {
                state.loading = false
                state.groups = state.groups.map((group) =>
                    group.id === action.payload.id ? action.payload : group
                );
                state.status = 'successful'
            })
            .addCase(joinGroup.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                errorToast(action.payload as string);
            })

            .addCase(leaveGroup.pending, (state) => {
                state.loading = true
            })
            .addCase(leaveGroup.fulfilled, (state, action) => {
                state.loading = false
                state.groups = state.groups.map((group) =>
                    group.id === action.payload.id ? action.payload : group
                );
            })
            .addCase(leaveGroup.rejected, (state, action) => {
                state.loading = false
                errorToast(action.payload as string);
            })
    },
});

export const {resetStatus, resetCreateStatus} = groupSlice.actions
export default groupSlice.reducer;