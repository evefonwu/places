import React from "react";
import Place from "./Place";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export const FEED_QUERY = gql`
  {
    feed {
      id
      name
      type
      guests
    }
  }
`;

function PlaceList() {
  return (
    <Query query={FEED_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        const places = data.feed;
        return (
          <div className="container">
            <h3 className="section-title">Places to Stay</h3>
            <div className="places-list">
              {places.map((place, index) => (
                <Place key={place.id} place={place} index={index} />
              ))}
            </div>
          </div>
        );
      }}
    </Query>
  );
}

export default PlaceList;
