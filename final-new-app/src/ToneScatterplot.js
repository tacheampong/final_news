import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ToneScatterplot = ({ selectedTopic }) => {
    const chartRef = useRef();

    useEffect(() => {
        d3.select(chartRef.current).selectAll("*").remove();
        const margin = {top: 30, right: 160, bottom: 60, left: 80},
            width = 450 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

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

            // Updated to match your blue/red theme (Tableau10 contains both)
            const color = d3.scaleOrdinal(d3.schemeBlues[5]);

            svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));
            svg.append("g").call(d3.axisLeft(y).tickFormat(d3.format(".2s")));

            svg.selectAll(".dot")
                .data(data.filter(d => !selectedTopic || d.topic === selectedTopic))
                .enter()
                .append("circle")
                .attr("cx", d => x(d.avg_tone))
                .attr("cy", d => y(d.num_articles))
                .attr("r", 8)
                .style("fill", d => color(d.topic))
                .style("opacity", 0.7);

            svg.append("text")
                .attr("x", width/2).attr("y", -10)
                .style("text-anchor", "middle").style("font-weight", "bold")
                .text("News: Volume vs Tone");
        });
    }, [selectedTopic]);

    return <div ref={chartRef}></div>;
};

export default ToneScatterplot;
