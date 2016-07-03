import React, {} from 'react';
import {render} from 'react-dom';
import 'whatwg-fetch';

import ProgressCharts from '../src/components/ProgressCharts.js';

fetch('./runtastic-data.json').then((response) => {
  return response.json();
}).then((rawData) => {
  render(<ProgressCharts rawData={rawData} />, document.querySelector('#perf-progression'));
});
