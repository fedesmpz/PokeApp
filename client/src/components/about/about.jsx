

import React from 'react';
import { useNavigate } from 'react-router-dom'



const About = () => {

    const navigate = useNavigate();

    const handleReturn = () =>{
        navigate(-1)
    }


    return (
        <div>
            <button onClick={handleReturn}>Atras</button>
            
        </div>
    );
}

export default About;
