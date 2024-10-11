import { createSlice } from "@reduxjs/toolkit";


export interface SearchProps {
    searchValue: string;
}

const initialState: SearchProps = {
    searchValue: ''
}
export const searcherSlice = createSlice({
    name: 'searcherSlice',
    initialState,
    reducers: {
        setSearchValue: (state, action) => {
            state.searchValue = action.payload
        }
    }
})

export const {setSearchValue} = searcherSlice.actions
export default searcherSlice.reducer