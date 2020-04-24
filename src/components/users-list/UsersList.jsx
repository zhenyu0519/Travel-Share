import React from "react";
import "./UsersList.css";
import { UserItem } from "../user-item/UserItem";

export const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div>
        <h2>No user found</h2>
      </div>
    );
  }

  return (
    <ul className='user-list'>
      {props.items.map((user) => {
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
