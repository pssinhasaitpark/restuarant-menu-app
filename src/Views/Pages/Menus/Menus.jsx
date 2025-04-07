import React, { useState, useRef, useEffect } from "react";
import { photo7 } from "../../../assets/index";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { FaRegSun } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";
const Menus = () => {
  const [showAll, setShowAll] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [showButton, setShowButton] = useState(false);
  const swiperRef = useRef(null);
  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };
  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };
  const sliderData = [
    {
      title: "30% off on all pizzas",
      description: "Enjoy your favorite slice!",
      icon: <FaRegSun size={50} className="text-dark opacity-75" />,
    },
    {
      title: "20% off on desserts",
      description: "Treat yourself today!",
      icon: <FaRegSun size={50} className="text-danger opacity-75" />,
    },
    {
      title: "Buy 1 Get 1 Free",
      description: "On selected beverages.",
      icon: <FaRegSun size={50} className="text-warning opacity-75" />,
    },
  ];

  const menuData = {
    categories: [
      {
        id: 1,
        name: "Appetizers",
        subcategories: [
          { id: 101, name: "Soups" },
          { id: 102, name: "Salads" },
          { id: 103, name: "Starters" },
        ],
      },
      {
        id: 2,
        name: "Main Course",
        subcategories: [
          { id: 201, name: "Vegetarian" },
          { id: 202, name: "Non-Vegetarian" },
          { id: 203, name: "Seafood" },
          { id: 204, name: "Chef's Special" },
        ],
      },
      {
        id: 3,
        name: "Desserts",
        subcategories: [
          { id: 301, name: "Ice Cream" },
          { id: 302, name: "Cakes" },
        ],
      },
      {
        id: 4,
        name: "Beverages",
        subcategories: [
          { id: 401, name: "Hot Drinks" },
          { id: 402, name: "Cold Drinks" },
          { id: 403, name: "Mocktails" },
        ],
      },
    ],
    products: [
      {
        id: 1,
        name: "Tomato Soup",
        price: 5.99,
        categoryId: 1,
        subcategoryId: 101,
        description: "Fresh tomatoes blended with herbs",
        image: photo7,
        isVeg: true,
        isBestSeller: true
      },
      {
        id: 2,
        name: "Caesar Salad",
        price: 7.99,
        categoryId: 1,
        subcategoryId: 102,
        description: "Crisp romaine lettuce with our signature dressing",
        image: photo7,
        isVeg: true,
        isBestSeller: false
      },
      {
        id: 3,
        name: "Garlic Bread",
        price: 4.99,
        categoryId: 1,
        subcategoryId: 103,
        description: "Freshly baked and topped with garlic butter",
        image: photo7,
        isVeg: true,
        isBestSeller: true
      },
      {
        id: 4,
        name: "Paneer Tikka",
        price: 12.99,
        categoryId: 2,
        subcategoryId: 201,
        description: "Marinated cottage cheese grilled to perfection",
        image: photo7,
        isVeg: true,
        isBestSeller: true
      },
      {
        id: 5,
        name: "Chicken Curry",
        price: 14.99,
        categoryId: 2,
        subcategoryId: 202,
        description: "Tender chicken in aromatic curry sauce",
        image: photo7,
        isVeg: false,
        isBestSeller: true
      },
      {
        id: 6,
        name: "Grilled Salmon",
        price: 18.99,
        categoryId: 2,
        subcategoryId: 203,
        description: "Fresh salmon with lemon herb butter",
        image: photo7,
        isVeg: false,
        isBestSeller: false
      },
      {
        id: 7,
        name: "Signature Biryani",
        price: 16.99,
        categoryId: 2,
        subcategoryId: 204,
        description: "Special rice preparation with premium spices",
        image: photo7,
        isVeg: false,
        isBestSeller: true
      },
      {
        id: 8,
        name: "Chocolate Ice Cream",
        price: 5.99,
        categoryId: 3,
        subcategoryId: 301,
        description: "Rich and creamy chocolate goodness",
        image: photo7,
        isVeg: true,
        isBestSeller: false
      },
      {
        id: 9,
        name: "Cheesecake",
        price: 6.99,
        categoryId: 3,
        subcategoryId: 302,
        description: "Smooth cream cheese on a crunchy base",
        image: photo7,
        isVeg: true,
        isBestSeller: true
      },
      {
        id: 10,
        name: "Green Tea",
        price: 3.99,
        categoryId: 4,
        subcategoryId: 401,
        description: "Refreshing green tea with health benefits",
        image: photo7,
        isVeg: true,
        isBestSeller: false
      },
      {
        id: 11,
        name: "Fresh Lime Soda",
        price: 4.99,
        categoryId: 4,
        subcategoryId: 402,
        description: "Tangy lime with soda water",
        image: photo7,
        isVeg: true,
        isBestSeller: false
      },
      {
        id: 12,
        name: "Virgin Mojito",
        price: 6.99,
        categoryId: 4,
        subcategoryId: 403,
        description: "Mint, lime, and soda in perfect harmony",
        image: photo7,
        isVeg: true,
        isBestSeller: true
      },
    ],
  };
  // button
  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateQuantity = (productId, amount) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) + amount, 0),
    }));
  };
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [vegFilter, setVegFilter] = useState(false);
  const [nonVegFilter, setNonVegFilter] = useState(false);
  const [bestSellerFilter, setBestSellerFilter] = useState(false);

  const toggleCategory = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setActiveSubcategory(null);
    toggleCategory(categoryId);
  };

  const handleSubcategoryClick = (categoryId, subcategoryId) => {
    setActiveCategory(categoryId);
    setActiveSubcategory(subcategoryId);
  };

  const clearFilters = () => {
    setActiveCategory(null);
    setActiveSubcategory(null);
    setShowAll(false);
  }
  const getFilteredProducts = () => {
    let filtered = menuData.products;
    if (activeCategory) {
      filtered = filtered.filter(product => product.categoryId === activeCategory);

      if (activeSubcategory) {
        filtered = filtered.filter(product => product.subcategoryId === activeSubcategory);
      }
    }
    if (vegFilter && !nonVegFilter) {
      filtered = filtered.filter(product => product.isVeg);
    } else if (!vegFilter && nonVegFilter) {
      filtered = filtered.filter(product => !product.isVeg);
    } else if (!vegFilter && !nonVegFilter) {
    }
    if (bestSellerFilter) {
      filtered = filtered.filter(product => product.isBestSeller);
    }

    return filtered;
  };

  const countSubcategoryProducts = (categoryId, subcategoryId) => {
    return menuData.products.filter(
      (product) =>
        product.categoryId === categoryId &&
        product.subcategoryId === subcategoryId
    ).length;
  };

  const filteredProducts = getFilteredProducts();
  const handleVegFilterChange = (e) => {
    setVegFilter(e.target.checked);
  };

  const handleNonVegFilterChange = (e) => {
    setNonVegFilter(e.target.checked);
  };

  const handleBestSellerFilterChange = (e) => {
    setBestSellerFilter(e.target.checked);
  };
  ;

  return (
    <>
      <div className="container mt-4">
        {showButton && (
          <button
            onClick={backToTop}
            className="btn btn-danger btn-lg position-fixed"
            style={{
              bottom: '20px',
              right: '20px',
              zIndex: 1000,
              borderRadius: '50%',
            }}
          >
            <FaArrowUp />
          </button>
        )}

        <div className="position-relative">
          <Swiper
            ref={swiperRef}
            modules={[]}
            navigation={false}
            loop={true}
            slidesPerView={1}
            className="swiper-container"
          >
            {sliderData.map((slide, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <div className="d-flex align-items-center bg-light rounded-4 p-4 shadow-lg border border-1 border-light">
                  <div className="me-4">
                    <div className="rounded-circle d-flex justify-content-center align-items-center bg-white shadow-sm p-2">
                      {slide.icon}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <span className="fw-bold text-dark fs-5">{slide.title}</span>
                    <p className="mb-0 text-dark small">{slide.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="custom-navigation d-lg-flex justify-content-end position-absolute top-50 end-0 translate-middle-y z-1 mx-3">
            <button
              onClick={handlePrev}
              className="prev-button border-0 bg-transparent mx-2"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="next-button bg-transparent border-0"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
        <div className="row mt-5 ">
          <div className="col-md-3">
            <div className="card shadow-sm">
              <div className="card-header p-3 all-button text-white">
                <h5 className="mb-0 fs-3">Menu Categories</h5>
              </div>
              <div className="list-group list-group-flush ">
                <button
                  className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ₹{!activeCategory ? "active" : ""
                  }`}
                  onClick={clearFilters}
                >
                  All Items
                  <span className="badge bg-danger rounded-pill">
                    {menuData.products.length}
                  </span>
                </button>

                {menuData.categories.map((category) => (
                  <div key={category.id}>
                    <button
                      className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ₹{activeCategory === category.id && !activeSubcategory
                      ? "active"
                      : ""
                      }`}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {category.name}
                      <div>
                        <span className="badge bg-secondary rounded-pill ">
                          {
                            menuData.products.filter(
                              (p) => p.categoryId === category.id
                            ).length
                          }
                        </span>
                        <i
                          className={`fas fa-chevron-₹{expandedCategory === category.id ? "up" : "down"
                          }`}
                        ></i>
                      </div>
                    </button>

                    {expandedCategory === category.id && (
                      <div className="subcategory-list">
                        {category.subcategories.map((subcategory) => (
                          <button
                            key={subcategory.id}
                            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ps-4 ₹{activeSubcategory === subcategory.id ? "active" : ""
                            }`}
                            onClick={() =>
                              handleSubcategoryClick(category.id, subcategory.id)
                            }
                          >
                            {subcategory.name}
                            <span className="badge bg-secondary rounded-pill">
                              {countSubcategoryProducts(
                                category.id,
                                subcategory.id
                              )}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="card mt-3 shadow-sm border-0 overflow-hidden">
              <div className="card-header p-3 all-button text-white">
                <h6 className="mb-0 fs-5">Dietary Preferences</h6>
              </div>
              <div className="card-body p-3 bg-light">
                <div className="d-flex flex-column gap-3">
                  <div className="form-check form-switch d-flex align-items-center p-2 bg-white rounded shadow-sm">
                    <input
                      className="form-check-input mx-1 me-4"
                      type="checkbox"
                      role="switch"
                      id="vegSwitch"
                      checked={vegFilter}
                      onChange={handleVegFilterChange}
                    />
                    <label className="form-check-label d-flex align-items-center" htmlFor="vegSwitch">
                      <span className="badge bg-success me-3">
                        <i className="fas fa-leaf"></i>
                      </span>
                      <span className="fw-medium">Vegetarian</span>
                    </label>
                  </div>

                  <div className="form-check form-switch d-flex align-items-center bg-white rounded shadow-sm p-2">
                    <input
                      className="form-check-input mx-1 me-4"
                      type="checkbox"
                      role="switch"
                      id="nonVegSwitch"
                      checked={nonVegFilter}
                      onChange={handleNonVegFilterChange}
                    />
                    <label className="form-check-label d-flex align-items-center" htmlFor="nonVegSwitch">
                      <span className="badge bg-danger me-3" >
                        <i className="fas fa-drumstick-bite"></i>
                      </span>
                      <span className="fw-medium">Non-Vegetarian</span>
                    </label>
                  </div>

                  <div className="form-check form-switch d-flex align-items-center p-2 bg-white rounded shadow-sm">
                    <input
                      className="form-check-input mx-1 me-4"
                      type="checkbox"
                      role="switch"
                      id="bestSellerSwitch"
                      checked={bestSellerFilter}
                      onChange={handleBestSellerFilterChange}
                    />
                    <label className="form-check-label d-flex align-items-center" htmlFor="bestSellerSwitch">
                      <span className="badge bg-warning text-dark me-3">
                        <i className="fas fa-star"></i>
                      </span>
                      <span className="fw-medium">Best Seller</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="card-footer bg-white p-3 text-center">
                <button
                  className="btn btn-sm btn-outline-secondary w-100 all-button text-light py-2 fw-bold"
                  onClick={() => {
                    setVegFilter(false);
                    setNonVegFilter(false);
                    setBestSellerFilter(false);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="card shadow-sm">
              <div className="card-header all-button text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  {!activeCategory
                    ? "All Items"
                    : !activeSubcategory
                      ? menuData.categories.find((c) => c.id === activeCategory)
                        ?.name
                      : `₹{menuData.categories.find((c) => c.id === activeCategory)
                      ?.name
                    } > ₹{menuData.categories
                      .find((c) => c.id === activeCategory)
                      ?.subcategories.find((s) => s.id === activeSubcategory)
                      ?.name
                    }`}
                  {/* {(vegFilter || nonVegFilter || bestSellerFilter) && (
                  <span className="ms-2 fs-6">
                    {vegFilter && <span className="badge bg-success me-1">Veg</span>}
                    {nonVegFilter && <span className="badge bg-danger me-1">Non-Veg</span>}
                    {bestSellerFilter && <span className="badge bg-warning text-dark">Best Seller</span>}
                  </span>
                )} */}
                </h5>
                <span className="badge bg-light text-dark">
                  {filteredProducts.length} items
                </span>
              </div>
              <div className="card-body">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-5">
                    <p className="text-dark">No items found with the selected filters.</p>
                  </div>
                ) : (
                  <>
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                      {(showAll ? filteredProducts : filteredProducts.slice(0, 8)).map((product) => (


                        <div key={product.id} className="col">
                          <div className="card h-100 border-0 shadow-sm">
                            <div className="row g-0">
                              <div className="col-4 position-relative">
                                <img
                                  src={product.image}
                                  className="img-fluid rounded-start h-100 object-fit-cover"
                                  alt={product.name}
                                />
                                <div className="position-absolute top-0 start-0 p-1">
                                  {/* Uncomment if needed */}
                                  {/* <span className={`badge ₹{product.isVeg ? 'bg-success' : 'bg-danger'}`}>
                      {product.isVeg ? 'Veg' : 'Non-Veg'}
                    </span> */}
                                  {product.isBestSeller && (
                                    <span className="badge bg-warning text-dark ms-1">Best Seller</span>
                                  )}
                                </div>
                              </div>
                              <div className="col-8">
                                <div className="card-body">
                                  <h5 className="card-title">{product.name}</h5>
                                  <p className="card-text text-dark small">{product.description}</p>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <span className=" fw-bold text-success ">
                                      ₹{product.price.toFixed(2)}
                                    </span>
                                    <span className="text-dark">
                                      Total: ₹{(product.price * (quantities[product.id] || 0)).toFixed(2)}
                                    </span>
                                    <div className="d-flex align-items-center">
                                      <button
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => updateQuantity(product.id, -1)}
                                      >
                                        -
                                      </button>
                                      <span className="mx-2">{quantities[product.id] || 0}</span>
                                      <button
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => updateQuantity(product.id, 1)}
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>


                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {filteredProducts.length > 8 && !showAll && (
                      <div className="text-center mt-3">
                        <button
                          className="btn btn-outline-success all-button text-light fw-semibold"
                          onClick={() => setShowAll(true)}
                        >
                          View More <FaChevronRight className="ms-1" />
                        </button>
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