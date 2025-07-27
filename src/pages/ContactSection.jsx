import React from 'react'
import Contactform from '../components/Contactform'
import ReviewSection from '../components/ReviewSection'
import Bgimg from '../assets/main_banner_bg.png'
import BannerReuse from '../components/ui/BannerReuse'
function ContactSection() {
  return (
    <div className='mt-30'>
      <BannerReuse title="Contact us" image={Bgimg}/>
      <Contactform />
    </div>
  )
}

export default ContactSection