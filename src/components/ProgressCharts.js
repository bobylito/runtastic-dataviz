import React, {} from 'react';
import DistanceChart from './DistanceChart.js';
import SpeedChart from './SpeedChart.js';

export default function(props) {
  return <div> 
    <DistanceChart {...props}/>
    <SpeedChart {...props}/>
  </div>;
}
