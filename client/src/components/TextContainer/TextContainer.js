import React from "react";

import { Link } from "react-router-dom";


import onlineIcon from "../../icons/onlineIcon.png";

import "./TextContainer.css";

const TextContainer = ({ users }) => (
  <div className="textContainer">
    {users ? (
      <div>
        <h2>Aktivni korisnici:</h2>
        <div className="activeContainer">
          <h3>
            {users.map(({ name }) => (
              <Link to={`/chat?name=${name}&room=privatna_soba_korisnika_${name}`}>
                <div key={name} className="activeItem">
                  {name}
                  <img alt="Online Icon" src={onlineIcon} />
                </div>
              </Link>
            ))}
          </h3>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
