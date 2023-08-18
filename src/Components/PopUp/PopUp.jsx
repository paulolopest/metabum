import React from 'react'
import { CartContext } from '../../Context/CartContext'
import useMedia from '../../Hooks/useMedia'

const PopUp = () => {
  const cart = React.useContext(CartContext)

  const mobileScreen = useMedia('(max-width: 600px)')

  if(cart.popUp)  
  return (
    <div className='popup '><p className='animeDown'>{!mobileScreen ? "Produto adicionado com sucesso no carrinho" : "Produto adicionado com sucesso" }</p></div>
  )
}

export default PopUp