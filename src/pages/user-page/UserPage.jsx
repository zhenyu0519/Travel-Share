import React from "react";
import "./UserPage.css";
import { UsersList } from "../../components/users-list/UsersList";

const UserPage = () => {
  const USERS = [
    {
      id: "u1",
      name: "jeffsdsasdadsadsadsadsa",
      image:
        "https://cdn.pixabay.com/photo/2016/08/28/13/12/secondlife-1625903_1280.jpg",
      places: 3,
    },
    {
      id: "u2",
      name: "hong",
      image:
        "https://cdn.pixabay.com/photo/2016/08/20/15/29/avatar-1607754_1280.jpg",
      places: 2,
    },
  ];
  return (
    <div className="user-page">
      <UsersList items={USERS} />
    </div>
  );
};

export default UserPage;
