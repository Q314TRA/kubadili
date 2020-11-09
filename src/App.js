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
        console.log("Document written with ID: ", docRef.id);
        setMessage("¡Gracias por tu mensaje!");
        down.current.click();
      })
      .catch(function (error) {
        setMessage("Ah ocurrido un error, intentalo de nuevo mas tarde, Gracias!");
        console.error("Error adding document: ", error);
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

            <div data-packed="true" data-vertical-text="false" style={{ width: "116px", pointerEvents: "none" }} className="txtNew" id="comp-k2bans6b">
              <h3 className="font_3" style={{ fontSize: "32px" }}>
                <span style={{ color: "#300431" }}>
                  <span style={{ fontSize: "32px" }}>Vivo en&nbsp;
      </span>
                </span>
              </h3>
            </div>
            <div className="style-k2c7xtd0_left-direction style-k2c7xtd0" data-disabled="false" style={{ width: "350px", minHeight: "44px", height: "48px" }} data-state="valid" id="comp-k2ba7d67">
              <label style={{ paddingLeft: "0", paddingRight: "20px", display: "none", marginBottom: "14px", textAlign: "left", direction: "ltr" }} for="comp-k2ba7d67collection" id="comp-k2ba7d67label" className="style-k2c7xtd0label">
              </label>
              <div className="style-k2c7xtd0_selector-wrapper">

                <CountryDropdown
                  style={{ paddingLeft: "6px" }} className="style-k2c7xtd0_extended-placeholder-style has-custom-focus  style-k2c7xtd0collection" id="comp-k2ba7d67collection"

                  value={stateData.country}
                  ref={register({ name: "country" }, {
                    required: true
                  })}
                  defaultOptionLabel="Seleccione un país"
                  onChange={val => handleChange("country", val)} />

                <p id="comp-country" className="comp-country" style={{ opacity: errors.country ? 1 : 0 }} >
                  {errors.country?.message}
                </p>



                {/* 

                <option selected="" value="" default="" style={{ display: "none" }} disabled="">una ONG </option>
                <option value="una ONG">una ONG       </option>
                <option value="Gobierno">Gobierno       </option>
                <option value="Item 1">Empresa social       </option>
                <option value="Empresa">Otro       </option>

                </select> */}
                <div id="comp-k2ba7d67arrow" className="style-k2c7xtd0arrow">
                  <div className="style-k2c7xtd0_svg_container">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.2828 4.89817" id="comp-k2ba7d67icon" className="style-k2c7xtd0icon">
                      <defs>
                      </defs>
                      <title>arrow&amp;amp;v
        </title>
                      <path d="M4.64116,4.89817a.5001.5001,0,0,1-.34277-.13574L.15727.86448A.50018.50018,0,0,1,.84282.136L4.64116,3.71165,8.44.136a.50018.50018,0,0,1,.68555.72852L4.98393,4.76243A.5001.5001,0,0,1,4.64116,4.89817Z" className="style-k2c7xtd0_cls-1">
                      </path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>


            <div className="style-k2b935li1_with-validation-indication style-k2b935li1_required style-k2b935li1_left-direction style-k2b935li1" data-disabled="false" style={{ width: "244px", height: "43px" }} id="comp-k2b935kj">
              <label style={{ paddingLeft: "2px", paddingRight: "20px", display: "inline-block", marginBottom: "6px", textAlign: "left", direction: "ltr" }} for="comp-k2b935kjinput" id="comp-k2b935kjlabel" className="style-k2b935li1label">NOMBRE
      </label>
              <input type="text" style={{ paddingLeft: "2px" }}

                value={stateData.name}
                ref={register({ name: "name" }, {
                  required: true
                })}
                onChange={e => handleChange("name", e.currentTarget.value)}
                className="has-custom-focus style-k2b935li1input" id="comp-k2b935kjinput" />


              <p id="comp-k2b935kjmessage" className="style-k2b935li1message" style={{ opacity: errors.name ? 1 : 0 }}>
                {errors.name?.message}
              </p>


            </div>

            <div className="style-k7kujtyp_required style-k7kujtyp_left-direction style-k7kujtyp" data-disabled="false" style={{ width: "244px", height: "43px" }} id="comp-k7kujtvb">
              <label style={{ paddingLeft: "2px", paddingRight: "20px", display: "inline-block", marginBottom: "6px", textAlign: "left", direction: "ltr" }} for="comp-k7kujtvbinput" id="comp-k7kujtvblabel" className="style-k7kujtyplabel">APELLIDO
      </label>
              <input type="text" style={{ paddingLeft: "2px" }}

                value={stateData.lastName}
                ref={register({ name: "lastName" }, {
                  required: true
                })}
                onChange={e => handleChange("lastName", e.currentTarget.value)}

                className="has-custom-focus style-k7kujtypinput" id="comp-k7kujtvbinput" />

              <p id="comp-k7kujtvbmessage" className="style-k7kujtypmessage" style={{ opacity: errors.lastName ? 1 : 0 }}>
                {errors.lastName?.message}
              </p>


            </div>
            <div className="style-k2b935sx1_required style-k2b935sx1_left-direction style-k2b935sx1" data-disabled="false" style={{ width: "244px", height: "43px" }} id="comp-k2b935s1">
              <label style={{ paddingLeft: "2px", paddingRight: "20px", display: "inline-block", marginBottom: "6px", textAlign: "left", direction: "ltr" }} for="comp-k2b935s1input" id="comp-k2b935s1label" className="style-k2b935sx1label">E-MAIL </label>

              <input type="email" style={{ paddingLeft: "2px" }}
                value={stateData.email}
                ref={register({ name: "email" }, {
                  required: true
                })}
                onChange={e => handleChange("email", e.currentTarget.value)}
                className="has-custom-focus style-k2b935sx1input" id="comp-k2b935s1input" />


              <p id="comp-k2b935s1message" className="style-k2b935sx1message" style={{ opacity: errors.email ? 1 : 0 }}>
                {errors.email?.message}
              </p>


            </div>

            <div className="style-k2b935li1_required style-k2b935li1_left-direction style-k2b935li1" data-disabled="false" style={{ width: "244px", height: "43px" }} id="comp-kh2ej8ht">
              <label style={{ paddingLeft: "2px", paddingRight: "20px", display: "inline-block", marginBottom: "6px", textAlign: "left", direction: "ltr" }} for="comp-kh2ej8htinput" id="comp-kh2ej8htlabel" className="style-k2b935li1label">ORGANIZACIÓN O GOBIERNO</label>
              <input type="text" style={{ paddingLeft: "2px" }}

                value={stateData.company}
                ref={register({ name: "company" }, {
                  required: true
                })}
                onChange={e => handleChange("company", e.currentTarget.value)}

                className="has-custom-focus style-k2b935li1input" id="comp-kh2ej8htinput" />


              <p id="comp-kh2ej8htmessage" className="style-k2b935li1message" style={{ opacity: errors.company ? 1 : 0 }}>
                {errors.company?.message}
              </p>



            </div>

            <div id="comp-k2b936qc" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="184" data-height="42" style={{ cursor: "pointer", height: "42px", minHeight: "18px", width: "184px" }} className="style-k2b93i3c" data-state="desktop shouldUseFlex center">
              <button style={{ cursor: "pointer" }} id="comp-k2b936qclink" className="g-transparent-a style-k2b93i3clink">
                <span id="comp-k2b936qclabel" className="style-k2b93i3clabel">ENVIAR </span>
              </button>
            </div>


            <div data-packed="true" data-vertical-text="false" style={{ width: "296px", pointerEvents: "none", visibility: (message ? "block" : "hidden") }} data-hidden="true" className="txtNew" id="comp-k2b936v4">
              <p className="font_8" style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "futura-lt-w01-light,sans-serif" }}>
                  <span style={{ color: "#05C8A1" }}>{message}</span>
                </span>
              </p>
            </div>

          </div>
        </div>

      </form>
      <a ref={down} href={document} target="_top" download style={{ display: "none" }} />

    </div >
  );
}

export default App;
