import { createContext, useContext, useState } from "react";
import data from "./data";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(data);
  const [cartAmount, setCartAmount] = useState(4);

  const increment = (id) => {
    let product = products.find((item) => item.id === id);
    product.amount += 1;

    // setProducts(products); -> This wasn't re-rendereing the component as its reference is not chandging, only it's values are changing, for which useState was not considering it as a state change, so it was not triggering re-render

    // let p1 = [...products]; // here reference is changing
    // let p2 = products;      // here no reference change, the same reference is getting copied.
    // console.log(p1);
    // console.log(p2);
    // console.log(p1 === p2); // fasle as both reference are different

    // setProducts(p) -> reference not changing hence state not re-rendering

    setProducts([...products]);
    addToCart();
  };

  const decrement = (id) => {
    let product = products.find((item) => item.id === id);
    if (product.amount !== 0) product.amount -= 1;
    setProducts([...products]);
    addToCart();
  };

  const addToCart = () => {
    const totalItems = products.reduce((totalValue, currentProduct) => {
      return totalValue + currentProduct.amount;
    }, 0);

    setCartAmount(totalItems);
  };

  const value = { products, increment, decrement, cartAmount };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppContext;
