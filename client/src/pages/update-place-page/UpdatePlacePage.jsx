import React, { useEffect, useState, useContext } from "react";
import "./UpdatePlacePage.css";
// import react route
import { useParams, useHistory } from "react-router-dom";
// import components
import { FormInput } from "../../components/form-input/FormInput";
import { useForm } from "../../components/form-hooks/FormHooks";
import { Card } from "../../components/card/Card";
import { useHttpClient } from "../../components/http-hooks/HttpHooks";
import { ErrorModal } from "../../components/error-modal/ErrorModal";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { AuthContext } from "../../components/context/Context";
// import validtor
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../utils/validator";

const UpdatePlacePage = () => {
  const auth = useContext(AuthContext);
  const {
    isLoading,
    error,
    sendRequest,
    clearErrorModalHandler,
  } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  // useParams is to get parameter from path of route
  const placeId = useParams().placeId;
  // history from react route
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.title,
              isValid: true,
            },
            description: {
              value: responseData.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  // update place information
  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push(`/${auth.userId}/places`);
    } catch (error) {}
  };
  // If there is not page that match the path
  if (!loadedPlace && !error) {
    return (
      <Card className="update-place-not-found">
        <h2>No places found!</h2>
      </Card>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearErrorModalHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedPlace && (
        <form className="update-place-form" onSubmit={placeUpdateSubmitHandler}>
          <FormInput
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValid={true}
            placeholder="Title"
          />
          <FormInput
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description at least 5 characters"
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValid={true}
          />
          <button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlacePage;
