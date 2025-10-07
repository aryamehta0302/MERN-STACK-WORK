import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <div className="card-img">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="card-body">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-category">{product.category}</p>
        <p className="card-price">₹ {product.price}</p>
        <button className="card-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
