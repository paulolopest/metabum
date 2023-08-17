import React from 'react'
import { CartContext } from '../../Context/CartContext'

const PopUp = () => {
  const cart = React.useContext(CartContext)


  if(cart.popUp)  
  return (
    <div className='popup'>Produto adicionado com sucesso no carrinho</div>
  )
}

export default PopUp