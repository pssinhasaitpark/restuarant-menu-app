import React from 'react'
import {Navbarcompo,Footer} from '../../Components/index'
import { YourOrder } from '../../Pages/index'
const YourOrderLayout = () => {
  return (
    <div>
        <Navbarcompo />
        <YourOrder />
        <Footer/>
    </div>
  )
}

export default YourOrderLayout