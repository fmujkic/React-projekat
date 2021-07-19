import React, { useState } from "react";
import { Link } from "react-router-dom";

import './Join.css';

function Join() {
  const room = "Global channel";


  let val = Math.floor(Math.random() * 100000);
  val = val.toString();
const name = "user" + val;
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Nakon sto pristupite razgovoru bit ce vam dodijeljeno korisničko ime</h1>
        

        <Link  to={`/chat?name=${name}&room=${room}`}>
          <button className="button mt-20" type="submit">
            Join chat
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Join;
