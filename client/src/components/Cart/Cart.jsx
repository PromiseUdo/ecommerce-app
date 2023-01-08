import React, { useState } from "react";
import "./Cart.scss";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { PaystackButton } from "react-paystack";
import { applyMiddleware } from "redux";

const Cart = () => {
  const publicKey = "pk_test_959ef75eab6e12f94adccad2d3d29af3c7cb0cb9";

  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => (total += item.quantity * item.price));
    return total.toFixed(2);
  };

  const amount = totalPrice()*100;
  const [email, setEmail] = useState("info.promiseudo@gmail.com");
  const [name, setName] = useState("Promise Udo");
  const [phone, setPhone] = useState("08071287485");

  const resetForm = () => {
    setEmail("");
    setName("");
    setPhone("");
  };

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "PAY NOW",
    onSuccess: ({ reference }) => {
      alert(
        `Your purchase was successful! Transaction reference: ${reference}`
      );
      dispatch(resetCart())
    },
  };

  return (
    <div className="cart">
      <h1>Products in your cart </h1>
      {products?.map((item) => (
        <div className="item" key={item.id}>
          <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt="" />
          <div className="details">
            <h1>{item.title?.substring(0, 10) + "..."}</h1>
            <p>{item.desc?.substring(0, 15) + "..."}</p>
            <div className="price">
              {item.quantity} x ₦{item.price}
            </div>
          </div>
          <DeleteOutlineIcon
            className="delete"
            onClick={() => dispatch(removeItem(item.id))}
          />
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>₦{totalPrice()}</span>
      </div>
      <PaystackButton className="paystack-button" {...componentProps} />

      {/* <button>PAY NOW</button> */}
      <span className="reset" onClick={() => dispatch(resetCart())}>
        Reset Cart
      </span>
    </div>
  );
};

export default Cart;
