import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const color1 = "#e9453b";
const id1 = "vel1";

const color2 = "#82ca9d";
const id2 = "vel2";

const color3 = "#ffc800";
const id3 = "s";

const Graphic = ({timeStart, velocity1, velocity2, initialDelta1, restart, init}) =>
{
    const [data, setData] = useState([]);
    const [checked, setChecked] = useState(false);

    useEffect(() =>
    {
        const newObj = {t: 0};
        if (restart)
        {
            if (checked)
            {
                newObj["S"] = 0
            } else
            {
                newObj["V1"] = -velocity1;
                newObj["V2"] = velocity2;
            }
            setData([newObj]);
        } else
        {
            newObj["t"] = timeStart;
            if (checked)
            {
                newObj["S"] = parseFloat((initialDelta1 * timeStart / 2).toFixed(3))
            } else
            {
                newObj["V1"] = -parseFloat(velocity1.toFixed(3));
                newObj["V2"] = parseFloat(velocity2.toFixed(3));
            }
            setData([...data, newObj]);
        }
    }, [velocity1, velocity2])

    const onChangeChecked = useCallback(() =>
    {
        setChecked(state => !state);
        init();
    }, [init]);

    const toggle = useMemo(() =>
        {
            return (
                <label className="toggle">
                    <input type="checkbox" onChange={onChangeChecked} checked={checked}/>
                    <span className="slider"/>
                </label>
            )
        }, [checked, onChangeChecked]
    );

    return (
        <div style={{
            width: "calc(50% - 5px)",
            height: "calc(100% - 10px)",
            verticalAlign: "top",
            margin: "0 10px 10px 0",
            background: "white",
            boxShadow: "inset rgb(136, 136, 136) 0px 0px 3px 0px",
            borderRadius: "2px",
            display: "inline-block"
        }}>
            <div style={{
                paddingLeft: 20,
                height: 30,
                display: "flex",
                alignItems: "flex-end"
            }}>
                V(t) {toggle} S(t)
            </div>
            <div style={{minWidth: 320, minHeight: 300, width: "90%", height: "90%"}}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{top: 25, right: 10, bottom: 0, left: -15}}>
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
                        <defs>
                            <linearGradient id={id3} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color3} stopOpacity={0.8}/>
                                <stop offset="95%" stopColor={color3} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis
                            label={{value: 'time', position: 'insideBottomRight', offset: 35}}
                            strokeWidth="0.5px"
                            stroke="#6a8fb7"
                            dataKey="t"
                            type="number"
                            interval={0}
                            domain={[0, 6]}
                            tick={<CustomizedAxisTick axis="x"/>}
                        />
                        <YAxis
                            type="number"
                            domain={[-Math.ceil(initialDelta1 + (checked ? 2 : 0)), Math.ceil(initialDelta1 + (checked ? 2 : 0))]}
                            strokeWidth="0.5px"
                            stroke="#6a8fb7"
                            interval={0}
                            tick={<CustomizedAxisTick axis="y"/>}
                        />
                        <CartesianGrid strokeDasharray="1 1" strokeWidth="0.5px"/>
                        {velocity1 === 0 ? <Tooltip labelFormatter={(value) => `t: ${value} s`}/> : null}
                        <ReferenceLine y={0} stroke="red"/>
                        <ReferenceLine y={checked ? data[data.length - 1]?.S : data[data.length - 1]?.V2}
                                       stroke="blue"/>
                        <ReferenceLine x={data[data.length - 1]?.t || 0} stroke="blue"/>
                        <Area
                            type="monotone"
                            dataKey="S"
                            stroke={color3}
                            fillOpacity={1}
                            fill={`url(#${id3})`}
                        />
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
        </div>
    );
};

export default React.memo(Graphic);

const CustomizedAxisTick = React.memo((props) =>
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
});
