import React from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients).map(ingrKey => {
        return <li key={ingrKey} >
            <span style={{textTransform:'capitalize'}} >{ingrKey}</span>: {props.ingredients[ingrKey]} 
            </li>
    })
    return (
        <React.Fragment>
            <h3>Your order</h3>
            <p>A delicious burger with following ingrdients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?!</p>
            <Button clicked={props.purchaseCancelled} btnType="Danger">CANCEL</Button>
            <Button clicked={props.purchaseContinued}btnType="Success">CUNTINUE</Button>
        </React.Fragment>
    )
}

export default orderSummary;