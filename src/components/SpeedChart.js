import React, {} from 'react';
import {VictoryChart, VictoryScatter, VictoryAxis, VictoryLine} from 'victory';
import stats from 'simple-statistics';

export default function(props) {
  const runData = props.rawData.map((r) => {
    const asDate = new Date(r.data.attributes.start_time);
    return  {
      x: asDate,
      xRaw: asDate.getTime(),
      y: r.data.attributes.average_speed
    }
  }).sort(({x: xA}, {x: xB}) => {
    return xB - xA;
  });

  const timeData = runData.map(({x, y}) => x);
  const timeDomain = [Math.min.apply(undefined, timeData), Math.max.apply(undefined, timeData)];
  const maxY = Math.max.apply(undefined, runData.map((d) => d.y));
  const datapoints = runData.map(({xRaw, y}) => [xRaw, y]);
  const regressionLine = stats.linearRegressionLine(stats.linearRegression(datapoints));

  const regressionData = [
    {
      x: timeDomain[0],
      y: regressionLine(timeDomain[0])
    },
    {
      x: timeDomain[1],
      y: regressionLine(timeDomain[1])
    }
  ];

  return (<VictoryChart scale={{x: 'time'}} domain={{y: [0, maxY]}} domainPadding={{x: 10}}>
    <VictoryAxis dependentAxis style={{
      grid: {
        stroke: "grey",
        strokeWidth: 1
      }
    }}/>
    <VictoryAxis/>
    <VictoryScatter data={runData} standalone={false}/>
    <VictoryLine data={regressionData} standalone={false}
     style={{
       data: {
         stroke: "#822722"
       },
     }}
    />
  </VictoryChart>);
};
