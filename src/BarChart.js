import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Chart(data){
    // console.log(data.data)
    return(
        <BarChart width={830} height={450} data={data.data}
        margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }} barSize={40}>
        <XAxis dataKey="name" scale="point" padding={{ left: 20, right: 20 }}/>
        <YAxis domain={[0,6]} ticks={[0,2,4,6]}/>
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
        {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        <CartesianGrid strokeDasharray="3 3" />
        </BarChart>
    )
}