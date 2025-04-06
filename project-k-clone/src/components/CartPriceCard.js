import { useCart } from "../context/cart-context";
import { Link, useLocation } from "react-router-dom";
import { useAddress } from "../context/address-context";

export const CartPriceCard = () => {
  const { cartState } = useCart();
  const { addressState } = useAddress();
  const location = useLocation();

  // Price calculations
  const totalPrice = () => cartState.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalOldPrice = () => cartState.cartItems.reduce((sum, item) => sum + (item.price_old || item.price) * item.quantity, 0);
  const deliveryCharge = () => totalPrice() > 499 ? 0 : 100;

  return (
    <div className="price-summary">
      <h3>Price Details</h3>
      <div className="price-item">
        <span>Total Items: {cartState.cartItems.length}</span>
      </div>
      <div className="price-item">
        <span>Original Price: ₹{totalOldPrice()}</span>
      </div>
      <div className="price-item">
        <span>Delivery Charge: ₹{deliveryCharge()}</span>
      </div>
      <div className="price-item total">
        <span>Total: ₹{totalPrice() + deliveryCharge()}</span>
      </div>
      {location.pathname === "/cart" ? (
        <Link to="/checkout" className="btn-checkout">
          Proceed to Checkout
        </Link>
      ) : addressState.addressSelectedId ? (
        <button className="btn-order">Place Order</button>
      ) : (
        <p className="error">Please select a delivery address</p>
      )}
    </div>
  );
};

// Default export for backward compatibility
export default CartPriceCard;
