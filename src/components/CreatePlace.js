import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { FEED_QUERY } from "./PlaceList";

const POST_MUTATION = gql`
  mutation PostMutation($name: String!, $type: String!, $guests: String!) {
    post(name: $name, type: $type, guests: $guests) {
      id
    }
  }
`;

function CreateLink(props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [guests, setGuests] = useState("");

  return (
    <div className="container">
      <h3 className="section-title">What kind of place do you have?</h3>
      <div>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
        />
        <input
          type="text"
          name="type"
          value={type}
          onChange={(event) => setType(event.target.value)}
          placeholder="What kind of place do you have?"
        />
        <input
          type="text"
          value={guests}
          onChange={(event) => setGuests(event.target.value)}
          placeholder="How many guests?"
        />
        <Mutation
          mutation={POST_MUTATION}
          variables={{ name, type, guests }}
          onCompleted={() => props.history.push("/")}
          update={(store, { data: { post } }) => {
            const data = store.readQuery({ query: FEED_QUERY });
            data.feed.unshift(post);
            store.writeQuery({
              query: FEED_QUERY,
              data,
            });
          }}
        >
          {(postMutation) => (
            <button onClick={postMutation}>Add Your Place</button>
          )}
        </Mutation>
      </div>
    </div>
  );
}

export default CreateLink;
