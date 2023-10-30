'use client'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

export type Data = {
  id: string
  name: string
  count: number
}

type Props = {
  data: Data[]
  ticks?: number[]
  barColor?: string[]
}

export default function BarCharts({ data, ticks, barColor }: Props) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        height={250}
        width={400}
        data={data}
        barSize={25}
        margin={{
          top: 0,
          right: 30,
          left: -10,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' vertical={false} />
        <XAxis
          dataKey='name'
          fontSize={11}
          fontWeight={600}
        />
        <YAxis
          domain={[0, 50]}
          ticks={ticks ? [...ticks] : [0]}
          strokeWidth={0}
          tickMargin={10}
          fontSize={9}
        />
        <Tooltip />
        <Bar dataKey='count'>
          {barColor?.map((bar, index) => (
            <Cell fill={bar} key={index} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
