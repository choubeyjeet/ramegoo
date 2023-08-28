import axios from "axios";
import { useState, useEffect } from "react";
import { LoaderDiv } from "../Loader/LoaderDiv";
import { Panel } from "rsuite";
import "./assets/css/Home.css";
import { NavBar } from "../NavBar/NavBar";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getDatafromAPI = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");

      setProduct(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDatafromAPI();
  }, []);

  return (
    <>
      <NavBar />
      {isLoading ? (
        <>
          <LoaderDiv />
        </>
      ) : (
        <>
          {" "}
          <div className="container">
            {product.map((item, index) => {
              return (
                <>
                  {" "}
                  <Panel
                    as={Link}
                    to={`/product/${item.id}`}
                    key={index}
                    className="item"
                    shaded
                    bordered
                    bodyFill
                    style={{ display: "inline-block", width: 240 }}
                  >
                    <img src={item.image} height="240" />
                    <Panel header={item.title}>
                      <p>
                        <small>
                          <br />${item.price}
                        </small>
                      </p>
                    </Panel>
                  </Panel>
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};
