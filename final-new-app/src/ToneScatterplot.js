import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ToneScatterplot = ({ selectedTopic }) => {
    const chartRef = useRef();

    useEffect(() => {
        d3.select(chartRef.current).selectAll("*").remove();

        const margin = {top: 40, right: 60, bottom: 60, left: 80},
            width = 500 - margin.left - margin.right,
            height = 450 - margin.top - margin.bottom;

        const svg = d3.select(chartRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        d3.csv("/institutional_news.csv").then(data => {
            data.forEach(d => {
                d.num_articles = +d.num_articles;
                d.avg_tone = +d.avg_tone;
            });

            const x = d3.scaleLinear().domain(d3.extent(data, d => d.avg_tone)).nice().range([0, width]);
            const y = d3.scaleLinear().domain([0, d3.max(data, d => d.num_articles)]).nice().range([height, 0]);

            const rScale = d3.scaleSqrt()
                .domain([0, d3.max(data, d => d.num_articles)])
                .range([4, 10]);

            const color = "#2C6CB0";

            // Light Grey Grid Lines
            svg.append("g")
                .attr("class", "grid")
                .call(d3.axisLeft(y).tickSize(-width).tickFormat(""));
            svg.append("g")
                .attr("class", "grid")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x).tickSize(-height).tickFormat(""));

            // Axes
            svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));
            svg.append("g").call(d3.axisLeft(y).tickFormat(d3.format(".2s")));

            // Axis Labels
            svg.append("text")
                .attr("text-anchor", "middle")
                .attr("x", width / 2)
                .attr("y", height + margin.bottom - 15)
                .style("font-size", "14px")
                .text("Average Tone");

            svg.append("text")
                .attr("text-anchor", "middle")
                .attr("transform", "rotate(-90)")
                .attr("y", -margin.left + 25)
                .attr("x", -height / 2)
                .style("font-size", "14px")
                .text("Number of Articles");

            // Dots
            svg.selectAll(".dot")
                .data(data.filter(d => !selectedTopic || d.topic === selectedTopic))
                .enter()
                .append("circle")
                .attr("cx", d => x(d.avg_tone))
                .attr("cy", d => y(d.num_articles))
                .attr("r", d => rScale(d.num_articles))
                .style("fill", color)
                .style("opacity", 0.7);

            svg.append("text")
                .attr("x", width / 2).attr("y", -margin.top / 2)
                .style("text-anchor", "middle").style("font-weight", "bold").style("font-size", "16px")
                .text("News: Volume vs Tone");
        });
    }, [selectedTopic]);

    return (
        <div ref={chartRef}>
            <style>
                {`.grid line { stroke: #e0e0e0; stroke-opacity: 0.6; shape-rendering: crispEdges; }
                  .grid path { stroke-width: 0; }`}
            </style>
        </div>
    );
};

export default ToneScatterplot;
