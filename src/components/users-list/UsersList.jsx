import React from "react";
import "./UsersList.css";
import { UserItem } from "../user-item/UserItem";
import { Card } from "../card/Card";

export const UsersList = ({users}) => {
  return users.length === 0 ? (
    <div>
      <Card>No user found</Card>
    </div>
  ) : (
    <ul className="user-list">
      {users.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            placeCount={user.places}
          />
        );
      })}
    </ul>
  );
};
