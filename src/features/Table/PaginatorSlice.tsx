import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pagination } from "../../types";

const initialState: Pagination = {

    currentCount: 1,
    totalCount: 1,
    page: 1,
    items: 4,
    totalPage: 1,
};

export const paginatorSlice = createSlice({
    name: "paginatorSlice",
    initialState,
    reducers: {
        setPagination: (state, action: PayloadAction<Pagination>) => {
            const { currentCount, totalCount, page, totalPage, items } = action.payload;

            state.currentCount = currentCount;
            state.totalCount = totalCount;
            state.page = page;
            state.totalPage = totalPage;
            state.items = items;
        },
    },
});

export const { setPagination } = paginatorSlice.actions;

export default paginatorSlice.reducer;
