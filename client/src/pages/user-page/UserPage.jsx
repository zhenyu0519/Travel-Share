import React, { useEffect, useState } from "react";
import "./UserPage.css";
// components
import { UsersList } from "../../components/users-list/UsersList";
import { ErrorModal } from "../../components/error-modal/ErrorModal";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { useHttpClient } from "../../components/http-hooks/HttpHooks";

const UserPage = () => {
  // manage loading state and error state
  const {
    isLoading,
    error,
    sendRequest,
    clearErrorModalHandler,
  } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users`
        );
        setLoadedUsers(responseData.users);
      } catch (error) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <div className="user-page">
      <ErrorModal error={error} onClear={clearErrorModalHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedUsers && <UsersList users={loadedUsers} />}
    </div>
  );
};

export default UserPage;
