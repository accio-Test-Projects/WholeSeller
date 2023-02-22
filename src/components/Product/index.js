import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../fierbaseconfig'

function Product() {
  const params = useParams()
  const { id } = params

  const getProductInfo = async() => {
    // fetch product info from firestore product collection
    const docRef= doc(db, "products", id)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
      console.log(docSnap.data())

    }
  }

  useEffect(() => {
    getProductInfo()
  }, [])
  return (
    <div>Product {id}</div>
  )
}

export default Product