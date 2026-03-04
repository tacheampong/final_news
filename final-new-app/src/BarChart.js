import * as d3 from 'd3'

const BarChart = ({aggregated, width, height, margin, xscale, yscale, colorscale}) => {

    return (
        <svg
            height={height + margin.top + margin.bottom}
            width={width + margin.left + margin.right}
        >
          <text
            transform={`translate(${margin.left + width / 2},${margin.top + height + 50})`}
            textAnchor="middle"
          >
            Topic
          </text>
          <text
            transform={`translate(${margin.left - 60},${margin.top + height / 2}) rotate(-90)`}
            textAnchor="middle"
          >
            Count
          </text>
        {/* Generate the Bars for chart */}
      <g transform={(`translate(${margin.left},${margin.top})`)}>
            {aggregated.map((item) => {
              const value = item.video_count ?? item.num_articles;
              return (
                <rect
                  key={item.topic}
                  x={xscale(item.topic)}
                  y={yscale(value)}
                  width={xscale.bandwidth()}
                  height={height - yscale(value)}
                  fill={colorscale(item.topic)}
                />
              );
            })}
        {/* X-axis */}
      <g
        transform={`translate(0,${height})`}
        ref={(node) =>
          d3
            .select(node)
            .call(
              d3
                .axisBottom(xscale),
            )
        }
      />
      {/* Y-axis */}
        <g
          ref={(node) =>
            d3.select(node).call(d3.axisLeft(yscale),
            d3.select(node).selectAll(".tick line").clone()
              .attr("x2", width)
              .attr("stroke-opacity", 0.1))
          }
        />
      </g>
    </svg>
    )
}
export default BarChart;