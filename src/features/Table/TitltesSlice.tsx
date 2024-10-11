
import { createSlice } from "@reduxjs/toolkit"

export interface HeaderTitlesProps {
    label: string,
    value: string
}

export interface TableHeaderProps {
    headerTitles: HeaderTitlesProps[], // Cambio sugerido: labelsAndValues -> ColumnHeader
}

const initialState: HeaderTitlesProps[] = []

export const titlesSlices = createSlice({
    name: 'headerTitles',
    initialState,
    reducers: {
        converter: (state, action) => {
            return action.payload
        }
    }
})

export const { converter } = titlesSlices.actions
export default titlesSlices.reducer