import React from 'react';

import classes from './Order.css';

const Order = (props) => {
    const ingredients = [];
    for (const ingrName in props.ingredients) {
        ingredients.push({
            name: ingrName,
            amount: props.ingredients[ingrName]
        })
    }
    const ingredientsOutput = ingredients.map(ingr => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-lock',
                margin: '0 8px',
                border: '1px solid #eee',
                boxShadow: '0 2px 3px #ccc',
                padding: '5px'
            }}
            key={ingr.name} >
            {ingr.name}
            ({ingr.amount}) </span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price:  <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default Order