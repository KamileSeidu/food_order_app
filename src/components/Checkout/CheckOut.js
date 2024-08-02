import CheckOutForm from "./CheckOutForm";

function CheckOut(props) {
  return <CheckOutForm onClose={props.onClose} onSubmit={props.onSubmit} />;
}

export default CheckOut;
