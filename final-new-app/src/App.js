import logo from './logo.svg';
import './App.css';
import YoutubeViewsLineChart from './YoutubeViewsLineChart';
import { useEffect, useState } from 'react';
import * as d3 from "d3"
import ArticlesLineChart from './ArticlesLineChart';
import YoutubeLikesLineChart from './YoutubeLikesLineChart';
import YoutubeCommentsLineChart from './YoutubeCommentsLineChart';
import ArticlesBarChart from "./ArticlesBarChart";
import YoutubeBarChart from "./YoutubeBarChart";
import Legend from './Legend';
async function getArticleData() {
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
async function getYoutubeData() {
  var data = await d3.csv("youtube_topics_summary.csv");
  var change_date = data.flatMap((d) => [
    {
    date: new Date("2024-" + d.date.slice(0, 2) + "-" + d.date.charAt(3)),
    topic: d.topic,
    video_count: parseInt(d.video_count),
    avg_view_count: parseFloat(d.avg_video_count),
    sum_view_count: parseInt(d.sum_view_count),
    avg_like_count: parseFloat(d.avg_like_count),
    sum_like_count: parseInt(d.sum_like_count),
    avg_comment_count: parseFloat(d.avg_comment_count),
    sum_comment_count: parseInt(d.sum_comment_count)
    },
  ]);

  return change_date;
}
async function getArticleDataBar() {
    var data = await d3.csv("institutional_news.csv");
    var cleaned = data.map(function(d){
        return{
            topic: d.topic,
            num_articles: +d.num_articles,
        };
    });

    return cleaned;
}
async function getYoutubeDataBar() {
  var data = await d3.csv("youtube_topics_summary.csv");
      var cleaned = data.map(function(d){
        return{
            topic: d.topic,
            video_count: +d.video_count,
        };
    });

  return cleaned;
}
var titles = [{topic:"conflict/war"}, {topic:"election"}, {topic: "immigration"}]
function App() {
  const [articleDataset, setArticleDatset] = useState([])
  const [youtubeDataset, setYoutubeDataset] = useState([])
  const [articleBarDataset, setArticleBarDataset] = useState([])
  const [youtubeBarDataset, setYoutubeBarDataset] = useState([])
  const [legendData, setLegendData] = useState([])
  const [selectedTopic, setSelectedTopic] = useState(null)
  useEffect(() => {
    async function loadData() {
      const articleData = await getArticleData()
      const youtubeData = await getYoutubeData()
      const youtubeBarData = await getYoutubeDataBar()
      setArticleDatset(articleData)
      setYoutubeBarDataset(youtubeBarData)
      setYoutubeDataset(youtubeData)
      const articleBarData = await getArticleDataBar()
      setArticleBarDataset(articleBarData)
      setLegendData(titles)
    }
    loadData()
  }, [])
  if (articleDataset.length === 0 || youtubeDataset.length === 0 || articleBarDataset.length === 0 || youtubeBarDataset.length === 0) return <div>Loading...</div>
  return (
    <div className="App">
      <h1>
        <span style={{color: "#2C6CB0"}}>What the News Covers</span>{" "}vs.{" "} 
        <span style={{color:"#FF0000"}}>What People Watch</span>
      </h1>
      <h3 className="sub-title">Comparing global news coverage with YouTube engagement</h3>
      <div className="legend-container">
     <Legend aggregated={legendData}/>
      </div>
      <button className="reset-button" onClick={() => setSelectedTopic(null)}>Reset Selection</button>
      <h2>Bar Charts</h2>
      <div className="charts-alignment">
        <ArticlesBarChart data={articleBarDataset} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic}/>
        <YoutubeBarChart data={youtubeBarDataset} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic}/>
      </div>
      <h2>Line Charts</h2>
      <div className='charts-alignment'>
        <ArticlesLineChart data={articleDataset} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic}/>
        <YoutubeViewsLineChart data={youtubeDataset} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic}/>
        <YoutubeCommentsLineChart data={youtubeDataset} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic}/>
        <YoutubeLikesLineChart data={youtubeDataset} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic}/>
        </div>
    </div>
  );
}

export default App;
