import classes from "./HeaderCardButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../Store/cart-context";

function HeaderCartButton(props) {
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfcartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const [btnHighLighted, setBtnHighLighted] = useState(false);
  // Conditionally adding the bump class when btnHiglighted is true
  const btnClasses = `${classes.button} ${btnHighLighted ? classes.bump : ""}`;

  useEffect(() => {
    // Checks if the items in cart is 0 and breaks the execution.
    if (items.length === 0) {
      return;
    }
    // sets the btnHighlighted to true for items > 0 in the cart.
    setBtnHighLighted(true);

    // timeout is set to remove the btnHighlighted after every 300ms
    const timer = setTimeout(() => {
      setBtnHighLighted(false);
    }, 300);
    // clears timeout for another round of execution.
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfcartItems}</span>
    </button>
  );
}

export default HeaderCartButton;
