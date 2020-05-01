import React, { useEffect, useState } from "react";
import "./UserPage.css";
// components
import { UsersList } from "../../components/users-list/UsersList";
import { ErrorModal } from "../../components/error-modal/ErrorModal";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

const UserPage = () => {
  // manage loading state and error state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoadedUsers(responseData.users);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  const clearErrorModalHandler = () => {
    setError(null);
  };

  return (
    <div className="user-page">
      <ErrorModal error={error} onClear={clearErrorModalHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedUsers && <UsersList users={loadedUsers} />}
    </div>
  );
};

export default UserPage;
