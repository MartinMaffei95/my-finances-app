import { Menu, menu, MenuDivisor } from "@/config/menu.config";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type Props = {
  onClose: any;
};
const LateralMenu: FC<Props> = ({ onClose }) => {
  return (
    <ul className="font-medium  [&>ul]:flex [&>ul]:flex-col  ">
    {
      menu.map(
        menu=> <LateralMenuItem  close={onClose} menuItem={menu} key={menu !== "DIVISOR" ?menu.id :  Math.round(Math.random()*998989)}/>
      )
      }
    </ul>
  );
};
export default LateralMenu;

type Props2 = {
  menuItem:Menu|MenuDivisor
  close:()=>void
}
export const LateralMenuItem: FC<Props2> = ({
  menuItem,
  close
}) => {
  const [collapsed,setCollapsed]=useState(false)

    return (
      menuItem === "DIVISOR"
      ? <span className="h-[1px] w-full bg-neutral-400 flex" /> 
      :
      <>
        <ul className=" ">
          <li onClick={()=>{setCollapsed(!collapsed)}} 
          className="rounded-md bg-primary-700 hover:bg-primary-600/70 duration-150 cursor-pointer p-2 my-2 flex items-center">
            {menuItem.icon ? menuItem.icon : null}  {menuItem.label}
          </li>
          <ul  className={twMerge(`rounded-md  overflow-hidden
          bg-primary-700
            [&>li]:my-1
            [&>li>a]:rounded-md 
            [&>li]:flex
            [&>li>a]:px-1 
            [&>li>a]:w-full
            hover:[&>li>a]:bg-primary-600/90
            [&>li>a]:duration-100
            [&>li>a]:py-2
            [&>li>span]:flex
            [&>li>a]:flex
            duration-100

            [&>li>span]:items-center
            [&>li>span]:juustify-center
            [&>li>span]:gap-2
            [&>li>a]:items-center
            [&>li>a]:juustify-center
            [&>li>a]:gap-2
            `,
            collapsed ? "max-h-full opacity-100":"max-h-0 opacity-0"
          )}>
            {
             menuItem?.subMenu && menuItem?.subMenu.map(
              sm=>(
                sm==="DIVISOR"?
                <span   className="h-[1px] w-full bg-neutral-400 flex" /> 
                :
                <li key={sm.id} >
                   {
                    sm?.url
                    ?
                  <Link onClick={close} to={sm?.url}>
                   {sm.icon ? sm.icon : null} {sm.label}
                  </Link>
                    :
                    <span onClick={close} >
                    {sm.icon ? sm.icon : null} {sm.label}
                   </span>
                   }
                </li>
              )
             )
            }
            
           
          </ul>
        </ul>
      </>
    )
}

