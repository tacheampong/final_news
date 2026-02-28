import * as d3 from 'd3'

const LineChart = ({aggregated, width, height, margin, line, xscale, yscale, colorscale}) => {

    return (
        <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}>

        {/* Generate the Lines for chart */}
      <g transform={`translate(${margin.left},${margin.top})`}>
            {aggregated.map((item) => (
          <path
            key={item.topic}
            className="line"
            fill="none"
            strokeWidth={1.5}
            stroke={colorscale(item.topic)}
            d={line(item.values)}
          />
        ))}
        {/* Drawing X-axis labels format to NOV 4 */}
      <g
        transform={`translate(0,${height})`}
        ref={(node) =>
          d3
            .select(node)
            .call(
              d3
                .axisBottom(xscale)
                .ticks(d3.timeDay.every(1))
                .tickFormat(d3.timeFormat("%b %d")),
            )
        }
      />
      {/* Drawing Y-axis labels*/}
        <g
          ref={(node) =>
            d3.select(node).call(d3.axisLeft(yscale).ticks(10))
          }
        />
      </g>
    </svg>
    )
}
export default LineChart;