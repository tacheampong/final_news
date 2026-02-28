import * as d3 from "d3";
import LineChart from "./LineChart";
const ArticlesLineChart = ({data}) => {
  var margin = { top: 20, left: 60, bottom: 20, right: 20 };
  var width = 500 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;

  // turns dict into an array of dictionaries {topic:string values:[...]}
  var aggregated = Array.from(
    d3.rollup(
      data,
      (v) => d3.sum(v, (d) => d.num_articles),
      (d) => d.topic,
      (d) => d.date,
    ),
    ([topic, dateMap]) => ({
      topic,
      values: Array.from(dateMap, ([date, total]) => ({
        date,
        num_articles: total,
      })).sort((a, b) => a.date - b.date),
    }),
  );
  var x = d3
    .scaleUtc()
    .domain(d3.extent(data, (d) => d.date))
    .range([0, width]);
  const yMax = d3.max(aggregated, (topic) =>
    d3.max(topic.values, (d) => d.num_articles),
  );
  console.log(aggregated);
  // Declare the line generator.
  const line = d3
    .line()
    .x((d) => x(d.date))
    .y((d) => y(d.num_articles));
     var colorScale = d3.scaleOrdinal()
            .domain(data.map(d => d.topic))
            .range(["#FFA500","#008000", "#8F3DD1" ])

  var y = d3.scaleLinear().domain([0, yMax]).range([height, 0]);

  return (
    <div>
    <h2>Articles Line Chart</h2>
    <LineChart aggregated={aggregated} width={width} height={height} margin={margin} line={line} xscale={x} yscale={y} colorscale={colorScale}/>
    </div>
    
  );
};



export default ArticlesLineChart;
