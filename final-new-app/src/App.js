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
import ToneScatterplot from "./ToneScatterplot";
import ChannelsScatterplot from "./ChannelsScatterplot";
import Legend2 from './Legend2';
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
            <p className="intro-text">
                These visualizations compare global news coverage with YouTube engagement across several political topics. The data reflects activity during the 2024 U.S. Presidential Election period, when political news coverage and online discussion were especially high. Users can click on a topic in any chart to filter the visualizations and explore patterns across datasets. The Reset Selection button clears the filter and returns the charts to their original view.
            </p>
            <img
                src="/website_image.png"
                alt="Website Image"
                className="website-image"
            />
            <p className="image-citation">
                Image source: Rutgers University (How media can shape an election).
            </p>
            <p className="authors-names">
                BY THERESA ACHEAMPONG, SHEVLIN JAFFE, AND SHANIYA KHATUA
            </p>
            <p className="publish-date">Updated on March 5, 2026
            </p>
            <div className="legend-container">
                <Legend aggregated={legendData}/>
            </div>
            <button className="reset-button" onClick={() => setSelectedTopic(null)}>Reset Selection</button>
            <h2>Bar Charts</h2>
            <div className="charts-alignment">
                <ArticlesBarChart data={articleBarDataset} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic}/>
                <YoutubeBarChart data={youtubeBarDataset} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic}/>
            </div>
            <p className="bar-charts-text">
                The bar charts show that elections receive the most attention in both global news coverage and YouTube content during the election period. Global news coverage is especially concentrated on elections compared to other topics. While elections are also the most common topic on YouTube, the distribution of videos across topics is somewhat more balanced than in institutional news coverage.
            </p>
            <h2>Line Charts</h2>
            <div className='charts-alignment'>
                <ArticlesLineChart data={articleDataset} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic}/>
                <YoutubeViewsLineChart data={youtubeDataset} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic}/>
                <YoutubeCommentsLineChart data={youtubeDataset} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic}/>
                <YoutubeLikesLineChart data={youtubeDataset} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic}/>
            </div>
            <p className="line-charts-text">
                These line charts vizualize the counts for a particular form of media (Articles & Youtube) over the election period. For the articles we can see that elections have a significant amount worldwide compared to immigration and war. 
                For article's there's a clear distinction between all topics. When we're comparing views, likes, and comments for Youtube
                we can see some variation within and between the visuals.
                Notable points to analyze is the change from Nov 4 to election day (Nov 5) and the change from election day to after the election day.
        
            </p>
            <h2>Scatter Plots</h2>
            <div className="legend2-container">
            <Legend2 />
            </div>
            <div className="charts-alignment">
                <ToneScatterplot selectedTopic={selectedTopic} />
                <ChannelsScatterplot selectedTopic={selectedTopic} />
            </div>
            <p className="scatter-plots-text">
                These scatter plots show the relationship between volume and sentiment/focus. The News chart explores how tone shifts with article volume, while the YouTube chart highlights which channels focus most heavily on election content.
            </p>
            <p className="disclaimer-text">
                *Disclaimer: The data used in this project is sourced from the GDELT Project and YouTube API, which may have inherent biases and limitations. The visualizations are intended to provide insights into trends and patterns but should not be interpreted as definitive representations of global news coverage or YouTube engagement. Users are encouraged to consider the context and potential biases when interpreting the data.
            </p>
        </div>
    );
}

export default App;
