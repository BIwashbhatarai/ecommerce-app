import { useEffect, useState } from "react";
import { createContext } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext()

const ShopContextProvider = (props) => {

    const currency = "$";
    const deliveryFee = 10;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItem, setCartItem] = useState({});
    const navigate = useNavigate();

    const addToCart = async(itemId , size) => {
        let cartData = structuredClone(cartItem)

        if(!size) {
            toast.error("Please Select the size");
            return;
        }

        if (cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1;
        }
        setCartItem(cartData);
    }

    const getCartCount = () => {
        let totalCount = 0;

        for(const items in cartItem) {
            for(const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalCount += cartItem[items][item];
                    }

                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount
    }

    const updateQuantity = async(itemId, size, quantity) =>  {
        let cartData = structuredClone(cartItem);

        cartData[itemId][size] = quantity;

        setCartItem(cartData);

    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItem) {
            let productInfo = products.find((product) => product._id === items);
            for (const item in cartItem[items]) {
                try {
                    if(cartItem[items][item] > 0) {
                        totalAmount += productInfo.price * cartItem[items][item]
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        return totalAmount
    } 

         
    // useEffect(() => {
    //     console.log(cartItem);
    // }, [cartItem])
    const value = {
        products , 
        currency, 
        deliveryFee , 
        search, 
        setSearch, 
        showSearch, 
        setShowSearch, 
        cartItem, 
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider