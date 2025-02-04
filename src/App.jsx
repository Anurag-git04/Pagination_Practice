import { useState, useEffect } from 'react'
import './App.css'

const Productcart = ({image, title}) => {
  return (
  <div>
    <h1>{title}</h1>
    <img src={image} alt="product" />
  </div>)
}
function App() {
  const [products, setProducts] = useState([])
  
  const fetchData = async () =>{
    const data = await fetch('https://dummyjson.com/products?limit=500')
    const json = await data.json();
    setProducts(json.products)
    console.log(products.length)
    console.log(json.products)
  }

  useEffect(()=>{
    fetchData()
  },[])

  return (
  // products.length === 0 ? (
  //   <h1>No Product Found</h1>
  // )
  // :()
    
      <div className='App'>
        <h1>Pagination</h1>
        {
          products.map((p)=>{
            return <Productcart key={p.id} image={p.thumbnail} title={p.title}/>
          })
        }

      </div>
    
  )
}

export default App
