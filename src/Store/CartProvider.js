import { useReducer } from "react";
import CartContext from "./cart-context";

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    /*  logic for checking if there is an existing item and 
        updating the amount. otherwise we add a new item if 
        it doest exist already. */
    // finding the index of the already existing item and storing it in a constant.
    const exisitngCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    // using the index to access the cart item in the array
    const existingCartItem = state.items[exisitngCartItemIndex];
    //we check to see if the item already exist, if does we update the item else we we add as new item.
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      //create a copy of the existing items into a new variable
      updatedItems = [...state.items];
      // we then use the index of the existing cart item to update the item by changing it's amount.
      updatedItems[exisitngCartItemIndex] = updatedItem;
    } else {
      //Add a new item if the item doesn't exist
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    /* The remove item logic checks for item by it's id, if the id
    exist, it then removes one from the amount whiles updating the total
    amount by subtracting the price of the id that is being check. If the
    items are removed to the point where there is no longer an item in the
    cart, we then delete the item from the cart.
     */
    const exisitngCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[exisitngCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;
    if (existingCartItem.amount === 1) {
      /*makes sure that all items that are not equal to the action id 
      are kept. This would filter out anything that has the same id 
      as the item and the action 
      */
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      //copies the state items into a new array.
      updatedItems = [...state.items];
      //using the index, we replace the item that was updated with it's newest version.
      updatedItems[exisitngCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  return defaultCartState;
};

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
