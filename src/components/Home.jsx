import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div className='home-btn-wrapper'>
        <Link to="/form" type='submit' class="home-btn buttonRed">Create Quiz
          <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
        </Link>
      </div>
    </>
  )
}

export default Home