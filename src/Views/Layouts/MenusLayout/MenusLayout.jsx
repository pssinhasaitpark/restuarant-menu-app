import React from 'react'
import { Menus } from '../../Pages/index'
import {Navbarcompo,RestrGallery} from '../../Components/index'
const MenusLayout = () => {
  return (
    <div>
      <Navbarcompo/>
      <RestrGallery/>
        <Menus/>
    </div>
  )
}

export default MenusLayout