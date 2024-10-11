import { createSlice } from "@reduxjs/toolkit";

export interface ColumnSortState {
    sorted: {
        attribute: string,
        order: string
    }
}

const initialState = {
    sorted: {
        attribute: 'updatedAt',
        order: 'desc'
    }
}

const columnOrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        sortedColumns: (state, action) => {
            state.sorted.attribute = action.payload.attribute
            state.sorted.order = action.payload.order
        }
    }

})

export const { sortedColumns } = columnOrderSlice.actions
export default columnOrderSlice.reducer