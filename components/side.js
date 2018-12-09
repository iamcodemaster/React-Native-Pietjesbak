import React from 'react'
import { Svg } from 'expo'

const Square = props =>
  <Svg.Rect {...props} x={2} y={2} width={47} height={47} rx={5} fill="#ffffff" stroke="#000000" strokeWidth={2} />

const Dot = props =>
  <Svg.Circle {...props} r={5} />

const Side = props =>
  <Svg height={50} width={50}>
    <Square />
    {props.children}
  </Svg>

export const SideOne = props =>
  <Side>
    <Dot cx={25} cy={25} />
  </Side>

export const SideTwo = props =>
  <Side>
    <Dot cx={37.5} cy={37.5} />
    <Dot cx={12.5} cy={12.5} />
  </Side>

export const SideThree = props =>
  <Side>
    <Dot cx={37.5} cy={37.5} />
    <Dot cx={25} cy={25} />
    <Dot cx={12.5} cy={12.5} />
  </Side>

export const SideFour = props =>
  <Side>
    <Dot cx={37.5} cy={37.5} />
    <Dot cx={37.5} cy={12.5} />
    <Dot cx={12.5} cy={37.5} />
    <Dot cx={12.5} cy={12.5} />
  </Side>

export const SideFive = props =>
  <Side>
    <Dot cx={37.5} cy={37.5} />
    <Dot cx={37.5} cy={12.5} />
    <Dot cx={25} cy={25} />
    <Dot cx={12.5} cy={37.5} />
    <Dot cx={12.5} cy={12.5} />
  </Side>

export const SideSix = props =>
  <Side>
    <Dot cx={37.5} cy={37.5} />
    <Dot cx={37.5} cy={25} />
    <Dot cx={37.5} cy={12.5} />
    <Dot cx={12.5} cy={37.5} />
    <Dot cx={12.5} cy={25} />
    <Dot cx={12.5} cy={12.5} />
  </Side>

export default Side