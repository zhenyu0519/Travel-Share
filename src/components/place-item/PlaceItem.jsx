import React from "react";
import "./PlaceItem.css";
import { Card } from "../card/Card";

export const PlaceItem = ({
  id,
  image,
  title,
  description,
  address,
  creator,
  location,
}) => {
  return (
    <li className="place-item-container">
      <Card className="place-item-content">
        <div className="place-item-image">
          <img src={image} alt={title} />
        </div>
        <div className="place-item-info">
          <h2>{title}</h2>
          <h3>{address}</h3>
          <p>{description}</p>
        </div>
        <div className="place-item-actions">
          <button>VIEW ON MAP</button>
          <button>EDIT</button>
          <button>DELETE</button>
        </div>
      </Card>
    </li>
  );
};
