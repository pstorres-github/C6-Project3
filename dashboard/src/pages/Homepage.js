import './Homepage.css'

import React, { useState, useEffect, useRef } from 'react'

import Login from '../components/Login'
import Register from '../components/Register'
import bg1 from '../assets/backgrounds/1.png'
import bg2 from '../assets/backgrounds/6.png'
import bg3 from '../assets/backgrounds/5.png'

const Homepage = () => {
    const [viewMode, setViewMode] = useState('logIn')
    const bgChange = useRef()

    useEffect (()=>{
            let bgChange = true

            function bgImgScheduler1() {

                setTimeout(() => {
                    if (bgChange === true) {
                        document.querySelector('.img1').style.opacity = 0
                        document.querySelector('.img2').style.opacity = 1
                        document.querySelector('.img3').style.opacity = 1
                    }
                    order(
                        ['-3', '-1', '-2'],
                        () => {
                            bgImgScheduler2()
                        },
                        1000
                    )
                }, 3000)
            }

            function bgImgScheduler2() {
            
                    setTimeout(() => {
                        if (bgChange === true) {
                        document.querySelector('.img1').style.opacity = 1
                        document.querySelector('.img2').style.opacity = 0
                        document.querySelector('.img3').style.opacity = 1
                        }
                        order(
                            ['-2', '-3', '-1'],
                            () => {
                                bgImgScheduler3()
                            },
                            1000
                        )
                    }, 3000)
            }

            function bgImgScheduler3() {
                    setTimeout(() => {
                        if (bgChange === true) {
                            document.querySelector('.img1').style.opacity = 1
                            document.querySelector('.img2').style.opacity = 1
                            document.querySelector('.img3').style.opacity = 0
                        }
                        order(
                            ['-1', '-2', '-3'],
                            () => {
                                bgImgScheduler1()
                            },
                            1000
                        )
                    }, 3000)
            }

            function order(array, callback, time) {
                if (bgChange ===true)
                    setTimeout(() => {
                        if (document.querySelector('.img1') && document.querySelector('.img2') && document.querySelector('.img3'))
                        document.querySelector('.img1').style.zIndex = array[0]
                        document.querySelector('.img2').style.zIndex = array[1]
                        document.querySelector('.img3').style.zIndex = array[2]
                        callback()
                    }, time)
            }

        bgImgScheduler1()

        return () => {
            bgChange = false
        }
    },[bgChange])

    return (
        <div className="grid-container">
            {/* VDR: Ignore this for now */}
            {/* background images */}
            <img
                class="background-image img1"
                src={bg1}
                alt=""
            ></img>
            <img
                class="background-image img2"
                src={bg2}
                alt=""
            ></img>
            <img
                class="background-image img3"
                src={bg3}
                alt=""
            ></img>

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
