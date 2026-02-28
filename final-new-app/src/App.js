import logo from './logo.svg';
import './App.css';
import YoutubeLineChart from './YoutubeLineChart';
import { useEffect, useState } from 'react';
import * as d3 from "d3"
import ArticlesLineChart from './ArticlesLineChart';

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


function App() {
  const [articleDataset, setArticleDatset] = useState([])
  const [youtubeDataset, setYoutubeDataset] = useState([])
  useEffect(() => {
    async function loadData() {
      const articleData = await getArticleData()
      const youtubeData = await getYoutubeData()
      setArticleDatset(articleData)
      setYoutubeDataset(youtubeData)
    }
    loadData()
  }, [])
  if (articleDataset.length === 0 || youtubeDataset.length === 0) return <div>Loading...</div>
  return (
    <div className="App">
  
    <ArticlesLineChart data={articleDataset}/>
     <YoutubeLineChart data={youtubeDataset}/>
    </div>
  );
}

export default App;
