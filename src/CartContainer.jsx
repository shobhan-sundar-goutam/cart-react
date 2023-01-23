import CartItem from "./CartItem";

const CartContainer = () => {
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
            <span>$2199.96</span>
          </h4>
        </div>
        <button className="btn clear-btn">clear cart</button>
      </footer>
    </section>
  );
};

export default CartContainer;
