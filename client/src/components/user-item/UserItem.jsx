import React from "react";
import "./UserItem.css";
// components
import { UserAvatar } from "../user-avatar/UserAvatar";
import { Link } from "react-router-dom";
import { Card } from "../card/Card";

export const UserItem = ({ image, name, placeCount, id }) => {
  return (
    <li className="user-item-container">
      <Card className="user-item-content">
        <div className="user-item-image">
          <Link to={`/${id}/places`}>
            <UserAvatar image={`${process.env.REACT_APP_BACKEND_URL}/${image}`} alt={name} />
          </Link>
        </div>
        <div className="user-item-info">
          <h2>{name}</h2>
          <h3>
            {placeCount} {placeCount === 1 ? "Place" : "Places"}
          </h3>
        </div>
      </Card>
    </li>
  );
};
