import { createContext, useReducer } from "react";

const INITIAL_STATE = {
	city: undefined,
	date: [],
	option: {
		adult: undefined,
		children: undefined,
		room: undefined,
	},
};

export const SearchContext = createContext(null);

const SearchReducer = (state, action) => {
	switch (action.type) {
		case "NEW_SEARCH":
			return action.payload;
		case "RESET_SEARCH":
			return INITIAL_STATE;
		default:
			return state;
	}
};

export const SearchContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
	return <SearchContext.Provider value={{ city: state.city, date: state.date, option: state.option, dispatch }}>{children}</SearchContext.Provider>;
};
