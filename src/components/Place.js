import React from "react";
import { Link } from "react-router-dom";

function Place(props) {
  return (
    <div className="place-list-item">
      <Link to={`/place/${props.place.id}`}>
        <div className="place-name">{props.place.name}</div>
        <div>
          {props.place.type} for {props.place.guests} guests
        </div>
      </Link>
    </div>
  );
}

export default Place;
