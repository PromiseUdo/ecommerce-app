import React from "react";
import "./FeaturedProducts.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";



const FeaturedProducts = ({ type }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );
  console.log(data);

  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} Products</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et excepturi
          voluptates unde, reiciendis, quas officia vel, iste aperiam ullam
          magni atque amet veritatis at. Unde rerum suscipit commodi assumenda
          voluptas aliquam ullam, magni laboriosam minima molestiae et aliquid,
          a deleniti. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="bottom">
        {error
          ? "Something went wrong..."
          : loading
          ? "loading"
          : data.map((item) => {
              return <Card item={item} key={item.id} />;
            })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
