import React from "react";
import "./UserItem.css";
import { UserAvatar } from "../user-avatar/UserAvatar";
import { Link } from "react-router-dom";
import { Card } from "../../components/card/Card";

export const UserItem = ({ image, name, placeCount, id }) => {
  return (
    <li className="user-item-container">
      <Card className="user-item-content">
        <div className="user-item-image">
          <Link to={`/${id}/places`}>
            <UserAvatar image={image} alt={name} />
          </Link>
        </div>
        <div className="user-item-info">
          <h2>{name}</h2>
          <h2>
            {placeCount} {placeCount === 1 ? "Place" : "Places"}
          </h2>
        </div>
      </Card>
    </li>
  );
};
