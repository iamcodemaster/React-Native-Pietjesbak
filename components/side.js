import React from 'react'
import { Svg } from 'expo'

const Square = props =>
  <Svg.Rect {...props} x={2} y={2} width={72} height={72} rx={5} fill="#F4F2ED" stroke="#F4F2ED" strokeWidth={0} />

const Dot = props =>
  <Svg.Circle {...props} r={6} fill="#CF7307" />

const Side = props =>
  <Svg height={75} width={75}>
    <Square />
    {props.children}
  </Svg>

export const SideOne = props =>
  <Side>
    <Dot cx={37.5} cy={37.5} />
  </Side>

export const SideTwo = props =>
  <Side>
    <Dot cx={56.25} cy={56.25} />
    <Dot cx={18.75} cy={18.75} />
  </Side>

export const SideThree = props =>
  <Side>
    <Dot cx={56.25} cy={56.25} />
    <Dot cx={37.5} cy={37.5} />
    <Dot cx={18.75} cy={18.75} />
  </Side>

export const SideFour = props =>
  <Side>
    <Dot cx={56.25} cy={56.25} />
    <Dot cx={56.25} cy={18.75} />
    <Dot cx={18.75} cy={56.25} />
    <Dot cx={18.75} cy={18.75} />
  </Side>

export const SideFive = props =>
  <Side>
    <Dot cx={56.25} cy={56.25} />
    <Dot cx={56.25} cy={18.75} />
    <Dot cx={37.5} cy={37.5} />
    <Dot cx={18.75} cy={56.25} />
    <Dot cx={18.75} cy={18.75} />
  </Side>

export const SideSix = props =>
  <Side>
    <Dot cx={56.25} cy={56.25} />
    <Dot cx={56.25} cy={37.5} />
    <Dot cx={56.25} cy={18.75} />
    <Dot cx={18.75} cy={56.25} />
    <Dot cx={18.75} cy={37.5} />
    <Dot cx={18.75} cy={18.75} />
  </Side>

export default Side