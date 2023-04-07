import React, { Component } from 'react'
import Matrix from '../Matrix';
import Hands from '../Hands';
import config from '../../config'

const cardTypes = ['carrot', 'pumpkin', 'beet']

export default class Game extends Component {
    constructor(props){
        super(props);
        let matrix_init = [];
        for(let x=0;x<5;x++){
            matrix_init.push([])
            for(let y=0;y<6;y++){
                matrix_init[x].push({
                    type: 'land',
                    value: 0,
                    tmp: false
                })
            }
        }
        for(let x=0;x<5;x++){
            for(let y=0;y<6;y++){
                matrix_init[x][y].value = this.areaBuff(x, y);
            }
        }
        let handCards_init = [];
        for(let i=0;i<6;i++){
            handCards_init.push(this.genHandCards(3))
        }
        this.state = {
            matrix: {
                before: matrix_init,
                now: matrix_init
            },
            pickUpCard: {
                index: -1,
                type: null,
                value: 0
            },
            handCards: {
                before: handCards_init,
                now: handCards_init
            }
        }
    }

    genHandCards = (cardNumRange) => {
        return {
            value: Math.floor(Math.random() * cardNumRange)+1,
            type: cardTypes[Math.floor(Math.random() * 3)]
        }
    }

    areaBuff = (x, y) => {
        let buff = -Math.min(x,y)+config.WETNESS+1;
        if(buff > 0)
            {return '+' + buff;}
        return '' + buff;
    }

    pickUpFromHands = (index,type,value) => {
        this.setState({
            pickUpCard:{index,type,value}
        });
    }

    layDownToHands = () => {
        this.setState({
            pickUpCard:{
                index: -1,
                type: null,
                value: 0
            }
        });
    }

    handleMouseOverLand = (x, y) => {
        console.log("mouse on"+x+y);
        this.setState((state) => {
            let tmp_square = JSON.parse(JSON.stringify(state.matrix.now[x][y]));
            if(tmp_square.type === 'land' && tmp_square.tmp === false && this.state.pickUpCard.index !== -1){
                tmp_square.value = parseInt(tmp_square.value) + parseInt(this.state.pickUpCard.value);
                tmp_square.type = this.state.pickUpCard.type;
                tmp_square.tmp = true;
                if(tmp_square.value <= 0){
                    tmp_square.value = 1
                }
            }
            return {
                matrix: {
                    before: state.matrix.now,
                    now: [
                        ...state.matrix.now.slice(0,x),
                        [
                            ...state.matrix.now[x].slice(0,y),
                            tmp_square,
                            ...state.matrix.now[x].slice(y+1)
                        ],
                        ...state.matrix.now.slice(x+1)
                    ]
                }
            }
        })
    }

    handleMouseOutLand = (x, y) => {
        console.log("mouse left"+x+y);
        this.setState((state) => {
            let tmp_square = JSON.parse(JSON.stringify(state.matrix.now[x][y]));
            if(tmp_square.type !== 'land' && tmp_square.tmp === true && this.state.pickUpCard.index !== -1){
                tmp_square.value = this.areaBuff(x, y);
                tmp_square.type = 'land';
                tmp_square.tmp = false;
            }
            return {
                matrix: {
                    before: state.matrix.now,
                    now: [
                        ...state.matrix.now.slice(0,x),
                        [
                            ...state.matrix.now[x].slice(0,y),
                            tmp_square,
                            ...state.matrix.now[x].slice(y+1)
                        ],
                        ...state.matrix.now.slice(x+1)
                    ]
                }
            }
        })
    }

    putOnMatrix = (x, y) => {
        console.log("put on"+x+y);
        this.setState((state) => {
            let pickUpCardIndex = state.pickUpCard.index;
            let tmp_square = JSON.parse(JSON.stringify(state.matrix.now[x][y]));
            tmp_square.tmp = false;
            return {
                pickUpCard: {
                    index: -1,
                    type: null,
                    value: 0
                },
                handCards: {
                    before: state.handCards.now,
                    now: [
                        ...state.handCards.now.slice(0,pickUpCardIndex),
                        ...state.handCards.now.slice(pickUpCardIndex+1)
                    ]
                },
                matrix: {
                    before: state.matrix.now,
                    now: [
                        ...state.matrix.now.slice(0,x),
                        [
                            ...state.matrix.now[x].slice(0,y),
                            tmp_square,
                            ...state.matrix.now[x].slice(y+1)
                        ],
                        ...state.matrix.now.slice(x+1)
                    ]
                }
            }
        })
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <Matrix 
                    matrix={this.state.matrix} 
                    handleMouseOverLand={this.handleMouseOverLand} 
                    handleMouseOutLand={this.handleMouseOutLand}
                    putOnMatrix={this.putOnMatrix}
                />
                <br/>
                <Hands 
                    handCards={this.state.handCards} 
                    pickUpFromHands={this.pickUpFromHands} 
                    layDownToHands={this.layDownToHands} 
                    pickUpCard={this.state.pickUpCard}
                />
            </div>
        )
    }
}
