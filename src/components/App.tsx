import React from 'react';
import logo from './../logo.svg';
import '../styles/App.css';
import {connect} from 'react-redux';
import { simpleAction } from '../redux/simple/simpleAction';
import CakeContainer from '../containers/CakeContainer';
import MapContainer from '../containers/MapContainer';


const App: React.FC = (props:any) => {
  let  simpleAction = (event:any)=>{
    props.simpleAction();
  }
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={(e)=>simpleAction(e)}>Let me clicks</button>

      <pre>
      {
        JSON.stringify(props)
      }
      </pre> */}
      <MapContainer/>
      {/* <CakeContainer/> */}
    </div>
  );  
}

// chnag type any
const mapStateToProps =(state:any)=>({
  ...state
})

const mapDispatchToProps = (dispatch:any)=>({
  simpleAction:()=>dispatch(simpleAction())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
