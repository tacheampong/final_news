import * as d3 from 'd3'
const Legend2 = () => {

        return (
          <svg width={300} height={50}>
          <g transform="translate(0,20)">

          <g transform="translate(80,0)">
            <circle
              cx={0}
              cy={0}
              r={7}
              fill= "#2C6CB0"
            />
            <text
              x={0}
              y={20}        // text below circle
              textAnchor="middle"
              fill= "#2C6CB0"
            >
              Global News
            </text>
          </g>

            <g transform="translate(200,0)">
            <circle
              cx={0}
              cy={0}
              r={7}
              fill= "#FF0000"
            />
            <text
              x={0}
              y={20}        // text below circle
              textAnchor="middle"
              fill= "#FF0000"
            >
              YouTube
            </text>
          </g>

        </g>
      </svg>
    );
  };
export default Legend2;