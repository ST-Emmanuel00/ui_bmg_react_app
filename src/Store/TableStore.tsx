import { configureStore } from "@reduxjs/toolkit";

import titlesSlices from "../features/Table/TitltesSlice";
import orderColumns from "../features/Table/ColumOrderSlice";

import searcherSlice from "../features/Table/SearcherSlice";
import paginatorSlice from "../features/Table/PaginatorSlice";



export const tableStore = configureStore({
    reducer: {
        headerTitles: titlesSlices,
        orderColumns: orderColumns,
        searcher: searcherSlice,
        pagination: paginatorSlice
    }
})

export type RootState = ReturnType<typeof tableStore.getState>
