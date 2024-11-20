import React, { PureComponent } from 'react';
import { PieChart,Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


export default function PChart(data){
    console.log(data)
    return(
        <PieChart width={400} height={300}>
            <Pie
            data={data.data}
            dataKey="count"
            nameKey="category"
            isAnimationActive={true}
            cx="50%"
            cy="50%"
            outerRadius={90}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
    )
}