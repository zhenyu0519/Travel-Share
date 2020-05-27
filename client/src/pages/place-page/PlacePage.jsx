import React, { useContext } from "react";
// path history from routes
import { useHistory } from "react-router-dom";
import "./PlacePage.css";
// error validation utils
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../utils/validator";
// componenets
import { FormInput } from "../../components/form-input/FormInput";
import { useForm } from "../../components/form-hooks/FormHooks";
import { useHttpClient } from "../../components/http-hooks/HttpHooks";
import { AuthContext } from "../../components/context/Context";
import { ErrorModal } from "../../components/error-modal/ErrorModal";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { ImageUpload } from "../../components/image-upload/ImageUpload";

const PlacePage = () => {
  // access to public state
  const auth = useContext(AuthContext);
  // get http hooks for send request
  const {
    isLoading,
    error,
    sendRequest,
    clearErrorModalHandler,
  } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  // get history api for path
  const history = useHistory();
  // submit create new place request
  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("creator", auth.userId);
      formData.append("image", formState.inputs.image.value);
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/places`, "POST", formData, {
        Authorization: "Bearer " + auth.token,
      });
      // redirect to main page
      history.push("/");
    } catch (error) {}
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearErrorModalHandler} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <FormInput
          id="title"
          element="input"
          type="input"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter valid title"
          onInput={inputHandler}
          placeholder="Title"
        />
        <FormInput
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter valid description at least 5 charactors"
          onInput={inputHandler}
        />
        <FormInput
          id="address"
          element="textarea"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter valid address"
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please choose an image"
        />
        <button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </button>
      </form>
    </React.Fragment>
  );
};

export default PlacePage;
