import CartItem from "./CartItem";
import { useGlobalContext } from "./context";

const CartContainer = () => {
  const { totalPrice } = useGlobalContext();
  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <CartItem />
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total
            <span>${totalPrice}</span>
          </h4>
        </div>
        <button className="btn clear-btn">clear cart</button>
      </footer>
    </section>
  );
};

export default CartContainer;
