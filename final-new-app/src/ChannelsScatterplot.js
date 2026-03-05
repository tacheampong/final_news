import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ChannelsScatterplot = ({ selectedTopic }) => {
    const chartRef = useRef();

    useEffect(() => {
        d3.select(chartRef.current).selectAll("*").remove();
        const margin = {top: 30, right: 50, bottom: 60, left: 80},
            width = 450 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        const svg = d3.select(chartRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        d3.csv("/youtube_channels.csv").then(data => {
            data.forEach(d => {
                d.video_count = +d.video_count;
                d.election_count = +d.election_count;
            });

            const x = d3.scaleLinear().domain([0, d3.max(data, d => d.election_count)]).nice().range([0, width]);
            const y = d3.scaleLinear().domain([0, d3.max(data, d => d.video_count)]).nice().range([height, 0]);

            // Category10 provides a distinct Red/Blue contrast
            const color = d3.scaleOrdinal(d3.schemeReds[5]);

            svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));
            svg.append("g").call(d3.axisLeft(y));

            svg.selectAll(".dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", d => x(d.election_count))
                .attr("cy", d => y(d.video_count))
                .attr("r", 10)
                .style("fill", d => color(d.channel))
                .style("opacity", 0.8);

            svg.append("text")
                .attr("x", width/2).attr("y", -10)
                .style("text-anchor", "middle").style("font-weight", "bold")
                .text("YouTube: Election Focus");
        });
    }, [selectedTopic]);

    return <div ref={chartRef}></div>;
};

export default ChannelsScatterplot;
