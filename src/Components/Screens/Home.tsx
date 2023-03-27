import React from 'react'
import Details from './Details'
import CalorieForm from './CalorieForm'
import './Home.scss'

function Home() {
    return (
        <div className='home_container'>
            <div className='form_card'>
                <CalorieForm />
            </div>
            <Details />
        </div>
    )
}

export default Home