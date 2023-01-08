import React from "react";
import useFetch from "../../hooks/useFetch";
import "./List.scss";
import Card from "../Card/Card";

const List = ({ catId, subCats, maxPrice, sort }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][categories][id]=${catId}${subCats?.map(
      (item) => `&[filters][sub_categories][id][$eq]=${item}`
    )}&[filters][price][$lte]=${maxPrice}`
  );

  return (
    <div className="list">
      {error
        ? "Error loading data..."
        : loading
        ? "loading..."
        : data?.map((item) => {
            return <Card key={item.id} item={item} />;
          })}
    </div>
  );
};

export default List;
