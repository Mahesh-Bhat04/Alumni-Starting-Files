import React from 'react'
import aboutImg from '../../assets/images/about.png'
import aboutCardImg from '../../assets/images/about-card.png'
import {Link} from 'react-router-dom'

const About = () => {
  return <section>
    <div className="container">
      <div className='flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row'>
        {/*=======about img================ */}
        <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
          <img src={aboutImg} alt="" />
          <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
            <img src={aboutCardImg} alt="" />
          </div>
        </div>

        {/*==========about content=========*/}
        <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
          <h2 className='heading'>Proud to Connect Alumni Worldwide</h2>
          <p className="text__para">
            Experience the power of community with our alumni engagement platform. 
            Designed for seamless networking, we bring together graduates to share knowledge, 
            create opportunities, and stay connected to their alma mater.
          </p>
          <p className="text__para mt-[30px]">
            Leveraging cutting-edge technology, our platform offers real-time event updates, 
            detailed alumni profiles, and intuitive networking tools. 
            Whether you're looking to mentor, attend reunions, or stay in touch with old friends, 
            our website fosters meaningful connections and lifelong engagement.
          </p>
          <Link to='/'>
            <button className='btn'>Learn More</button>
          </Link>
        </div>
      </div>
    </div>
  </section>
}

export default About
