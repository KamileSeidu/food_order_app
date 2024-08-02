import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import { Fragment, useContext, useState } from "react";
import CartContext from "../../Store/cart-context";
import CheckOut from "../Checkout/CheckOut";
import useHttp from "../../hooks/httpRequest";

function Cart(props) {
  const cartCtx = useContext(CartContext);
  const {
    isLoading: isSubmiting,
    error,
    isSubmitted,
    sendRequest: sendData,
  } = useHttp();
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const [isOrdering, setIsOrdering] = useState(false);
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    /*
    The reason the entire item object is copied using the spread operator ({ ...item }) 
    before adding it to the cart context is to ensure immutability. In React, it's generally 
    recommended to treat state and state updates as immutable. Modifying the existing state 
    directly can lead to unexpected behavior, such as not triggering re-renders when the state 
    changes. By spreading the item object, a new object is created with all the properties of 
    item, and then amount: 1 is added to this new object. This ensures that the original item 
    object remains unchanged, and a new object with the desired modifications is passed to 
    cartCtx.addItem. Additionally, by setting the amount to 1, the function indicates that 
    the default quantity for the added item is 1. This allows for consistent behavior when 
    adding items to the cart, ensuring that each added item starts with a quantity of 1 unless 
    explicitly specified otherwise.
     */
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          /* In React, when you need to pass parameters to event handlers such as onClick, you 
          have a couple of options. One common approach is to use the bind method to create a 
          new function with the parameters bound to it. */
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  // http request to send data to the database
  const CheckOutData = async (userData) => {
    // console.log(userData);
    sendData({
      url: "https://foodorder-67be1-default-rtdb.asia-southeast1.firebasedatabase.app/checkout.json",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: {
        cartItem: cartCtx.items,
        userFormData: userData,
      },
    });
    cartCtx.clearCart();
  };

  // console.log(error);

  // conditional display of chekout
  const onOrder = () => {
    setIsOrdering(true);
  };

  // helper constant for modal content
  const modalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isOrdering && (
        <CheckOut onClose={props.onClose} onSubmit={CheckOutData} />
      )}
      {!isOrdering && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button onClick={onOrder} className={classes.button}>
              Order
            </button>
          )}
        </div>
      )}
    </Fragment>
  );

  // helper constant for display of submitted data and error
  const submittedData = (
    <Fragment>
      <p>Your order has been submitted successfully!</p>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
    </Fragment>
  );

  // const errorMessage = (
  //   <Fragment>
  //     <p>Sorry, Something went wrong</p>
  //     <button className={classes["button--alt"]} onClick={props.onClose}>
  //       Close
  //     </button>
  //   </Fragment>
  // );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmiting && !error && modalContent}
      {isSubmiting && <p>Submitting your Order...</p>}
      {/* {error && errorMessage} */}
      {isSubmitted && submittedData}
    </Modal>
  );
}

export default Cart;
