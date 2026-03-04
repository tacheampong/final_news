const Legend = ({aggregated, margin, colorScale}) => {
    return (
         <svg>
         <g transform={`translate(${margin.left},${margin.top})`}>
        {aggregated.map((item,i) => (
            
            <circle
            cx={20}
            cy={100 + i * 25}
            r={7}
            fill={colorScale(item.topic)}
            ></circle>           

        ))}
            {aggregated.map((item,i) => (
        
            <text
              x={30}
              y={100 + i * 25}
              fill={colorScale(item.topic)}
            >{item.topic}</text>           

        ))}
       
      </g>
    </svg>
    )
}
export default Legend;