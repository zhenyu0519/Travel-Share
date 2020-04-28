import React from "react";
import "./UserAvatar.css";

export const UserAvatar = ({ image, alt }) => {
  return (
    <div className="user-avatar">
      <img src={image} alt={alt} />
    </div>
  );
};
