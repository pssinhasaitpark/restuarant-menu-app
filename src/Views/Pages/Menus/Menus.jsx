import React, { useEffect, useState } from "react";
import {
  FaArrowUp,
  FaStar,
  FaLeaf,
  FaDrumstickBite,
  FaSearch,
  FaFilter,
  FaShoppingCart,
  FaTrash,
  FaTimes,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMenuByRestaurantId,
  clearMenu,
} from "../../Redux/Slice/menuSlice/menuSlice";
import { photo7 } from "../../../assets";

const Menus = ({
  restaurantId,
  onAddMenuItem,
  selectedMenuItems,
  onRemoveMenuItem,
  onUpdateItemQuantity
}) => {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu.categories);
  const menuStatus = useSelector((state) => state.menu.status);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [showButton, setShowButton] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [vegFilter, setVegFilter] = useState(false);
  const [nonVegFilter, setNonVegFilter] = useState(false);
  const [bestSellerFilter, setBestSellerFilter] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCartDetails, setShowCartDetails] = useState(false);

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchMenuByRestaurantId(restaurantId));
    }

    return () => {
      dispatch(clearMenu());
    };
  }, [restaurantId, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(
        document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const newQuantities = {};
    selectedMenuItems.forEach(item => {
      newQuantities[item.id] = item.quantity;
    });
    setQuantities(newQuantities);
  }, [selectedMenuItems]);


  useEffect(() => {
    const items = Object.entries(quantities)
      .filter(([_, quantity]) => quantity > 0)
      .map(([productId, quantity]) => {
        const allProducts = menu.flatMap((category) => category.menu_items);
        const product = allProducts.find((item) => item.id === productId);
        if (!product) return null;

        return {
          id: productId,
          name: product.item_name,
          price: parseFloat(product.item_price) || 0,
          quantity,
          image: product.images[0],
          total: (parseFloat(product.item_price) || 0) * quantity,
        };
      })
      .filter(Boolean);

    setCartItems(items);
    setShowCart(items.length > 0);
  }, [quantities, menu]);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const updateQuantity = (productId, amount) => {
    const currentQuantity = quantities[productId] || 0;
    const newQuantity = Math.max(currentQuantity + amount, 0);
  
    setQuantities(prev => ({
      ...prev,
      [productId]: newQuantity
    }));
  
    const allProducts = menu.flatMap((category) => category.menu_items);
    const product = allProducts.find((item) => item.id === productId);
  
    if (product) {
      if (newQuantity === 0) {
        onRemoveMenuItem(productId);
      } else if (currentQuantity === 0 && newQuantity > 0) {
        onAddMenuItem({
          id: productId,
          name: product.item_name,
          price: parseFloat(product.item_price) || 0,
          quantity: newQuantity, // Ensure quantity is set correctly
          image: product.images[0],
        });
      } else {
        onUpdateItemQuantity(productId, newQuantity);
      }
    }
  };
  // const updateQuantity = (productId, amount) => {
  //   const currentQuantity = quantities[productId] || 0;
  //   const newQuantity = Math.max(currentQuantity + amount, 0);

  //   setQuantities(prev => ({
  //     ...prev,
  //     [productId]: newQuantity
  //   }));


  //   const allProducts = menu.flatMap((category) => category.menu_items);
  //   const product = allProducts.find((item) => item.id === productId);

  //   if (product) {
  //     if (newQuantity === 0) {
 
  //       onRemoveMenuItem(productId);
  //     } else if (currentQuantity === 0 && newQuantity > 0) {
 
  //       onAddMenuItem({
  //         id: productId,
  //         name: product.item_name,
  //         price: parseFloat(product.item_price) || 0,
  //         quantity: newQuantity,
  //         image: product.images[0],
  //       });
  //     } else {
 
  //       onUpdateItemQuantity(productId, newQuantity);
  //     }
  //   }
  // };

  const removeItem = (productId) => {
    setQuantities(prev => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });

    onRemoveMenuItem(productId);
  };

  const clearFilters = () => {
    setActiveCategory(null);
    setShowAll(false);
    setVegFilter(false);
    setNonVegFilter(false);
    setBestSellerFilter(false);
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const getFilteredProducts = () => {
    let filtered = menu.flatMap((category) => category.menu_items);

    if (activeCategory) {
      filtered = filtered.filter((item) => item.category_id === activeCategory);
    }

    if (vegFilter && !nonVegFilter) {
      filtered = filtered.filter((item) => item.type === "veg");
    } else if (!vegFilter && nonVegFilter) {
      filtered = filtered.filter((item) => item.type === "non-veg");
    }

    if (bestSellerFilter) {
      filtered = filtered.filter((item) => item.isBestSeller);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((item) => {
        const itemName = item.item_name?.toLowerCase() || "";
        const itemDescription = item.item_description?.toLowerCase() || "";
        return itemName.includes(term) || itemDescription.includes(term);
      });
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const getTotalCartAmount = () => {
    return cartItems.reduce((total, item) => total + item.total, 0).toFixed(2);
  };

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // const addAllToCart = () => {
 
  //   cartItems.forEach(item => {
  //     onAddMenuItem(item);
  //   });
  // };

  if (menuStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (menuStatus === "failed") {
    return <div>Error loading menu.</div>;
  }

  return (
    <>
      <div className="container mt-4 pb-5">
        {showButton && (
          <button
            onClick={backToTop}
            className="btn btn-danger btn-lg position-fixed d-flex align-items-center justify-content-center"
            style={{
              bottom: "20px",
              right: "20px",
              zIndex: 1000,
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
            }}
          >
            <FaArrowUp />
          </button>
        )}

        <div className="row mt-5">
          <div className="col-md-3 mt-2">
            <div className="card shadow rounded-3 overflow-hidden mb-4 border-0">
              <div className="card-header p-3 all-button text-white ">
                <h5 className="mb-0 fs-3">Menu Categories</h5>
              </div>
              <div className="list-group list-group-flush mb-2">
                <button
                  className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3 mb-2 ${!activeCategory ? "active fw-bold" : ""
                    }`}
                  onClick={clearFilters}
                >
                  <span>All Items</span>
                  <span className="badge bg-danger rounded-pill">
                    {menu.flatMap((category) => category.menu_items).length}
                  </span>
                </button>
                {menu.map((category) => (
                  <button
                    key={category.id}
                    className={`list-group-item list-group-item-action d-flex mb-2 justify-content-between align-items-center mb-2 ₹ ${activeCategory === category.id ? "active" : ""
                      }`}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    {category.category_name}
                    <span className="badge bg-secondary rounded-pill">
                      {category.menu_items.length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="card shadow rounded-3 overflow-hidden mb-4 border-0">
              <div className="card-header p-3 all-button text-white">
                <h6 className="mb-0 fs-5">Dietary Preferences</h6>
              </div>
              <div className="card-body p-3 bg-light">
                <div className="d-flex flex-column gap-3">
                  <div className="form-check form-switch d-flex align-items-center p-2 bg-white rounded shadow-sm">
                    <input
                      className="form-check-input mx-1 me-4 py-1 px-3"
                      type="checkbox"
                      role="switch"
                      checked={vegFilter}
                      onChange={(e) => setVegFilter(e.target.checked)}
                    />
                    <label
                      className="form-check-label d-flex align-items-center"
                      htmlFor="vegSwitch"
                    >
                      <FaLeaf className="text-success me-2" /> Vegetarian
                    </label>
                  </div>
                  <div className="form-check form-switch d-flex align-items-center bg-white rounded shadow-sm p-2">
                    <input
                      className="form-check-input mx-1 me-4 py-1 px-3"
                      type="checkbox"
                      role="switch"
                      checked={nonVegFilter}
                      onChange={(e) => setNonVegFilter(e.target.checked)}
                    />
                    <label
                      className="form-check-label d-flex align-items-center"
                      htmlFor="nonVegSwitch"
                    >
                      <FaDrumstickBite className="text-danger me-2" />{" "}
                      Non-Vegetarian
                    </label>
                  </div>
                  <div className="form-check form-switch d-flex align-items-center p-2 bg-white rounded shadow-sm">
                    <input
                      className="form-check-input mx-1 me-4 py-1 px-3"
                      type="checkbox"
                      role="switch"
                      checked={bestSellerFilter}
                      onChange={(e) => setBestSellerFilter(e.target.checked)}
                    />
                    <label
                      className="form-check-label d-flex align-items-center"
                      htmlFor="bestSellerSwitch"
                    >
                      <FaStar className="text-warning me-2" /> Best Seller
                    </label>
                  </div>
                </div>
              </div>
              <div className="card-footer bg-white p-3 text-center">
                <button
                  className="btn btn-outline-success w-100"
                  onClick={clearFilters}
                >
                  <FaFilter className="me-2" /> Reset All Filters
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="col-md-4 mb-2 ">
              <div className="input-group input-group-lg shadow rounded-4">
                <input
                  type="text"
                  className="form-control border-0 py-2 fs-6"
                  placeholder="Search our menu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="input-group-text all-button text-white border-0">
                  <FaSearch />
                </span>
              </div>
            </div>
            <div className="card shadow rounded-3 overflow-hidden border-0">
              <div className="card-header d-flex justify-content-between align-items-center all-button">
                <h5 className="mb-0 text-light">
                  {activeCategory
                    ? menu.find((c) => c.id === activeCategory)?.category_name
                    : "All Items"}
                </h5>
                <span className="badge bg-light text-dark fs-6">
                  {filteredProducts.length} items
                </span>
              </div>
              <div className="card-body p-4 d-flex flex-column">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-5 w-100">
                    <div className="mb-4">
                      <img
                        src={photo7}
                        alt="No items found"
                        className="img-fluid w-25 rounded-5"
                        style={{ opacity: 0.5 }}
                      />
                    </div>
                    <h4>No items found</h4>
                    <p className="text-secondary">
                      Try adjusting your filters or search criteria
                    </p>
                    <button
                      className="btn btn-success mt-2"
                      onClick={clearFilters}
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        height: "auto",
                        maxHeight: showCart ? "500px" : "770px",
                        overflowY: "auto",
                        overflowX: "hidden",
                      }}
                      className="mb-3"
                    >
                      <div className="row row-cols-1 row-cols-md-2 g-4">
                        {filteredProducts.map((product) => (
                          <div key={product.id} className="col">
                            <div className="card h-100 border-0 shadow-sm">
                              <div className="row g-0">
                                <div className="col-4 position-relative">
                                  <img
                                    src={product.images[0]}
                                    className="img-fluid rounded-start h-100 object-fit-cover"
                                    alt={product.item_name}
                                  />
                                  {product.isBestSeller && (
                                    <div className="position-absolute bottom-0 start-0 p-2">
                                      <span className="badge bg-warning text-dark">
                                        <FaStar className="me-1" /> Best Seller
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="col-8">
                                  <div className="card-body d-flex flex-column ">
                                    <h5 className="card-title">
                                      {product.item_name}
                                    </h5>
                                    <p className="card-text fs-6">
                                      {product.item_description}
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                      <span className="fs-5 fw-bold text-success">
                                        ₹
                                        {(
                                          parseFloat(product.item_price) || 0
                                        ).toFixed(2)}
                                      </span>
                                    </div>
                                    <div className="input-group">
                                      <button
                                        className="btn btn-outline-success"
                                        onClick={() =>
                                          updateQuantity(product.id, -1)
                                        }
                                        disabled={!quantities[product.id]}
                                      >
                                        -
                                      </button>
                                      <span className="input-group-text border-success text-center">
                                        {quantities[product.id] || 0}
                                      </span>
                                      <button
                                        className="btn btn-outline-success rounded-end"
                                        onClick={() =>
                                          updateQuantity(product.id, 1)
                                        }
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>


                    {showCart && (
                      <div className="mt-auto p-3 border-top border-3 border-success">
                        <div className="shadow-sm rounded-3 p-3    bg-white">
                          <div className="container-fluid px-0">
                            <div className="row align-items-center">
                              <div className="col-md-6">
                                <div className="d-flex align-items-center">
                                  <div className="bg-success text-white rounded-circle p-2 me-3">
                                    <FaShoppingCart size={24} />
                                  </div>
                                  <div>
                                    <h5 className="mb-0">
                                      {getTotalCartItems()} items in cart
                                    </h5>
                                    <p className="mb-0 text-success fw-bold">
                                      ₹{getTotalCartAmount()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="d-flex flex-wrap gap-2">
                                  {cartItems.slice(0, 3).map((item) => (
                                    <div
                                      key={item.id}
                                      className="d-flex align-items-center bg-light p-1 rounded"
                                    >
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="rounded"
                                        width="30"
                                        height="30"
                                        style={{ objectFit: "cover" }}
                                      />
                                      <span className="ms-1 me-1 small">
                                        {item.quantity}x
                                      </span>
                                      <button
                                        className="btn btn-sm text-danger p-0"
                                        onClick={() => removeItem(item.id)}
                                        title="Remove item"
                                      >
                                        <FaTimes size={12} />
                                      </button>
                                    </div>
                                  ))}
                                  {cartItems.length > 3 && (
                                    <div className="badge bg-secondary">
                                      +{cartItems.length - 3} more
                                    </div>
                                  )}
                                </div>
                              </div>
                           
                            </div>
                          </div>


                          <div className="d-flex justify-content-end mt-3">
                            <div
                              className="  "
                              onClick={() =>
                                setShowCartDetails(!showCartDetails)
                              }
                            >
                              {showCartDetails ? "Hide" : "View"}
                              {showCartDetails ? (
                                <FaArrowUp className="ms-2" size={12} />
                              ) : (
                                <FaArrowUp
                                  className="ms-2"
                                  size={12}
                                  style={{ transform: "rotate(180deg)" }}
                                />
                              )}
                            </div>
                          </div>


                          {showCartDetails && (
                            <div className="mt-3">
                              <div className="table-responsive">
                                <table className="table table-borderless table-sm mb-0">
                                  <thead className="table-light">
                                    <tr>
                                      <th>Item</th>
                                      <th>Price</th>
                                      <th>Qty</th>
                                      <th>Total</th>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {cartItems.map((item) => (
                                      <tr key={item.id}>
                                        <td>
                                          <div className="d-flex align-items-center">
                                            <img
                                              src={item.image}
                                              alt={item.name}
                                              className="rounded me-2"
                                              width="40"
                                              height="40"
                                              style={{ objectFit: "cover" }}
                                            />
                                            <div className="small">
                                              {item.name}
                                            </div>
                                          </div>
                                        </td>
                                        <td>₹{item.price.toFixed(2)}</td>
                                        <td>
                                          <div
                                            className="input-group input-group-sm"
                                            style={{ width: "100px" }}
                                          >
                                            <button
                                              className="btn btn-outline-secondary btn-sm"
                                              onClick={() =>
                                                updateQuantity(item.id, -1)
                                              }
                                            >
                                              -
                                            </button>
                                            <span className="input-group-text border-secondary bg-white">
                                              {item.quantity}
                                            </span>
                                            <button
                                              className="btn btn-outline-secondary btn-sm"
                                              onClick={() =>
                                                updateQuantity(item.id, 1)
                                              }
                                            >
                                              +
                                            </button>
                                          </div>
                                        </td>
                                        <td>₹{item.total.toFixed(2)}</td>
                                        <td>
                                          <button
                                            className="btn btn-sm text-danger"
                                            onClick={() => removeItem(item.id)}
                                          >
                                            <FaTrash />
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                  <tfoot className="table-light fw-bold">
                                    <tr>
                                      <td
                                        colSpan="3"
                                        className="text-end"
                                      >
                                        Total:
                                      </td>
                                      <td>₹{getTotalCartAmount()}</td>
                                      <td></td>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menus;