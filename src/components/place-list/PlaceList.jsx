import React from "react";
import "./PlaceList.css";

import { Card } from "../card/Card";
import { PlaceItem } from "../place-item/PlaceItem";
import { Link } from "react-router-dom";

export const PlaceList = ({ places }) => {
  return places.length === 0 ? (
    <Card className="place-list-not-found">
      <h2>No places found</h2>
      <Link to="/places/new">Share Place</Link>
    </Card>
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
            creatorId={place.creatorId}
            coordinates={place.location}
          />
        );
      })}
    </ul>
  );
};
