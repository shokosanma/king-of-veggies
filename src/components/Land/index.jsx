import React, { Component } from 'react'
import land_style from './index.module.css';

export default class Land extends Component {
  render() {
    // console.log(this.props.handleMouseOverLand)
    let style = this.props.mouseOn ? land_style.mouse_on : land_style.land
    return (
      <div 
      className={style} 
      onClick={() => {
        this.props.putOnMatrix(this.props.pos_x, this.props.pos_y)
      }}
      onMouseOver={() => {
        this.props.handleMouseOverLand(this.props.pos_x, this.props.pos_y)
      }}
      onMouseOut={() => {
        this.props.handleMouseOutLand(this.props.pos_x, this.props.pos_y)
      }}
      >
        <div>{this.props.type}</div>
        <div>{this.props.value}</div>
      </div>
    )
  }
}
