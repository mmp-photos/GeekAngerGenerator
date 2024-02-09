// PRIMARY FILE FOR GEEK ANGER GENERATOR //
//
// App.js is the file that creaates the single page React App GEEK ANGER GENERATOR   //
// The app relies on publicly available 3rd party API data.  The data will be        //
// multiple disparite API calls will be made for each view and the results will be   //
// combined into a single view that mismatches data from each call to provoke anger. //
///////////////////////////////////////////////////////////////////////////////////////

// IMPORTS //
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WinterSpringfield from './pages/WinterSpringfield';

// PAGE CONSTRUCTION START //
function App() {
  return (
    <div style={{width: "100%"}}>
        <Routes>
            <Route path="/" element = {<WinterSpringfield />} />
        </Routes>

    </div>
  );
}
// PAGE CONSTRUCTION END //

// EXPORT STATEMENT //
export default App;