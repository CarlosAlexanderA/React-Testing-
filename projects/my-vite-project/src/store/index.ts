import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersReducer, { rollbackUser } from "./users/slice";

const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);
		localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
	};
const syncWithDataBaseMiddleware: Middleware =
	(store) => (next) => (action) => {
		const { type, payload } = action;
		const previousState = store.getState();
		next(action); // <- aqui ocurre la magia

		if (type === "users/deleteUserById") {
			const userIdToRemove = payload;
			console.log(userIdToRemove);

			const userToRemove = previousState.users.find(
				(user) => user.id === userIdToRemove,
			);
			console.log(previousState);

			fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
				method: "DELETE",
			})
				.then((res) => {
					if (res.ok) {
						toast.warning(`Usuario ${userIdToRemove} eliminado correctamente`);
					}
					// throw new Error("Error to delete user");
				})
				.catch((err) => {
					toast.error(`Error deleteing user ${userIdToRemove}`);
					if (userToRemove) store.dispatch(rollbackUser(userToRemove));
					console.log(err);
					console.log("error delete user");
				});
		}

		if (type === "users/addNewUser") {
			fetch("https://jsonplaceholder.typicode.com/users/", {
				method: "POST",
			})
				.then((res) => {
					if (res.ok) {
						toast.success(`Usuario ${payload.name} agregado correctamente`);
					}
				})
				.catch((err) => {
					console.log(err);
					console.log("error add to user");
				});
		}
	};
export const store = configureStore({
	reducer: { users: usersReducer },
	middleware: [persistanceLocalStorageMiddleware, syncWithDataBaseMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
