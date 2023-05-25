import React from 'react';
import { useNavigate } from 'react-router-dom'
import styles from './about.module.css'
import img from '../../assets/about.svg'



const About = () => {

    const navigate = useNavigate();

    const onBackClick = () =>{
        navigate(-1)
    }


    return (
        <div className={styles.image}>
            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <div onClick={onBackClick} className={styles.btn}></div>
                    <h2 className={styles.titleCard}>Federico Pezzutti</h2>
                </div>
                    <div className={styles.pkmnContainer}>
                        <div className={styles.imgContainer}>
                            <img src={img} alt="" />
                        </div>
                        <div className={styles.dataContainer}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis ut vero repellat dicta alias quia est accusantium? Asperiores temporibus corrupti vitae rerum aliquid assumenda quidem animi, dignissimos, sit, eveniet ullam?
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis ut vero repellat dicta alias quia est accusantium? Asperiores temporibus corrupti vitae rerum aliquid assumenda quidem animi, dignissimos, sit, eveniet ullam?

                            
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default About;
