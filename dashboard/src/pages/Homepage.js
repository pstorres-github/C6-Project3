import './Homepage.css'

import React, { useState } from 'react'

import Login from '../components/Login'
import Register from '../components/Register'

const Homepage = () => {
    const [viewMode, setViewMode] = useState('logIn')

    // VDR: Ignore this for now
    // function bgImgScheduler1() {
    //     setTimeout(() => {
    //         document.querySelector('.img1').style.opacity = 0
    //         document.querySelector('.img2').style.opacity = 1
    //         document.querySelector('.img3').style.opacity = 1
    //         order(
    //             ['-3', '-1', '-2'],
    //             () => {
    //                 bgImgScheduler2()
    //             },
    //             1000
    //         )
    //     }, 3000)
    // }

    // function bgImgScheduler2() {
    //     setTimeout(() => {
    //         document.querySelector('.img1').style.opacity = 1
    //         document.querySelector('.img2').style.opacity = 0
    //         document.querySelector('.img3').style.opacity = 1
    //         order(
    //             ['-2', '-3', '-1'],
    //             () => {
    //                 bgImgScheduler3()
    //             },
    //             1000
    //         )
    //     }, 3000)
    // }

    // function bgImgScheduler3() {
    //     setTimeout(() => {
    //         document.querySelector('.img1').style.opacity = 1
    //         document.querySelector('.img2').style.opacity = 1
    //         document.querySelector('.img3').style.opacity = 0
    //         order(
    //             ['-1', '-2', '-3'],
    //             () => {
    //                 bgImgScheduler1()
    //             },
    //             1000
    //         )
    //     }, 3000)
    // }

    // function order(array, callback, time) {
    //     setTimeout(() => {
    //         document.querySelector('.img1').style.zIndex = array[0]
    //         document.querySelector('.img2').style.zIndex = array[1]
    //         document.querySelector('.img3').style.zIndex = array[2]
    //         callback()
    //     }, time)
    // }

    // bgImgScheduler1()

    return (
        <div className="grid-container">
            {/* VDR: Ignore this for now */}
            {/* background images */}
            {/* <img
                class="background-image img1"
                // src="../assets/backgrounds/1.png"
            ></img>
            <img
                class="background-image img2"
                // src="../assets/backgrounds/2.png"
            ></img>
            <img
                class="background-image img3"
                // src="../assets/backgrounds/3.png"
            ></img> */}

            <div className="header"></div>

            <div className="section-hero">
                {/* <h1>Team Silvereyes</h1> */}
                {/* <h2>Customer dashboard</h2> */}
                <h2>Silvereyes</h2>
            </div>

            <div className="section-login">
                <h3>Login to your account</h3>

                {viewMode === 'logIn' && (
                    <>
                        <Login />

                        <br />
                        <p>Not registered?</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setViewMode('register')
                            }}
                        >
                            Register here
                        </button>
                    </>
                )}

                {viewMode === 'register' && <Register />}
            </div>
        </div>
    )
}

export default Homepage
