import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LoaderDiv } from "../Loader/LoaderDiv";
import "./assets/css/product.css";
import { NavBar } from "../NavBar/NavBar";

export const ProductPage = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [itemCount, setItemCount] = useState(1);

  const { id } = useParams();

  const getProductById = async () => {
    try {
      const productById = await axios.get(
        "https://fakestoreapi.com/products/" + id
      );
      setLoading(false);
      setProduct(productById.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductById();
  }, [id]);

  const handleIncrement = () => {
    const itemC = itemCount + 1;
    setItemCount(itemC);
  };

  const handleDecrement = () => {
    if (itemCount >= 1) {
      const itemC = itemCount - 1;
      setItemCount(itemC);
    }
  };

  return (
    <>
      <NavBar />
      {isLoading ? (
        <>
          {" "}
          <LoaderDiv />
        </>
      ) : (
        <>
          <div className="card-wrapper">
            <div className="card">
              <div className="product-imgs">
                <div className="img-display">
                  <div className="img-showcase">
                    <img
                      src={product.image}
                      alt="Tree image"
                      style={{ height: 400 }}
                    />
                  </div>
                </div>
                <div className="img-select">
                  <div className="img-item">
                    <img src={product.image} alt="Tree image" />
                  </div>
                </div>
              </div>
              <div className="product-content">
                <h2 className="product-title">{product.title}</h2>

                <div className="product-price">
                  {/* <p className="last-price">
            Old Price: <span>$257.00</span>
          </p> */}
                  <p className="new-price">
                    Price: <span>${product.price}</span>
                  </p>
                </div>

                <div className="product-detail">
                  <h2>about this item: </h2>
                  <p>{product.description}</p>

                  <ul>
                    <li>
                      Category: <span>{product.category}</span>
                    </li>
                  </ul>
                </div>

                <div className="purchase-info">
                  {/* <input
                type="number"
                min="0"
                defaultValue={1}
                max="100"
                step={1}
              /> */}
                  <button type="button" className="btn">
                    Add to Cart <i className="fas fa-shopping-cart"></i>
                  </button>

                  <span style={{ fontSize: "15px" }}>
                    <b>Items in cart: {itemCount}</b>
                  </span>
                  <button
                    onClick={() => handleDecrement()}
                    className="decrementBtn"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleIncrement()}
                    className="incrementBtn"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
