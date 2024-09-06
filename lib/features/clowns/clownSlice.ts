import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Clown  = {
    name: string,
    description: string,
    id:number,
    imgPath: string
}

export interface ClownState {
    clownsList : Clown[],
    SelectedClown: number,
    nextId:number,
}

const initialState = {
    clownsList : [{
        name:"Hello World",
        description:"A hello World Clown for new comer!",
        id: 0,
        imgPath:"/clown1.jpg",
    },{
        name:"Hello World",
        description:"A hello World Clown for new comer!",
        id: 1,
        imgPath:"/clown2.jpg",
    }],
    selectedClown: 0,
    nextId: 1,
}

export  const clownsSlice = createSlice({
    name:"clowns",
    initialState,
    reducers:{
        clownsAdded(state,action: PayloadAction<Clown>){
            state.clownsList.push(action.payload);
        },
        clownDeleted(state,action: PayloadAction<number>){
            state.clownsList.splice(action.payload,1);
        }
    }
}) 

export const {clownsAdded,clownDeleted} = clownsSlice.actions;

export default clownsSlice.reducer;