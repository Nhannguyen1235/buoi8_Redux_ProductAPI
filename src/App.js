import React from 'react'
import './components/style.css'
import Products from './components/Products'
import Carts from './components/Carts'

export default function App() {
  return (
    <div className='main'>
      <Products />
      <Carts />
    </div>
  )
}
