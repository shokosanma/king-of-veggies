import React, { Component } from 'react'
import matrix_style from './index.module.css'
import Land from '../Land';

export default class Matrix extends Component {

  renderLand(x, y) {
    // console.log(this.props.matrix)
    return (
      <Land
          pos_x={x}
          pos_y={y}
          key={x+'_'+y}
          value={this.props.matrix.now[x][y]['value']}
          type={this.props.matrix.now[x][y]['type']}
          handleMouseOverLand={this.props.handleMouseOverLand}
          handleMouseOutLand={this.props.handleMouseOutLand}
          putOnMatrix={this.props.putOnMatrix}
      />
    );
  }

  renderMatrixRow(x) {
    const row = [];
    for (let y=0; y<this.props.matrix.now[0].length; y++){
      row.push(this.renderLand(x,y));
    }
    return (
      <div className={matrix_style.matrix_row} key={x}>{row}</div>
    );
  }

  render() {
    const row_group = [];
    for (let x=0; x<this.props.matrix.now.length; x++){
      row_group.push(this.renderMatrixRow(x));
    }
    return (
      <div className={matrix_style.matrix}>
        <div className={matrix_style.matrix_row_group}>
          {row_group}
        </div>
      </div>
    )
  }
}
