import React from 'react';

const Legend2 = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <svg width={500} height={110}>
                {/* Color Legend Section - Centered horizontally at 250px */}
                <g transform="translate(250, 25)">
                    {/* Global News Item */}
                    <g transform="translate(-100, 0)">
                        <circle cx={0} cy={0} r={7} fill="#2C6CB0" />
                        <text
                            x={12}
                            y={4}
                            style={{ fontSize: '13px', fill: '#2C6CB0', fontWeight: '600' }}
                        >
                            Global News
                        </text>
                    </g>

                    {/* YouTube Item */}
                    <g transform="translate(40, 0)">
                        <circle cx={0} cy={0} r={7} fill="#FF0000" />
                        <text
                            x={12}
                            y={4}
                            style={{ fontSize: '13px', fill: '#FF0000', fontWeight: '600' }}
                        >
                            YouTube
                        </text>
                    </g>
                </g>

                {/* Size Legend Section - Centered horizontally at 250px */}
                <g transform="translate(280, 80)">
                    <text
                        x={-140}
                        y={0}
                        style={{
                            fontSize: '11px',
                            fill: '#666',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}
                    >
                        Dot Size:
                    </text>

                    {/* Visual scale with fixed spacing to prevent text overlap */}
                    <g transform="translate(-50, -4)">
                        <circle cx={0} cy={0} r={3} fill="#999" opacity="0.4" />
                        <text
                            x={0}
                            y={22}
                            textAnchor="middle"
                            style={{ fontSize: '10px', fill: '#606060' }}
                        >
                            Lower Volume
                        </text>

                        <circle cx={50} cy={0} r={6} fill="#999" opacity="0.4" />

                        <circle cx={100} cy={0} r={10} fill="#999" opacity="0.4" />
                        <text
                            x={100}
                            y={22}
                            textAnchor="middle"
                            style={{ fontSize: '10px', fill: '#2c2c2c' }}
                        >
                            Higher Volume
                        </text>
                    </g>
                </g>
            </svg>
        </div>
    );
};

export default Legend2;
