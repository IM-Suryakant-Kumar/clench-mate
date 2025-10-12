import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
	showModal: boolean;
	UpdateModalId: string;
}

const initialState: ModalState = {
	showModal: false,
	UpdateModalId: "",
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		toggleModal: (state, action) => {
			state.showModal = !state.showModal;
			state.UpdateModalId = action.payload;
		},
	},
});

export const { toggleModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
