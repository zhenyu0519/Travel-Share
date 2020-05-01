import React, { useEffect, useState } from "react";
import "./UserPlacePage.css";
import { useParams } from "react-router-dom";
// components
import { PlaceList } from "../../components/place-list/PlaceList";
import { useHttpClient } from "../../components/http-hooks/HttpHooks";
import { ErrorModal } from "../../components/error-modal/ErrorModal";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

const UserPlacePage = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const {
    isLoading,
    error,
    sendRequest,
    clearErrorModalHandler,
  } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (error) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  return (
    <div className="user-place-page">
      <ErrorModal error={error} onClear={clearErrorModalHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedPlaces && <PlaceList places={loadedPlaces} />}
    </div>
  );
};
export default UserPlacePage;
