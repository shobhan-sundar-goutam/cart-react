import { createContext, useContext, useEffect, useState } from "react";

const url = "https://course-api.com/react-useReducer-cart-project";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartAmount, setCartAmount] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [loading, setLoading] = useState(true);

  const increment = (id) => {
    const product = products.find((item) => item.id === id);
    product.amount += 1;

    // setProducts(products); -> This wasn't re-rendereing the component as its reference is not chandging, only it's values are changing, for which useState was not considering it as a state change, so it was not triggering re-render

    // let p1 = [...products]; // here reference is changing
    // let p2 = products;      // here no reference change, the same reference is getting copied.
    // console.log(p1);
    // console.log(p2);
    // console.log(p1 === p2); // fasle as both reference are different

    // setProducts(p) -> reference not changing hence state not re-rendering

    setProducts([...products]);
  };

  const decrement = (id) => {
    const product = products.find((item) => item.id === id);
    if (product.amount !== 0) product.amount -= 1;
    if (product.amount === 0) {
      return remove(id);
    }
    setProducts([...products]);
  };

  const remove = (id) => {
    const newList = products.filter((product) => product.id !== id);
    setProducts(newList);
  };

  const clearCart = () => {
    setProducts([]);
  };

  const addToCart = () => {
    const totalItems = products.reduce((totalValue, currentProduct) => {
      return totalValue + currentProduct.amount;
    }, 0);
    setCartAmount(totalItems);
  };

  const totaBill = () => {
    let totalBillAmount = products
      .map((product) => {
        return product.amount * product.price;
      })
      .reduce((x, y) => x + y, 0);
    totalBillAmount = parseFloat(totalBillAmount.toFixed(2));
    setTotalPrice(totalBillAmount);
  };

  const fetchData = async () => {
    const response = await fetch(url);
    const cart = await response.json();
    setLoading(false);
    setProducts(cart);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    addToCart();
    totaBill();
  });

  const value = {
    products,
    increment,
    decrement,
    cartAmount,
    totalPrice,
    remove,
    clearCart,
    loading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppContext;
