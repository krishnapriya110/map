import React, { Fragment } from "react";

import styled from "styled-components";
import MapBoxGLMap from "../components/MapBoxGLMap";
import { SearchableMapBox } from "../components/SearchableMapBox";
import { UberMapbox } from "../components/UberMapbox";
import { ExternalData } from "../components/ExternalData";
import { IndorData } from "../components/IndorData";
import { Dummydata } from "../components/Dummydata";

export const Header: any = styled("header")`
  width: 100vw;
  height: 80px;
  border-bottom: 2px solid #222;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MapContainer = ({ ...props }) => {
  return (
    <Fragment>
      <Header>
        <h1>Map Component</h1>
      </Header>
      <main>
        <UberMapbox />
        {/* <ExternalData/> */}
        {/* <IndorData/> */}
        {/* <Dummydata/> */}
      </main>
    </Fragment>
  );
};

export default MapContainer;
