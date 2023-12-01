import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export type UserId = string;

const DEFAULT_STATE = [
	{
		id: "1",
		name: "Peter Doe",
		email: "peter@gmail.com",
		github: "peter",
	},
	{
		id: "2",
		name: "Lena Whitehouse",
		email: "lena_whitehouse@gmail.com",
		github: "lena",
	},
	{
		id: "3",
		name: "Phil Less",
		email: "lessPhil@gmail.com",
		github: "phil",
	},
	{
		id: "4",
		name: "Miguel Angel Duran",
		email: "midudev@gmail.com",
		github: "midudev",
	},
];

export interface User {
	name: string;
	email: string;
	github: string;
}
export interface UserWithId extends User {
	id: UserId;
}

const initialState: UserWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	if (persistedState) return JSON.parse(persistedState).users;

	return DEFAULT_STATE;
})();

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
	},
});

export default userSlice.reducer;

export const { deleteUserById } = userSlice.actions;
