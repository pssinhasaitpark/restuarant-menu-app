import React from 'react'
import { Menus } from '../../Pages/index'
import {Navbarcompo,RestrGallery,Footer,BookTable} from '../../Components/index'
const MenusLayout = () => {
  return (
    <div>
      <Navbarcompo/>
      <RestrGallery/>
        <Menus/>
        <BookTable/>
        <Footer/>
    </div>
  )
}

export default MenusLayout