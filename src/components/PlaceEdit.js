import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const UPDATE_MUTATION = gql`
  mutation UpdateMutation(
    $id: ID!
    $name: String!
    $type: String!
    $guests: String!
  ) {
    updatePlace(id: $id, name: $name, type: $type, guests: $guests) {
      id
      name
      type
      guests
    }
  }
`;

function PlaceEdit({ place }) {
  const [name, setName] = useState(place.name);
  const [type, setType] = useState(place.type);
  const [guests, setGuests] = useState(place.guests);
  const id = place.id;

  return (
    <>
      <h3>Edit Place {place.name}</h3>
      <form>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          name="type"
          value={type}
          onChange={(event) => setType(event.target.value)}
        />
        <input
          type="text"
          value={guests}
          onChange={(event) => setGuests(event.target.value)}
        />
        <Mutation
          mutation={UPDATE_MUTATION}
          variables={{ id, name, type, guests }}
        >
          {(updateMutation) => (
            <button onClick={updateMutation}>Save Changes</button>
          )}
        </Mutation>
      </form>
    </>
  );
}

export default PlaceEdit;
