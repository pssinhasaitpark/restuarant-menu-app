import React from 'react'
import {Navbarcompo,Footer} from '../../Components/index'
import { YourActivity } from '../../Pages/index'
const YourActivityLayout = () => {
  return (
        <div>
            <Navbarcompo />
            <YourActivity />
            <Footer/>
        </div>
  )
}

export default YourActivityLayout