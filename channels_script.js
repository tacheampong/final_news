// 1. Set dimensions and margins
const margin = {top: 30, right: 200, bottom: 60, left: 80},
      width = 950 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

// 2. Append SVG
const svg = d3.select("#chart")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

const tooltip = d3.select("#tooltip");

// 3. Load Data
d3.csv("youtube_channels.csv").then(data => {
    
    // Parse strings to numbers
    data.forEach(d => {
        d.video_count = +d.video_count;
        d.conflict_count = +d.conflict_count;
        d.election_count = +d.election_count;
        d.immigration_count = +d.immigration_count;
    });

    // Scales
    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.election_count)]).nice()
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.video_count)]).nice()
        .range([height, 0]);

    // Color palette for channels
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Gridlines
    svg.append("g")			
        .attr("class", "grid")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(5).tickSize(-height).tickFormat(""));

    svg.append("g")			
        .attr("class", "grid")
        .call(d3.axisLeft(y).ticks(5).tickSize(-width).tickFormat(""));

    // X Axis (Election Focus)
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .append("text")
            .attr("class", "axis-label")
            .attr("x", width / 2)
            .attr("y", 45)
            .style("text-anchor", "middle")
            .text("Election-Related Videos");

    // Y Axis (Total Volume)
    svg.append("g")
        .call(d3.axisLeft(y))
        .append("text")
            .attr("class", "axis-label")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .attr("x", -height / 2)
            .style("text-anchor", "middle")
            .text("Total Video Count");

    // Add Circles
    svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.election_count))
            .attr("cy", d => y(d.video_count))
            .attr("r", 12)
            .style("fill", d => color(d.channel))
            .on("mouseover", (event, d) => {
                tooltip.transition().duration(100).style("opacity", 1);
                tooltip.html(`
                    <div style="font-weight:bold; border-bottom:1px solid #ccc; margin-bottom:5px;">
                        ${d.channel}
                    </div>
                    <strong>Total Videos:</strong> ${d.video_count}<br/>
                    <strong>Election:</strong> ${d.election_count}<br/>
                    <strong>Conflict:</strong> ${d.conflict_count}<br/>
                    <strong>Immigration:</strong> ${d.immigration_count}
                `)
                .style("left", (event.pageX + 15) + "px")
                .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", () => {
                tooltip.transition().duration(300).style("opacity", 0);
            });

    // Add Legend (Channels)
    const channels = data.map(d => d.channel);
    const legend = svg.selectAll(".legend")
        .data(channels)
        .enter().append("g")
        .attr("transform", (d, i) => `translate(${width + 20}, ${i * 22})`);

    legend.append("rect")
        .attr("width", 12)
        .attr("height", 12)
        .style("fill", color);

    legend.append("text")
        .attr("x", 20)
        .attr("y", 11)
        .style("font-size", "11px")
        .text(d => d);

}).catch(err => {
    console.error("D3 Load Error:", err);
    document.getElementById('error').style.display = 'block';
});
