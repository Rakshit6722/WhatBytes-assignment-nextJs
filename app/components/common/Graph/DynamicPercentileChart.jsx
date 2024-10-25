import React, { PureComponent } from 'react';
import { VictoryChart, VictoryLine, VictoryScatter, VictoryAxis, VictoryTooltip } from 'victory';
import { connect } from 'react-redux';

// Sample data
const data = [
  { percentile: 10, numberOfStudents: 2 },
  { percentile: 20, numberOfStudents: 4 },
  { percentile: 30, numberOfStudents: 6 },
  { percentile: 40, numberOfStudents: 8 },
  { percentile: 50, numberOfStudents: 10 },
  { percentile: 60, numberOfStudents: 7 },
  { percentile: 70, numberOfStudents: 5 },
  { percentile: 80, numberOfStudents: 3 },
  { percentile: 90, numberOfStudents: 4 },
  { percentile: 100, numberOfStudents: 1 }
];

// Function to interpolate points between existing data points
const interpolateData = (data) => {
  const interpolated = [];
  for (let i = 0; i < data.length - 1; i++) {
    const start = data[i];
    const end = data[i + 1];
    const step = (end.percentile - start.percentile) / 100; // More points for smoothness
    for (let j = 0; j <= 100; j++) {
      const percentile = start.percentile + j * step;
      const numberOfStudents = start.numberOfStudents + (end.numberOfStudents - start.numberOfStudents) * (j / 100);
      interpolated.push({ percentile, numberOfStudents });
    }
  }
  return interpolated;
};

class DynamicPercentileChart extends PureComponent {
  render() {
    const { percentile } = this.props;

    // Interpolate data for a smoother curve
    const interpolatedData = interpolateData(data);

    // Find the point that corresponds to the user's percentile
    const userPoint = interpolatedData.find((d) => d.percentile === percentile);

    return (
      <div style={{ width: '100%', height: '300px', margin: '0', padding: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <VictoryChart
          domain={{ x: [0, 100], y: [0, 12] }} // Set domain for X and Y axes
          padding={{ top: 10, bottom: 50, left: 30, right: 40 }} // Increased bottom padding for better visibility
        >
          {/* X Axis - Percentile with only specific tick values */}
          <VictoryAxis
            tickValues={[0, 25, 50, 75, 100]} // Only these tick values on X axis
            style={{
              ticks: { stroke: "grey", size: 5 },
              tickLabels: { fontSize: 12, padding: 15, angle: 0 } // Increased padding to prevent cutting
            }}
          />

          {/* Line chart for the number of students */}
          <VictoryLine
            data={interpolatedData}
            x="percentile"
            y="numberOfStudents"
            style={{
              data: { stroke: "#8884d8", strokeWidth: 2 }
            }}
          />

          {/* Scatter point to highlight the user's percentile */}
          <VictoryScatter
            data={userPoint ? [userPoint] : []}
            x="percentile"
            y="numberOfStudents"
            size={7}
            style={{
              data: { fill: "#8884d8" }
            }}
            labels={({ datum }) => `${datum.percentile}\nNumber of Students: ${datum.numberOfStudents}`}
            labelComponent={<VictoryTooltip dy={-7} />}
          />

          {/* Vertical Line for user's percentile */}
          {userPoint && (
            <VictoryLine
              style={{
                data: { stroke: "#8884d8", strokeDasharray: "5,5", strokeWidth: 1.5 }
              }}
              data={[
                { x: percentile, y: 0 },
                { x: percentile, y: userPoint.numberOfStudents }
              ]}
            />
          )}

          {/* Label for "Your Percentile" */}
          {userPoint && (
            <VictoryScatter
              data={[{ x: percentile - 5, y: 9 }]} // Adjust to position near the percentile
              labels={["Your Percentile"]}
              labelComponent={<VictoryTooltip style={{ fontSize: 12, fill: "#8884d8" }} />}
              size={0} // No visible point, only a label
            />
          )}
        </VictoryChart>
      </div>
    );
  }
}

// Map Redux state to props
const mapStateToProps = (state) => {
  return {
    percentile: state.user.percentile, // Get user's percentile from Redux state
  };
};

export default connect(mapStateToProps)(DynamicPercentileChart);
