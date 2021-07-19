import React from 'react';

import './RoomContainer.css';

const TextContainer = ({ rooms }) => (
  <div className="textContainer">
   
    {
      rooms
        ? (
          <div>
            <h1>Rooms:</h1>
            <div className="activeContainer">
              <h2>
                {rooms.map((item) => (
                  <div  className="activeItem">
                    {item}
                   
                  </div>
                ))
                }
         
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;