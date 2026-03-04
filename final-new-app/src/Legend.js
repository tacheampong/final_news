import * as d3 from 'd3'
const Legend = ({aggregated}) => {
    var margin = { top: 20, left: 80, bottom: 70, right: 20 };

    var colorScale = d3.scaleOrdinal()
          .domain(aggregated.map(d => d.topic))
          .range(["#FFA500","#008000", "#8F3DD1" ])
    return (
 
  <svg width={300} height={50}>
    <g transform={`translate(${margin.left},${margin.top})`}>
      {aggregated.map((item, i) => {
        const spacing = 85; // space between legend items
        const xPos = i * spacing;

        return (
          <g key={item.topic} transform={`translate(${xPos}, 1)`}>
            <circle
              cx={-10}
              cy={0}
              r={7}
              fill={colorScale(item.topic)}
            />
            <text
              x={-10}
              y={20}        // text below circle
              textAnchor="middle"
              fill={colorScale(item.topic)}
            >
              {item.topic}
            </text>
          </g>
        );
      })}
    </g>
  </svg>
);
  
}
export default Legend;