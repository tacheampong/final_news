async function getData(){
    var data = await d3.csv("institutional_news.csv");
    var cleaned = data.map(function(d){
        return{
            topic: d.topic,
            num_articles: +d.num_articles,
        };
    });

    return cleaned;
}

margin = {top:20, left:80, bottom:70, right:20};
width = 500 - margin.left - margin.right;
height = 500 - margin.top - margin.bottom;

    getData().then((dataset)=>{
        const aggregated = Array.from(
            d3.rollup(
                dataset,
                (v)=>d3.sum(v,(d)=>d.num_articles),
                (d)=>d.topic,
            ),
            ([topic,num_articles])=>({topic, num_articles})
        );

        const svg = d3
            .create("svg")
            .attr("height", height + margin.top + margin.bottom)
            .attr("width", width + margin.left + margin.right);
    
        const chart = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X axis label
        svg
            .append("text")
            .text("Topic")
            .attr("transform", "translate(" + (margin.left + width / 2) + "," + (margin.top + height + 50) + ")")
            .attr("text-anchor", "middle");

        // Y axis label
        svg
            .append("text")
            .text("Number of Articles")
            .attr(
            "transform",
            "translate(" + (margin.left - 60) + "," + (margin.top + height / 2) + ") rotate(-90)")
            .attr("text-anchor", "middle");

        const xscale = d3
            .scaleBand()
            .domain(aggregated.map((d) => d.topic))
            .range([0, width])
            .padding(0.2);

        const yscale = d3
            .scaleLinear()
            .domain([0, d3.max(aggregated, (d) => d.num_articles)])
            .range([height, 0]);

        chart
            .append("g")
            .call(d3.axisBottom(xscale))
            .attr("transform", "translate(0," + height + ")");

        chart.append("g").call(d3.axisLeft(yscale));

        chart
            .selectAll("rect")
            .data(aggregated)
            .join("rect")
            .attr("width", xscale.bandwidth()   )
            .attr("height", (d) => height - yscale(d.num_articles))
            .attr("x", (d) => xscale(d.topic))
            .attr("y", (d) => yscale(d.num_articles))
            .attr("fill", "#ffffff")
            .attr("stroke-width", 1)
            .attr("stroke", "black");
    
        d3.select("body").append(() => svg.node());
        
        console.log("aggregated:", aggregated);
    });