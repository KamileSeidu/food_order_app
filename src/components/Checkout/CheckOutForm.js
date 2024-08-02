import { useRef, useState } from "react";
import classes from "./CheckOutForm.module.css";

function CheckOutForm(props) {
  const firstnameInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();

  // Functions to validate the user input
  const isEmpty = (value) => {
    return value.trim().length === 0;
  };
  const isTenDigit = (value) => {
    return value.trim().length === 10;
  };
  const isValidEmail = (value) => {
    return value.trim().includes("@");
  };

  // states to handle to render error messages
  const [formValidity, setFormValidity] = useState({
    name: true,
    email: true,
    number: true,
  });

  // Form submission handler
  const formSubmitHandler = (event) => {
    event.preventDefault();

    const firstName = firstnameInputRef.current.value;
    const email = emailInputRef.current.value;
    const phoneNumber = phoneInputRef.current.value;

    //validation of the entered values
    const nameIsValid = !isEmpty(firstName);
    const numberIsValid = isTenDigit(phoneNumber);
    const emailIsValid = isValidEmail(email);

    setFormValidity({
      name: nameIsValid,
      email: emailIsValid,
      number: numberIsValid,
    });

    // overall form validity
    const formIsValid = nameIsValid && numberIsValid && emailIsValid;

    if (!formIsValid) {
      return;
    }

    props.onSubmit({ firstName, email, phoneNumber });

    firstnameInputRef.current.value = "";
    emailInputRef.current.value = "";
    phoneInputRef.current.value = "";
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={classes["first-name"]}>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" ref={firstnameInputRef} />
        {!formValidity.name && <p>please input a valid user name</p>}
      </div>
      <div className={classes["last-name"]}>
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" ref={emailInputRef} />
        {!formValidity.email && <p>please input valid a user name</p>}
      </div>
      <div className={classes.phone}>
        <label htmlFor="phone">Phone</label>
        <input type="number" id="phone" ref={phoneInputRef} />
        {!formValidity.number && <p>please input valid a user number</p>}
      </div>
      <button onClick={props.onClose} className={classes["btn--primary"]}>
        Close
      </button>
      <button className={classes.btn}>Submit</button>
    </form>
  );
}

export default CheckOutForm;
