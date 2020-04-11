import React, {useEffect, useState} from 'react';
import {style} from "typestyle";
import {Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const Graphic = ({timeStart, velocity1, velocity2, initialDelta1, restart}) =>
{
    const [data, setData] = useState([]);

    useEffect(() =>
    {
        if (restart)
        {
            setData([{
                time: 0,
                V1: -Math.round(velocity1 * 1000) / 1000,
                V2: Math.round(velocity2 * 1000) / 1000
            }]);
        } else
        {
            let newDataItem = {
                time: timeStart ? (Date.now() - timeStart) / 1000 : 0,
                V1: -Math.round(velocity1 * 1000) / 1000,
                V2: Math.round(velocity2 * 1000) / 1000
            };
            setData([...data, newDataItem]);
        }
    }, [velocity1, velocity2])

    const color1 = "#e9453b";
    const id1 = "vel1";

    const color2 = "#82ca9d";
    const id2 = "vel2";

    return (
        <div className={styles.graphic}>
            V(t)
            <ResponsiveContainer width="90%" height="90%">
                <AreaChart data={data} margin={{top: 5, right: 10, bottom: 0, left: -15}}>
                    <defs>
                        <linearGradient id={id1} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color1} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={color1} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <defs>
                        <linearGradient id={id2} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color2} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={color2} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis
                        label="time"
                        strokeWidth="0.5px"
                        stroke="#6a8fb7"
                        dataKey="time"
                        type="number"
                        interval={0}
                        domain={[0, 10]}
                        tick={<CustomizedAxisTick axis="x"/>}
                    />
                    <YAxis
                        label="V"
                        type="number"
                        domain={[-(Math.round(initialDelta1) + 1), (Math.round(initialDelta1) + 1)]}
                        strokeWidth="0.5px"
                        stroke="#6a8fb7"
                        interval={0}
                        tick={<CustomizedAxisTick axis="y"/>}
                    />
                    <CartesianGrid strokeDasharray="1 1" strokeWidth="0.5px"/>
                    <Tooltip labelFormatter={(value) => `time: ${value} s`}/>
                    <ReferenceLine y={0} stroke="red"/>
                    <ReferenceLine y={initialDelta1} stroke="blue"/>
                    <ReferenceLine x={data[data.length - 1]?.time || 0} stroke="blue"/>
                    <Area
                        type="monotone"
                        dataKey="V1"
                        stroke={color1}
                        fillOpacity={1}
                        fill={`url(#${id1})`}
                    />
                    <Area
                        type="monotone"
                        dataKey="V2"
                        stroke={color2}
                        fillOpacity={1}
                        fill={`url(#${id2})`}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Graphic;

const styles = {
    graphic: style({
        marginLeft: 20,
        flex: 1
    }),
};

const CustomizedAxisTick = (props) =>
{
    const {x, y, payload, axis} = props;
    if (payload)
    {
        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    dy={axis === "x" ? 10 : 5}
                    dx={axis === "x" ? 0 : -5}
                    textAnchor="middle"
                    fill="#567090"
                >
                    {payload.value}
                </text>
            </g>
        );
    }
};