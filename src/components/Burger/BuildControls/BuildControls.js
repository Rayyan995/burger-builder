import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
]
const buildControle = props => {
    return (
        <div className={classes.BuildControls}>
            <p><strong>Current price: </strong>{props.price.toFixed(2)} <strong>$</strong></p>
            {controls.map((ctrl) => {
                return <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]} />
            })}
            <div className={classes.Buttons} >
                <button className={classes.Reset}
                    onClick={props.ingredientReset}
                    disabled={!props.purchasable} >Reset</button>

                <button className={classes.Order}
                    onClick={props.ordered}
                    disabled={!props.purchasable} >Order NOW!</button>
            </div>
        </div>
    )
}

export default buildControle