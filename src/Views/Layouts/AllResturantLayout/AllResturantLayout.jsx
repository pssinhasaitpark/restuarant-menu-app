import React from 'react'
import { AllResturant } from '../../Pages/index'
import {Navbarcompo,PopularRestaurant} from '../../Components/index'
const AllResturantLayout = () => {
  return (
    <div><Navbarcompo/>
    <PopularRestaurant/>
    <AllResturant/></div>
  )
}

export default AllResturantLayout