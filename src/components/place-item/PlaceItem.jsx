import React, { useState } from "react";
import "./PlaceItem.css";
import { Card } from "../card/Card";
import { Link } from "react-router-dom";
import Modal from "../modal/Modal";
import { Map } from "../map/Map";

export const PlaceItem = ({
  id,
  image,
  title,
  description,
  address,
  creatorId,
  coordinates,
}) => {
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
  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("DELETING...");
  };
  return (
    <React.Fragment>
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
          <div className="place-item-image">
            <img src={image} alt={title} />
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
            <Link to={`/places/${id}`}>EDIT</Link>
            <button onClick={showDeleteWarningHandler}>DELETE</button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};
