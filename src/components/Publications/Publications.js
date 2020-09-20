import React from "react";
import { Grid } from "semantic-ui-react";
import { map } from "lodash";
import PreviewPublication from "./PreviewPublication";
import "./Publications.scss";

const Publications = ({ getPublications }) => {
  return (
    <div className="publications">
      <h1>Publications</h1>
      <Grid columns="4">
        {map(getPublications, (publication, index) => (
          <Grid.Column key={index}>
            <PreviewPublication publication={publication} />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
};

export default Publications;
