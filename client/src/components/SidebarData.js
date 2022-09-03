import React from 'react';
import * as BsIcons from "react-icons/bs";
import * as RiIcons from "react-icons/ri";
import * as HiIcons from "react-icons/hi";
import * as AiIcons from "react-icons/ai";


export const SidebarData =[ 
    {
        title: 'Inicio',
        path: '/',
        icon: <HiIcons.HiHome></HiIcons.HiHome>,
        cName: 'nav-text'
    },
    {
        title: 'Productos',
        path: '/productos',
        icon: <BsIcons.BsFillBasket2Fill></BsIcons.BsFillBasket2Fill>,
        cName: 'nav-text'
    },
    {
        title: 'Prodcat',
        path: '/prodcat',
        icon: <RiIcons.RiHandCoinFill></RiIcons.RiHandCoinFill>,       
        cName: 'nav-text'
    },
    {
        title: 'Categorias',
        path: '/categorias',
        icon: <HiIcons.HiDuplicate></HiIcons.HiDuplicate>,
        cName: 'nav-text'
    },
    {
        title: 'Compras',
        path: '/compras',
        icon: <AiIcons.AiOutlineDollarCircle></AiIcons.AiOutlineDollarCircle>,
        cName: 'nav-text'
    },
    {
        title: 'Niveles de Usuario',
        path: '/niveles',
        icon: <HiIcons.HiChartBar></HiIcons.HiChartBar>,
        cName: 'nav-text'
    },
    {
        title: 'Usuarios',
        path: '/usuarios',
        icon: <HiIcons.HiUsers></HiIcons.HiUsers>,
        cName: 'nav-text'
    }
]