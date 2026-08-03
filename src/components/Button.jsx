// import React from "react";

// const CustomButton = ({type,onClick,Icon,text}) => {


//   return (
//     <button
//       type={type}
//       onClick={onClick}
//        className="  pl-4 pr-4 flex items-center justify-center rounded-3xl mt-2 border-[1.2px] border-red-400 text-black text-sm px-2 py-[5px]  transition-transform transform hover:scale-105 hover:bg-red-300  hover:border-none hover:text-white"
//     >
//       {Icon && <Icon className="w-5 h-5" />}
//       {text}
//     </button>
//   );
// };

// export default CustomButton;
import React from 'react'

const Button = ({ type, onClick, Icon, text, className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center gap-2 rounded-full bg-[#3d1e24] hover:bg-[#291217] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-rose-950/15 transition-all duration-300 hover:scale-[1.02] active:scale-95 ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {text}
    </button>
  )
}

export default Button

