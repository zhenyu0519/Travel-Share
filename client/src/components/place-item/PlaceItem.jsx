import React, { useState, useContext } from "react";
import "./PlaceItem.css";
// components
import { Card } from "../card/Card";
import { Link } from "react-router-dom";
import { Modal } from "../modal/Modal";
import { Map } from "../map/Map";
import { AuthContext } from "../context/Context";
import { useHttpClient } from "../http-hooks/HttpHooks";
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";
import { ErrorModal } from "../error-modal/ErrorModal";

export const PlaceItem = ({
  id,
  image,
  title,
  description,
  address,
  creatorId,
  coordinates,
  onDelete,
}) => {
  const {
    isLoading,
    error,
    sendRequest,
    clearErrorModalHandler,
  } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const openMapHandler = () => setShowMap(true);
  const closeMapHandle = () => setShowMap(false);
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(`http://localhost:5000/api/places/${id}`, "DELETE");
      onDelete(id);
    } catch (error) {}
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearErrorModalHandler} />
      <Modal
        show={showMap}
        onCancel={closeMapHandle}
        header={address}
        footer={
          <button className="modal-actions-button" onClick={closeMapHandle}>
            Close
          </button>
        }
      >
        <div className="map-container">
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footer={
          <div className="modal-button-group">
            <button
              className="modal-actions-button"
              onClick={confirmDeleteHandler}
            >
              Delete
            </button>
            <button
              className="modal-actions-button"
              onClick={cancelDeleteHandler}
            >
              Cancel
            </button>
          </div>
        }
      >
        <p>Delete this place? Please note this can not be undone!</p>
      </Modal>
      <li className="place-item-container">
        <Card className="place-item-content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item-image">
            <img src={`http://localhost:5000/${image}`} alt={title} />
          </div>
          <div className="place-item-info">
            <h2>
              {title} - by {creatorId}
            </h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item-actions">
            <button onClick={openMapHandler}>VIEW ON MAP</button>
            {auth.userId === creatorId && (
              <Link to={`/places/${id}`}>EDIT</Link>
            )}
            {auth.userId === creatorId && (
              <button onClick={showDeleteWarningHandler}>DELETE</button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};
