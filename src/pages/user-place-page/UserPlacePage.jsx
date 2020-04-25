import React from "react";
import "./UserPlacePage.css";

import { PlaceList } from "../../components/place-list/PlaceList";

const UserPlacePage = () => {
  const DUMMY_PLACES = [
    {
      id: "p1",
      title: "Empire State Building",
      description: "One of the best",
      imageUrl:
        "https://images.unsplash.com/photo-1470219556762-1771e7f9427d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
      address: "20 w 34th st, New York, NY 10001",
      location: {
        lat: 40.7484405,
        log: -73.9878584,
      },
      creatir: "u1",
    },
    {
      id: "p2",
      title: "Empire State Building",
      description: "One of the best",
      imageUrl:
        "https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
      address: "20 w 34th st, New York, NY 10001",
      location: {
        lat: 40.7484405,
        log: -73.9878584,
      },
      creatir: "u2",
    },
  ];

  return (
    <div className="user-place-page">
      <PlaceList places={DUMMY_PLACES} />;
    </div>
  );
};
export default UserPlacePage;
