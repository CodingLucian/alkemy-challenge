import React from 'react';
import { NavLink } from 'react-router-dom';



export default function NavBar() {
    
    return ( 
        <div>
                <div><NavLink to={'/allmovements'}>All Operations</NavLink></div>
                <div><NavLink to={'/newmovement'}>New Operation</NavLink></div>
        </div>
    );
};