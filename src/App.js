import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import './App.css';

/**
* Courtesy: https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json
* Looking topojson for other countries/world? 
* Visit: https://github.com/markmarkoh/datamaps
*/
const INDIA_TOPO_JSON = require('./india.topo.json');

const PROJECTION_CONFIG = {
  scale: (window.innerHeight),
  center: [78.9629, 22.5937] // always in [East Latitude, North Longitude]
};

// Red Variants
const COLOR_RANGE = [
  '#0f3e85', '#5366a3', '#8792c1', '#bac1e0', '#eef1ff'
];
COLOR_RANGE.reverse(  )
const DEFAULT_COLOR = '#EEE';


const geographyStyle = {
  default: {
    outline: 'black'
  },
  hover: {
    fill: '#ffffff',
    transition: 'all 250ms',
    outline: 'none'
  },
  pressed: {
    outline: 'none'
  }
};

// will generate random heatmap data on every call
const getHeatMapData = () => {
  return [
    { id: 'AP', state: 'Andhra Pradesh', value: 0 },
    { id: 'AR', state: 'Arunachal Pradesh', value: 0 },
    { id: 'AS', state: 'Assam', value: 0 },
    { id: 'BR', state: 'Bihar', value:0 },
    { id: 'CT', state: 'Chhattisgarh', value: 0 },
    { id: 'GA', state: 'Goa', value: 0 },
    { id: 'GJ', state: 'Gujarat', value: 5 },
    { id: 'HR', state: 'Haryana', value: 0 },
    { id: 'HP', state: 'Himachal Pradesh', value: 0 },
    { id: 'JH', state: 'Jharkhand', value: 0 },
    { id: 'KA', state: 'Karnataka', value: 20 },
    { id: 'KL', state: 'Kerala', value: 0},
    { id: 'MP', state: 'Madhya Pradesh', value: 0 },
    { id: 'MH', state: 'Maharashtra', value: 30 },
    { id: 'MN', state: 'Manipur', value: 0 },
    { id: 'ML', state: 'Meghalaya', value: 0 },
    { id: 'MZ', state: 'Mizoram', value: 0 },
    { id: 'NL', state: 'Nagaland', value: 0 },
    { id: 'OD', state: 'Odisha', value: 0 },
    { id: 'PB', state: 'Punjab', value:0 },
    { id: 'RJ', state: 'Rajasthan', value: 0},
    { id: 'SK', state: 'Sikkim', value: 0 },
    { id: 'TN', state: 'Tamil Nadu', value:3 },
    { id: 'TS', state: 'Telangana', value: 3 },
    { id: 'TR', state: 'Tripura', value: 0 },
    { id: 'UK', state: 'Uttarakhand', value: 0 },
    { id: 'UP', state: 'Uttar Pradesh', value: 6 },
    { id: 'WB', state: 'West Bengal', value: 12 },
    { id: 'AN', state: 'Andaman and Nicobar Islands', value: 0 },
    { id: 'CH', state: 'Chandigarh', value: 1 },
    { id: 'DN', state: 'Dadra and Nagar Haveli', value: 0 },
    { id: 'DD', state: 'Daman and Diu', value: 0 },
    { id: 'DL', state: 'Delhi', value: 2 },
    { id: 'JK', state: 'Jammu and Kashmir', value: 0 },
    { id: 'LA', state: 'Ladakh', value:0 },
    { id: 'LD', state: 'Lakshadweep', value:0 },
    { id: 'PY', state: 'Puducherry', value: 0 }
  ];
};

function App() {
  const [tooltipContent, setTooltipContent] = useState('');
  const [data] = useState(getHeatMapData());

  const getIndex = (val)=>{
    if(val===0){
      return 0
    }else if (val>0 && val<6){
      return 1
    }else if(val>=6 && val < 14){
      return 2
    }else if(val >=14 && val<19){
      return 3
    }else{
      return 4
    }
  }
  const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      if(current.value > 1){
        setTooltipContent(`${geo.properties.name}: ${current.value} orders`);
      }else{
        setTooltipContent(`${geo.properties.name}: ${current.value} order`);
      }
    };
  };

  const onMouseLeave = () => {
    setTooltipContent('');
  };
  return (
    <div style={{position: 'fixed', left: 0, top: -100, height: `100%`, width: `100%`, zIndex:-1}}>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      
        <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          data-tip=""  
          height={window.height}
          width={window.width}
        >
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                //console.log(geo.id);
                const current = data.find(s => s.id === geo.id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={current ? COLOR_RANGE[getIndex(current.value)] : DEFAULT_COLOR}
                    style={geographyStyle}
                    stroke="#808080"
                    onMouseEnter={onMouseEnter(geo, current)}
                    onMouseLeave={onMouseLeave}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>  
    </div>
  );
}

export default App;
