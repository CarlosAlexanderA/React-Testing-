export const cartInitialState =
  JSON.parse(window.localStorage.getItem('cart')) || [];

// update localStorage with state for cart

const updateLocalStorage = (state) => {
  window.localStorage.setItem('cart', JSON.stringify(state));
};

// para testear solo necesita,mos llamar a esta funcion y no al compoenet completo
export function cartReducer(state, action) {
  const { type: actionType, payload: actionPayload } = action;

  switch (actionType) {
    case 'ADD_TO_CART': {
      const { id } = actionPayload;
      const productInCartIndex = state.findIndex((item) => item.id === id);

      if (productInCartIndex >= 0) {
        // 👀 una forma sería usando structuredClone
        // const newState = structuredClone(state)
        // newState[productInCartIndex].quantity += 1

        // 👶 usando el map 👶
        // const newState = state.map(item => {
        //   if (item.id === id) {
        //     return {
        //       ...item,
        //       quantity: item.quantity + 1
        //     }
        //   }

        //   return item
        // })

        // mas rapido usando el spread operator y slice
        const newState = [
          ...state.slice(0, productInCartIndex),
          {
            ...state[productInCartIndex],
            quantity: state[productInCartIndex].quantity + 1,
          },
          ...state.slice(productInCartIndex + 1),
        ];

        updateLocalStorage(newState);
        return newState;
      }
      const newState = [...state, { ...actionPayload, quantity: 1 }];
      updateLocalStorage(newState);
      return newState;
    }
    case 'REMOVE_FROM_CART': {
      const { id } = actionPayload;
      const newState = state.filter((item) => item.id !== id);
      updateLocalStorage(newState);
      return newState;
    }
    case 'CLEAR_CART': {
      updateLocalStorage(cartInitialState);
      return cartInitialState;
    }
    default:
      break;
  }
}
