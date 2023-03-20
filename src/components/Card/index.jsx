import React, { Component } from 'react'
import card_style from './index.module.css';

export default class Card extends Component {
  render() {
    let style = this.props.pickUp ? card_style.card_pick_up : card_style.card
    return (
      <div 
      className={style} 
      onClick={
        () => this.props.pickUpOrLayDown(
          this.props.index,
          this.props.type,
          this.props.value
        )
      }>
        <div>{this.props.type}</div>
        <div>{this.props.value}</div>
      </div>
    )
  }
}
