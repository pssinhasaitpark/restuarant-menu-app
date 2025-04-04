import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { BsGeoAlt } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import "./HeaderTop.css";

const HeaderTop = ({ onLocationSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onLocationSelect(searchTerm); 
    setSearchTerm("");
  };

  return (
    <div className="head-top position-relative">
      <div className="image-container">
        <div className="content position-absolute top-50 start-50 translate-middle text-center">
          <h2 className="fw-bolder welcome-text mb-4">
            25000+ users <br />
            Find the best Restaurant in your city
          </h2>
          <div className="search-wrapper">
            <Form className="search-form w-100" onSubmit={handleSearch}>
              <InputGroup
                className="location-search"
                style={{
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                  borderRadius: "50px",
                  overflow: "hidden",
                }}
              >
                <InputGroup.Text className="location-icon">
                  <BsGeoAlt size={18} />
                </InputGroup.Text>
                <Form.Control
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for locations..."
                  aria-label="Search location"
                  className="search-input"
                />
                <Button variant="primary" type="submit" className="search-button">
                  <IoIosSearch className="me-2" />
                </Button>
              </InputGroup>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
