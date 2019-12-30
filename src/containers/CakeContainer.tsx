import React from "react";
import { buyCake } from "../redux/cake/cakeAction";
import { CakeStateInterface } from "../redux/cake/cakeTypes";

import { connect } from "react-redux";

const CakeContainer = (props: any) => {
  return (
    <div>
      {console.log(props)}
      <h1>Cake Component - {props.cakeReducer.noOfCakes}</h1>
      <button onClick={() => props.buyCakes()}>Buy Cake</button>
    </div>
  );
};

const mapStateToProps = (state: CakeStateInterface) => ({
  ...state
});

const mapDispatchToProps = (dispatch: any) => ({
  buyCakes: () => dispatch(buyCake())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CakeContainer);
