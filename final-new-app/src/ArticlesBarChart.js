import * as d3 from 'd3'
import BarChart from './BarChart'

const ArticlesBarChart = ({ data }) => {
    var margin = {top:20, left:80, bottom:70, right:20};
    var width = 500 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    var aggregated = Array.from(
            d3.rollup(
                data,
                (v)=>d3.sum(v,(d)=>d.num_articles),
                (d)=>d.topic,
            ),
            ([topic,num_articles])=>({topic, num_articles})
        );

        const xscale = d3
            .scaleBand()
            .domain(aggregated.map((d) => d.topic))
            .range([0, width])
            .padding(0.2);

        const yscale = d3
            .scaleLinear()
            .domain([0, d3.max(aggregated, (d) => d.num_articles)])
            .range([height, 0]);

        const colorscale = d3
            .scaleOrdinal()
            .domain(data.map((d) => d.topic))
            .range(["#FFA500","#008000", "#8F3DD1"]);
    
    return (
        <div>
            <h2>Institutional News Count by Topic</h2>
            <BarChart aggregated={aggregated} width={width} height={height} margin={margin} xscale={xscale} yscale={yscale} colorscale={colorscale}/>
        </div>
    );
}
export default ArticlesBarChart; 