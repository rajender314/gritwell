import style from 'styled-components';
import { boldColor } from '../../styles';

export const HeaderMain = style.div`
width: 100%;
box-shadow: 0px 1px 0px #F5F7F7;
padding: 0 16px;
height: 56px;
min-height: 56px;
display: flex;
align-items: center;

// position: fixed;
width: 100%;
background: white;
padding: 0 16px;
/* padding: 15px 0px; */
height: 56px;
min-height: 56px;
display: flex;
align-items: center;
justify-content: center;
z-index: 2;

// .css-120l84f{
//     background: #ffff;
// }
// .menu-option .menu-item-single.active{
//     color: ${boldColor} !important;
//     font-weight: 600 !important;
// }
// .menu-option .menu-item-single .custom-icon{
//     margin-right: 10px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// }
// .menu-option .menu-item-single{
//     color:#6F7381!important;
//     font-weight: 600 !important;
//     padding: 14px;
//     margin: 0;
//     margin-right: 6px;
//     // font-family: 'Poppins', sans-serif; 


// }
// .menu-option .menu-item-single.active::after {
//     background-color: transparent;
// }
// .menu-option .menu-item-single:hover {
//     // background-color: #f6f7fb;
//     // border-radius: 8px;
//     color: #6F7381!important ;
// }
// .menu-option .menu-item-single.active {
//     color: #278C71 !important;
//     font-weight: 600 !important;
//     // background-color: #EEF0F4;
//     padding: 14px;
//     border-radius: 8px;
//     .custom-icon{
//         svg{
//             path{
//                 fill: #278C71;
//             }
//         }
//     }
// }
`
export const Ulstyles = style.ul`
width:100%;
display:flex;
justify-content:space-around;
align-items:center;
`