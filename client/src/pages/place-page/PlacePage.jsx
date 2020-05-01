import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "./PlacePage.css";
import { FormInput } from "../../components/form-input/FormInput";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../utils/validator";
import { useForm } from "../../components/form-hooks/FormHooks";
import { useHttpClient } from "../../components/http-hooks/HttpHooks";
import { AuthContext } from "../../components/context/Context";
import { ErrorModal } from "../../components/error-modal/ErrorModal";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

const PlacePage = () => {
  const auth = useContext(AuthContext);
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
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/api/places",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push("/");
    } catch (error) {
    }
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
        <button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </button>
      </form>
    </React.Fragment>
  );
};

export default PlacePage;
