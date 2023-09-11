import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from '@material-ui/lab'

export const ProductCard = ({product}) => {
    const options ={
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    }
  return (
    <Link className='productCard' to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name}/>
        <p>{product.name}</p>
        <div>
            <Rating {...options} /> 
        </div>
        <p>
          <span>({product.numOfReviews} Reviews)</span>
        </p>
        <span>{`₹${product.price}`}</span>
    </Link>
  )
}
