import CartItem from "./CartItem";
import { useGlobalContext } from "./context";

const CartContainer = () => {
  const { totalPrice, clearCart, products } = useGlobalContext();
  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
        {products.length === 0 && (
          <h4 className="empty-cart">is currently empty</h4>
        )}
      </header>
      {products.length !== 0 && (
        <>
          <CartItem />
          <footer>
            <hr />
            <div className="cart-total">
              <h4>
                total
                <span>${totalPrice}</span>
              </h4>
            </div>
            <button className="btn clear-btn" onClick={clearCart}>
              clear cart
            </button>
          </footer>
        </>
      )}
    </section>
  );
};

export default CartContainer;
