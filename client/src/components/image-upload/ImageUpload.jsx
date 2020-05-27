import React, { useRef, useState, useEffect } from "react";
import "./ImageUpload.css";

export const ImageUpload = ({ id, onInput, errorText }) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const changeHandler = (event) => {
    let choosedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      choosedFile = event.target.files[0];
      setFile(choosedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onInput(id, choosedFile, fileIsValid);
  };

  const chooseImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <React.Fragment>
      <input
        id={id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg, .png, jpeg"
        onChange={changeHandler}
      />
      <div className="image-upload-container">
        <div className="image-upload-preview">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" />
          ) : (
            <p>Choose a image</p>
          )}
        </div>
        <button type="button" onClick={chooseImageHandler}>
          Choose Image
        </button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </React.Fragment>
  );
};
