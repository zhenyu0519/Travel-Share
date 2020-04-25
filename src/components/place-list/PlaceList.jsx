import React from "react";
import "./PlaceList.css";
import { Link } from "react-router-dom";

import { Card } from "../card/Card";
import { PlaceItem } from "../place-item/PlaceItem";

export const PlaceList = ({ places }) => {
  return places.length === 0 ? (
    <div>
      <Card>
        <h2>No places found</h2>
        <button>Share Place</button>
      </Card>
    </div>
  ) : (
    <ul className="place-list">
      {places.map((place) => {
        return (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.imageUrl}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creator}
            coordinates={place.location}
          />
        );
      })}
    </ul>
  );
};
