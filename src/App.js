import React, { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";

import logo from './logo.svg';
import './App.css';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";


const initState = {
  "country": "",
  "name": "",
  "lastName": "",
  "email": "",
  "company": ""
}

const getSchema = () => yup.object().shape({
  name: yup.string().required("Valor requerido")
    .max(250, "Maximo 250 caracteres"),
  lastName: yup.string().required("Valor requerido")
    .max(250, "Maximo 250 caracteres"),
  email: yup.string().required("Valor requerido")
    .email("Correo invalido")
    .max(250, "Maximo 250 caracteres"),
  country: yup.string().required("Valor requerido"),
  company: yup.string().required("Valor requerido")
    .max(250, "Maximo 250 caracteres")
});


const firebaseConfig = {
  apiKey: "AIzaSyD2yHNFMz5YvI13E2-8sic4urS-TtqEFbo",
  authDomain: "kubadili-3c51a.firebaseapp.com",
  databaseURL: "https://kubadili-3c51a.firebaseio.com",
  projectId: "kubadili-3c51a",
  storageBucket: "kubadili-3c51a.appspot.com",
  messagingSenderId: "722390114947",
  appId: "1:722390114947:web:4a64c6dc47090a693f31b6"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Get a reference to the database service

var db = firebase.firestore();

function App() {

  const { register, errors, handleSubmit, setValue } = useForm({
    resolver: yupResolver(getSchema()),
  });

  const [stateData, setState] = useState(initState);
  const [document, setDocument] = useState("");
  const [message, setMessage] = useState("");

  const down = useRef(null);

  const onSubmit = (e) => {

    db.collection("documents").add({
      ...e,
      document: document
    })
      .then(function (docRef) {
        // console.log("Document written with ID: ", docRef.id);
        setMessage("¡Gracias por tu mensaje!");
        down.current.click();
      })
      .catch(function (error) {
        setMessage("Ah ocurrido un error, intentalo de nuevo mas tarde, Gracias!");
        // console.error("Error adding document: ", error);
      });

  }

  useEffect(() => {
    var url_string = window.location.href;//window.location.href
    var url = new URL(url_string);
    var c = url.searchParams.get("doc");
    setDocument(c)
  })


  const handleChange = (item, value) => {
    let _state = { ...stateData };
    _state[item] = value;
    setState(_state);

    setValue(item, value);
  }


  return (

    <div className="App">

      <form className="style-k2b935apform" id="comp-k2b9359nform" onSubmit={handleSubmit(onSubmit)} >
        <div id="comp-k2b9359nform-gridWrapper" data-mesh-internal="true">
          <div id="comp-k2b9359nform-gridContainer" data-mesh-internal="true">

            <div className="style-k2b935li1_with-validation-indication style-k2b935li1_required style-k2b935li1_left-direction style-k2b935li1" data-disabled="false" style={{ width: "200px", height: "43px" }} id="comp-k2b935kj">
              <input type="text" style={{ paddingLeft: "2px" }}
                placeholder="NOMBRE"
                value={stateData.name}
                ref={register({ name: "name" }, {
                  required: true
                })}
                onChange={e => handleChange("name", e.currentTarget.value)}
                className="has-custom-focus style-k2b935li1input" id="comp-k2b935kjinput" />


              <p className="error-message-input" style={{ opacity: errors.name ? 1 : 0 }}>
                {errors.name?.message}
              </p>

            </div>

            <div className="style-k7kujtyp_required style-k7kujtyp_left-direction style-k7kujtyp" data-disabled="false" style={{ width: "200px", height: "43px" }} id="comp-k7kujtvb">
              <input type="text" style={{ paddingLeft: "2px" }}
                placeholder="APELLIDO"
                value={stateData.lastName}
                ref={register({ name: "lastName" }, {
                  required: true
                })}
                onChange={e => handleChange("lastName", e.currentTarget.value)}
                className="has-custom-focus style-k7kujtypinput" id="comp-k7kujtvbinput" />

              <p className="error-message-input"  style={{ opacity: errors.lastName ? 1 : 0 }}>
                {errors.lastName?.message}
              </p>
            </div>

            <div className="style-k2b935sx1_required style-k2b935sx1_left-direction style-k2b935sx1" data-disabled="false" style={{ width: "200px", height: "43px" }} id="comp-k2b935s1">
              <input type="email" style={{ paddingLeft: "2px" }}
                placeholder="E-MAIL"
                value={stateData.email}
                ref={register({ name: "email" }, {
                  required: true
                })}
                onChange={e => handleChange("email", e.currentTarget.value)}
                className="has-custom-focus style-k2b935sx1input" id="comp-k2b935s1input" />


              <p  className="error-message-input" style={{ opacity: errors.email ? 1 : 0 }}>
                {errors.email?.message}
              </p>


            </div>

            <div className="style-k2b935li1_required style-k2b935li1_left-direction style-k2b935li1" data-disabled="false" style={{ width: "200px", height: "43px" }} id="comp-kh2ej8ht">
              <input type="text" style={{ paddingLeft: "2px" }}
                placeholder="ORGANIZACIÓN"

                value={stateData.company}
                ref={register({ name: "company" }, {
                  required: true
                })}
                onChange={e => handleChange("company", e.currentTarget.value)}

                className="has-custom-focus style-k2b935li1input" id="comp-kh2ej8htinput" />


              <p  className="error-message-input" style={{ opacity: errors.company ? 1 : 0 }}>
                {errors.company?.message}
              </p>
            </div>

            <div className="style-k2b935li1_with-validation-indication style-k2b935li1_required style-k2b935li1_left-direction style-k2b935li1" data-disabled="false" style={{ width: "200px", height: "43px" }} id="comp-k2b935kj">

              <CountryDropdown
                style={{ paddingLeft: "6px" }} className="custom_select" id="custom_select"
                value={stateData.country}
                ref={register({ name: "country" }, {
                  required: true
                })}
                defaultOptionLabel="PAíS"
                onChange={val => handleChange("country", val)} />


              <p className="error-message-input" style={{ opacity: errors.country ? 1 : 0 }}>
                {errors.country?.message}
              </p>

            </div>

            <div id="comp-k2b936qc" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="184" data-height="42" style={{ cursor: "pointer", height: "42px", minHeight: "18px", width: "184px" }} className="style-k2b93i3c" data-state="desktop shouldUseFlex center">
              <button style={{ cursor: "pointer" }} id="comp-k2b936qclink" className="g-transparent-a style-k2b93i3clink">
                <span id="comp-k2b936qclabel" className="style-k2b93i3clabel">Descargar</span>
              </button>
            </div>




            {/* <div data-packed="true" data-vertical-text="false" style={{ width: "296px", pointerEvents: "none", visibility: "block" }} data-hidden="true" className="txtNew" id="comp-k2b936v4">
              <p className="font_8" style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "futura-lt-w01-light,sans-serif" }}>
                  <span style={{ color: "#05C8A1" }}>{message}</span>
                </span>
              </p>
            </div> */}

          </div>
        </div>

      </form>
      <a ref={down} href={document} target="_top" download style={{ display: "none" }} />

    </div >
  );
}

export default App;
