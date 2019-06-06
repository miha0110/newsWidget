import React from 'react';
import './finance.css';
import { Chart } from "react-google-charts";

export class Finance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

    render() {
      
      return (
        <div className="finance">
          <h3>Finance</h3>
          <div id="chart">
            <Chart
            width={500}
            height={200}
            chartType="Line"
            loader={<div>Loading Chart</div>}
            data={this.props.finance}
            options={{
              chart: {
                subtitle: 'Points scored',           
              },
            }}
            rootProps={{ 'data-testid': '2' }}
            />
          </div>
        </div>
      );
    }   
  }
  