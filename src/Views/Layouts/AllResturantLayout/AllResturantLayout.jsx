import React from 'react'
import { AllResturant } from '../../Pages/index'
import {Navbarcompo,PopularRestaurant,Footer} from '../../Components/index'
const AllResturantLayout = () => {
  return (
    <div><Navbarcompo/>
    <PopularRestaurant/>
    <AllResturant/>
    <Footer/></div>
  )
}

export default AllResturantLayout