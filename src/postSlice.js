import {createSlice} from '@reduxjs/toolkit'

export const postSlice = createSlice({
    name:'posts',
    initialState:{
        data:[],
        loading:true,
        currentPage:1,
    },
    reducers:{
        setPosts:(state, action)=>{
            state.data = action.payload;
            state.loading=false;
        },
        setCurrentPage:(state, action)=>{
            state.currentPage = action.payload
        },
        removePost:(state,action)=>{
            state.data = state.data.filter(post =>post.id !== action.payload);
            state.currentPage =1
        }
    }
})

export const {setPosts, setCurrentPage, removePost} = postSlice.actions;

export const selectPosts = state => state.posts;

export default postSlice.reducer;