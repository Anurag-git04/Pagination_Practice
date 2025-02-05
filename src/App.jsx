import { useState, useEffect } from 'react'
import './App.css'

const Productcart = ({image, title}) => {
  return (<div className='product-cart'>
            <img src={image} alt="product" className='product-img' />
            <span>{title}</span>
          </div>
          )
}

const PAGE_SIZE = 24

function App() {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  
  const fetchData = async () =>{
    const data = await fetch('https://dummyjson.com/products?limit=1500')
    const json = await data.json();
    setProducts(json.products)
    console.log(products.length)
    console.log(json.products)
  }

  useEffect(()=>{
    fetchData()
  },[])

  const totalProduct = products.length
  const noofpages = Math.ceil(totalProduct / PAGE_SIZE)
  const start = currentPage * PAGE_SIZE
  const end = start + PAGE_SIZE

  const goTonextPage = ()=>{
    setCurrentPage((currentPage)=>currentPage+1)
  }

  const goTopreviousPage = ()=>{
    setCurrentPage((currentPage)=>currentPage-1)
  }

  return !products.length === 0 ? (
    <h1>No Product Found</h1>
  )
  :(<div className='App'>
        <h1>Pagination</h1>
        
        <div className='Product-container'>
          {
            products.slice(start,end).map((p)=>{
              return <Productcart key={p.id} image={p.thumbnail} title={p.title}/>
            })
          }
        </div>
        
        <div className='pagination-container'>
        <button disabled={currentPage === 0} className='page-number' onClick={()=>goTopreviousPage()}>◀️</button>
          {
          [...Array(noofpages).keys()].map((n)=>{
            return( <button 
              className={'page-number '+ (n == currentPage ? "active" : "") } 
              key={n}
              onClick={()=>setCurrentPage(n)}>
                {n}
              </button>
            )
            
          })}
          <button disabled={currentPage === noofpages - 1} className='page-number' onClick={()=>{goTonextPage()}}>▶️</button>
        </div>
    </div>
   )
}

export default App

// git remote add origin https://github.com/Anurag-git04/Pagination_Practice.git
// git branch -M main
// git push -u origin main