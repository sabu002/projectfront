import React from 'react'
import Mission from '../components/about/Mission'
import ReviewSection from '../components/ReviewSection'
import BannerReuse from '../components/ui/BannerReuse'
import Bgimg from '../assets/main_banner_bg.png'
import BottomBanner from '../components/ButtomBanner'
function About() {
  return (
    <div className='mt-30'>
      <BannerReuse title="About us" image={Bgimg} />
  <Mission />
  <BottomBanner />
  <ReviewSection />
    </div>
  )
}

export default About