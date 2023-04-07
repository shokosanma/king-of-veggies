import React, { Component } from 'react'
import Card from '../Card';
import hand_style from './index.module.css'

export default class Hands extends Component {
    // constructor(props) {
    //     super(props);
    //     console.log(this.props.handCards)
    // }

    renderCard(index, prop) {
        if(this.props.pickUpCard.index === index){
            return (
                <Card
                    key={index}
                    index={index}
                    value={prop.value}
                    type={prop.type}
                    pickUpOrLayDown={this.props.layDownToHands}
                    pickUp={true}
                >
                </Card>
            );
        }
        return (
            <Card
                key={index}
                index={index}
                value={prop.value}
                type={prop.type}
                pickUpOrLayDown={this.props.pickUpFromHands}
                pickUp={false}
            >
            </Card>
        );
    }

    render() {
        const listItems = [];
        for(let [index,prop] of this.props.handCards.now.entries()){
            listItems.push(this.renderCard(index, prop))
        }
        console.log(listItems);
        return (
            <div className={hand_style.hands}>
                {listItems}
            </div>
        )
    }
}
