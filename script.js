async function getData() {
  var data = await d3.csv("institutional_news.csv");
  var change_date = data.flatMap((d) => [
    {
      date: new Date("2024-" + d.date.slice(0, 2) + "-" + d.date.charAt(3)),
      topic: d.topic,
      num_articles: parseInt(d.num_articles),
      avg_tone: parseFloat(d.avg_tone),
      sentiment_label: d.sentiment_label,
      sentiment_polarity: parseInt(d.sentiment_polarity),
    },
  ]);

  return change_date;
}

margin = { top: 20, left: 60, bottom: 20, right: 20 };
width = 500 - margin.left - margin.right;
height = 500 - margin.top - margin.bottom;

getData().then((dataset) => {
  const aggregated = Array.from(
    d3.rollup(
      dataset,
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
    .domain(d3.extent(dataset, (d) => d.date))
    .range([0, width]);
  const yMax = d3.max(aggregated, (topic) =>
    d3.max(topic.values, (d) => d.num_articles),
  );
  var y = d3.scaleLinear().domain([0, yMax]).range([height, 0]);

  console.log(aggregated);
  // Declare the line generator.
  const line = d3
    .line()
    .x((d) => x(d.date))
    .y((d) => y(d.num_articles));

  const svg = d3
    .create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  // Add the x-axis.
  const chart = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  //drawing x-axis
  chart
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(d3.timeDay.every(1))
        .tickFormat(d3.timeFormat("%b %d")),
    );
  //drawing y-axis
  chart.append("g").call(d3.axisLeft(y).ticks(10));

  chart
    .selectAll(".line")
    .data(aggregated)
    .join("path")
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", (d) => line(d.values));

  console.log(
    "max in dataset:",
    d3.max(dataset, (d) => d.num_articles),
  );

  console.log(
    "max in aggregated:",
    d3.max(aggregated, (topic) => d3.max(topic.values, (d) => d.num_articles)),
  );
  d3.select("body").append(() => svg.node());
});
