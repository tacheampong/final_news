### URL: ###  
https://tacheampong.github.io/final_news/
### Screencast Video: ###
https://youtu.be/dPvK6xctLDI
### Process Book: ### 
https://docs.google.com/document/d/1TGoPnhZVT5R854Zk8ekFcbQVbyGB7-vf6c5nCCJL2s8/edit?usp=sharing

### Overview: ###
This data visualization site walks through global news coverage and YouTube engagement for three topic areas: conflict/war, election, and immigration. Given that these are widely discussed topics during election season, it would be interesting to see how much coverage and YouTube engagement occur over Nov 4 - Nov 6. Users can explore how new coverage and engagement changes over time and which topic areas have the largest counts across all dates.

### Code Structure: 
- This code structure is code that we added and/or adapted from the template created initially when creating the React app. Additions to /public include our data that loads in within our App.js. Within /src, we’ve changed the initial styling of the App to best replicate the styles of common new article sites. We’ve added React components for each chart type (BarChart, Scatterplot, LineChart) and a Legend for the BarChart/LineChart and a second one specifically for the Scatterplots. 
### Tree
    /final-new-app
        /src
            /data
                institutional_news.csv
                website_image.png
                youtube_channels.csv
                youtube_topics_summary.csv
        App.css
        App.js
        ArticlesBarChart.js
        ArticlesLineChart.js
        BarChart.js
        ChannelsScatterplot.js
        Legend.js
        Legend2.js
        LineChart.js
        ToneScatterplot.js
        YoutubeBarChart.js
        YoutubeCommentsLineChart.js
        YoutubeCLikesLineChart.js
        YoutubeViewsLineChart.js

### Libraries: ###
Library: D3, React
### Features of Interface: ###
- The key at the top is the legend for the BarCharts and LineCharts
- The reset selection button resets the linking for BarCharts and LineCharts
- In the “Bar Chart” section, users can click on a bar, which will isolate all BarCharts and LineCharts to include the selected topic
- In the “Line Chart” section, users can click on a line, which will also isolate all BarCharts and LineCharts to include the selected topic
