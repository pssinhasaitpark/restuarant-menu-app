import React from 'react'
import {Navbarcompo,Footer} from '../../Components/index'
import { YourProfile} from '../../Pages/index'
const YourProfileLayout = () => {
  return (
    <div>
  <Navbarcompo />
        <YourProfile />
        <Footer/>

    </div>
  )
}

export default YourProfileLayout