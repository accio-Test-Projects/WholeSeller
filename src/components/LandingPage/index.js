import React, { useEffect, useState } from 'react'
import {collection, getDocs, query} from 'firebase/firestore'
import {db} from '../../fierbaseconfig'
import TopBar from './TopBar';
import Banner from './Banner';
import NewArrivals from './NewArrivals';
import BestSellers from './BestSellers';
import Footer from './Footer';
function LandingPage() {
  const [section,setSection] = useState(null)
  const getLandingPageData = async() => {
    
    // fetch all docs from landingpagesections collection
    const q=query(collection(db, 'landingpagesections'))
    const querySnapshot = await getDocs(q)
    let allSections = {}
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} =>`, doc.data())
      allSections[doc.id] = doc.data()
    })
    setSection(allSections)
  }
  useEffect(() => {
    getLandingPageData()
  }, [])
  return (
    section?(<div>
      <div
      style={{
        marginBottom: '100px',
      }}
      ><TopBar data={section.categorybar.allcategories}/></div>
      <Banner data={section.corousel.corousels}/>
      <NewArrivals data={section.newArival.newArivals}/>
      <BestSellers data={section.BestSellers.bestSellers}/>
      <Footer/>
    </div>):
    <div>loading...</div>
  )
}

export default LandingPage