import React, { useState, useEffect } from "react";
import "./state.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Heart, ShoppingCart, CheckCircle } from "lucide-react";

const stateLinks = {
  "TS & AP":
    "https://raw.githubusercontent.com/BojanapalliRajyaLaxmi/vindhudata/master/data/ts&ap.json",
  Kerala:
    "https://raw.githubusercontent.com/BojanapalliRajyaLaxmi/vindhudata/master/data/kerala.json",
  Tamilnadu:
    "https://raw.githubusercontent.com/BojanapalliRajyaLaxmi/vindhudata/master/data/tamilnadu.json",
  Haryana:
    "https://raw.githubusercontent.com/BojanapalliRajyaLaxmi/vindhudata/master/data/haryana.json",
  Punjab:
    "https://raw.githubusercontent.com/BojanapalliRajyaLaxmi/vindhudata/master/data/punjab.json",
  Uttarakhand:
    "https://raw.githubusercontent.com/BojanapalliRajyaLaxmi/vindhudata/master/data/uttarakhand.json",
  Maharashtra:
    "https://raw.githubusercontent.com/BojanapalliRajyaLaxmi/vindhudata/master/data/maharastra.json",
  Rajasthan:
    "https://raw.githubusercontent.com/BojanapalliRajyaLaxmi/vindhudata/master/data/rajasthan.json",
};
const foodTypes = ["All", "Vegetarian", "Non-Vegetarian"];
const State = () => {
  const [stateData, setStateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedState, setSelectedState] = useState("TS & AP");
  const [selectedFoodType, setSelectedFoodType] = useState("All");

  useEffect(() => {
    fetchWishlist();
    fetchStateData("TS & AP");
    fetchCart();
  }, []);

  const fetchStateData = async (state) => {
    setLoading(true);
    setError(null);
    setStateData(null);
    setSelectedState(state);

    try {
      const response = await fetch(stateLinks[state]);
      if (!response.ok) throw new Error("Failed to fetch data.");
      let data = await response.json();
      if (!Array.isArray(data) || data.length < 2) {
        throw new Error("Invalid data structure.");
      }
      const correctedData = {
        vegetarian: data[0]?.vegetarian || [],
        "non-vegetarian":
          data[1]?.["non-vegetarian"] || data[1]?.["Non-vegetarian"] || [],
      };
      setStateData(correctedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    const token = localStorage.getItem("tokenlogin");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:3002/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setWishlist(data.wishlist || []);
      }
    } catch (error) {
      console.error("Error fetching wishlist", error);
    }
  };

  const toggleWishlist = async (dish) => {
    const token = localStorage.getItem("tokenlogin");
    if (!token) return;
    try {
      await fetch("http://localhost:3002/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ dish }),
      });
      fetchWishlist();
    } catch (error) {
      console.error("Error updating wishlist", error);
    }
  };

  const fetchCart = async () => {
    const token = localStorage.getItem("tokenlogin");
    if (!token) {
      console.error("No token found!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/cart", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response Status:", response.status);

      if (!response.ok) {
        console.error("Unauthorized or failed request!");
        return;
      }

      const data = await response.json();
      console.log("Cart Data Received:", data); // 🔍 Debugging log

      setCart(data.cart || []);
    } catch (error) {
      console.error("Error fetching cart", error);
    }
  };

  const addToCart = async (dish) => {
    const token = localStorage.getItem("tokenlogin");
    if (!token) return;
    try {
      await fetch("http://localhost:3002/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ dish }),
      });
      fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleRemoveFromCart = async (dish) => {
    const token = localStorage.getItem("tokenlogin");
    if (!token) {
      console.error("User not authenticated!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ dish }),
      });
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Expected JSON but got ${contentType}`);
      }

      const data = await response.json();
      if (!response.ok) {
        console.error(
          "Failed to remove from cart:",
          data.message || "Unknown error"
        );
        return;
      }

      console.log("Cart after removal:", data.cart);
      setCart(data.cart);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };
  const filteredDishes =
    selectedFoodType === "All"
      ? [
          ...(stateData?.vegetarian || []),
          ...(stateData?.["non-vegetarian"] || []),
        ]
      : selectedFoodType === "Vegetarian"
      ? stateData?.vegetarian || []
      : stateData?.["non-vegetarian"] || [];

  return (
<div className="App">
  {/* Fixed Sidebar */}
  <div className="sidebar">
    <div className="filter-container">
      <label>Filter by Food Type:</label>
      <select
        className="food-filter"
        value={selectedFoodType}
        onChange={(e) => setSelectedFoodType(e.target.value)}
      >
        {foodTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>

    <div className="states-container">
      {Object.keys(stateLinks).map((state, index) => (
        <button
          key={index}
          className={`state-box ${selectedState === state ? "active" : ""}`}
          onClick={() => fetchStateData(state)}
        >
          {state}
        </button>
      ))}
    </div>
  </div>

  {/* Main Content - Push Right */}
  <div className="state-info">
    {loading && <p>Loading...</p>}
    {error && <p style={{ color: "red" }}>{error}</p>}
    
    {stateData && (
      <div className="dishes-container">
        <h1>{selectedState} Special Dishes</h1>
        <h2>{selectedFoodType} Dishes</h2>
        <div className="dish-list">
          {filteredDishes.map((dish, index) => (
            <article key={index} className="dish-card">
              <img
                className="dish-card__background"
                src={
                  dish.image?.trim()
                    ? dish.image
                    : "https://img.freepik.com/free-psd/delicious-chicken-biryani-bowl-transparent-background_84443-26601.jpg"
                }
                alt={dish.name}
              />
              <div className="dish-card__content">
                <h3 className="dish-card__title">{dish.name}</h3>
                <p><strong>Description:</strong> {dish.description}</p>
                <p><strong>Ingredients:</strong> {dish.ingredients?.join(", ") || "N/A"}</p>
                <p><strong>Price:</strong> ₹{dish.price || "N/A"}</p>
                <p><strong>Rating:</strong> ⭐{dish.rating || "N/A"}</p>
                <div className="dish-icons">
                      {wishlist.some((item) => item.name === dish.name) ? (
                        <img
                          src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-64.png"
                          alt="Red Heart"
                          className="icon wishlist-icon"
                          onClick={() => toggleWishlist(dish)}
                          style={{
                            width: "30px",
                            height: "30px",
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <img
                          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-heart-64.png"
                          alt="Black Heart"
                          className="icon wishlist-icon"
                          onClick={() => toggleWishlist(dish)}
                          style={{
                            width: "30px",
                            height: "30px",
                            cursor: "pointer",
                          }}
                        />
                      )}
                      {cart.some((item) => item.name === dish.name) ? (
                        <img
                          src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-64.png"
                          alt="Tick"
                          className="icon cart-icon"
                          style={{ width: "30px", height: "30px" }}
                        />
                      ) : (
                        <img
                          src="https://cdn1.iconfinder.com/data/icons/material-core/20/shopping-cart-64.png"
                          alt="Cart"
                          className="icon cart-icon"
                          onClick={() => addToCart(dish)}
                          style={{
                            width: "30px",
                            height: "30px",
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </div>

              </div>
            </article>
          ))}
        </div>
      </div>
    )}
  </div>
</div>


  );
};

export default State;
