import React, { useState } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { useParams } from "react-router-dom";
import { FEED_QUERY } from "./PlaceList";
import PlaceEdit from "./PlaceEdit";

const PLACE_QUERY = gql`
  query PlaceQuery($id: ID!) {
    place(id: $id) {
      id
      name
      type
      guests
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation DeleteMutation($id: ID!) {
    deletePlace(id: $id) {
      id
    }
  }
`;

const updateCacheAfterDelete = (store, placeId) => {
  const data = store.readQuery({ query: FEED_QUERY });
  data.feed = data.feed.filter((place) => place.id !== placeId);
  store.writeQuery({ query: FEED_QUERY, data });
};

function PlaceDetails(props) {
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();

  return (
    <>
      <Query query={PLACE_QUERY} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;

          return (
            <div>
              <div className="container">
                <div className="actions-heading section-title">
                  <h3>Place details for: {data.place.name}</h3>
                  <div className="actions-panel">
                    {isEditing ? (
                      <div onClick={() => setIsEditing(false)}>
                        <h3>Cancel edit</h3>
                      </div>
                    ) : (
                      <div onClick={() => setIsEditing(true)}>
                        <h3>Edit place</h3>
                      </div>
                    )}
                  </div>
                </div>
                {isEditing ? (
                  <div>
                    <PlaceEdit place={data.place} />
                  </div>
                ) : (
                  <div>
                    {data.place.name} ({data.place.type} for {data.place.guests}{" "}
                    guests)
                  </div>
                )}
              </div>
              <div>
                <Mutation
                  mutation={DELETE_MUTATION}
                  variables={{ id }}
                  update={(store, { data }) => {
                    updateCacheAfterDelete(store, id);
                  }}
                  onCompleted={() => props.history.push("/")}
                >
                  {(deleteMutation) => (
                    <div className="delete-panel">
                      <div
                        onClick={deleteMutation}
                        className="delete-action container"
                      >
                        Delete place
                      </div>
                    </div>
                  )}
                </Mutation>
              </div>
            </div>
          );
        }}
      </Query>
    </>
  );
}

export default PlaceDetails;
