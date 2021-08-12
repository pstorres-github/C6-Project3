import './ArtificialHorizon.css'

import React, { useContext, useEffect } from 'react'

import TelemetryContext from '../TelemetryContext'
import { findAllByTestId } from '@testing-library/react'

const ArtificialHorizon = () => {
    const telemetryContext = useContext(TelemetryContext)

    const translate =
        90 + (1000 * telemetryContext.pitch + 90000) / 360 - 250 - 180 / 2
    const transformString = {
        transform: `rotate(${telemetryContext.roll}deg) translateY(${translate}%) scale(10)`
    }

    useEffect(() => {
        const AoB = document.getElementById('angle-of-bank-indicator')

        if (-60 <= telemetryContext.roll && telemetryContext.roll <= 60) {
            AoB.style.opacity = 1
            // console.log('visible')
        } else {
            AoB.style.opacity = 0
            // console.log('invisible')
        }
    }, [telemetryContext])

    const bankRotation = {
        transform: `rotate(${telemetryContext.roll}deg)`
    }

    const PitchIndicator = (props) => (
        // console.log(props.fill)

        <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 7604.6 7604.6"
            // style="enable-background:new 0 0 7604.6 7604.6;"
            xmlSpace="preserve"
        >
            <style>{`.st0{fill=${props.fill}}`}</style>
            <path
                id="pitch"
                class="st0"
                d="M7604.6,3804.8H0.2c-1.4,0-2.5-1.1-2.5-2.5s1.1-2.5,2.5-2.5h7604.4c1.4,0,2.5,1.1,2.5,2.5
	S7606,3804.8,7604.6,3804.8z M3962.9,4013.5c0-1.4-1.1-2.5-2.5-2.5h-315.9c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5h315.9
	C3961.8,4016,3962.9,4014.9,3962.9,4013.5z M3984.2,4024.3h14.6v-2.3h-5.8v-19.7h-4.1l-5.8,5.5l1.6,1.7l5.6-5.2h0.2v17.8h-6.3v2.3
	V4024.3z M4009.9,4024.8c5.4,0,7.7-4.2,7.7-11.4s-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4C4002.2,4020.6,4004.5,4024.8,4009.9,4024.8z
	 M4009.9,4022.5c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6C4014.9,4019.6,4013.4,4022.5,4009.9,4022.5z
	 M4009.9,4015.3c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7C4007.9,4014.6,4008.4,4015.3,4009.9,4015.3z
	 M3587.9,4024.3h14.6v-2.3h-5.8v-19.7h-4.1l-5.8,5.5l1.6,1.7l5.6-5.2h0.2v17.8h-6.3v2.3V4024.3z M3613.7,4024.8
	c5.4,0,7.7-4.2,7.7-11.4s-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4C3606,4020.6,3608.3,4024.8,3613.7,4024.8z M3613.6,4022.5
	c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6C3618.6,4019.6,3617.2,4022.5,3613.6,4022.5z M3613.7,4015.3
	c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7C3611.7,4014.6,3612.2,4015.3,3613.7,4015.3z M3856.3,3855.1
	c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h105.3C3855.8,3856.3,3856.3,3855.8,3856.3,3855.1z
	 M3909.5,3907.9c0-1-0.8-1.8-1.8-1.8h-210.6c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8h210.6C3908.7,3909.7,3909.5,3908.9,3909.5,3907.9
	z M3856.3,3960.7c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h105.3
	C3855.8,3962,3856.3,3961.4,3856.3,3960.7z M3962.9,4224.8c0-1.4-1.1-2.5-2.5-2.5h-315.9c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5
	h315.9C3961.8,4227.3,3962.9,4226.2,3962.9,4224.8z M3998.4,4235.6l0.2-2.2h-12l6.2-5.4c2.9-2.6,4.9-5,4.9-8.4
	c0-3.8-2.5-6.4-6.9-6.4s-6.3,2.6-7.2,5.2l2.4,0.9c0.7-2.3,2-3.8,4.7-3.8c2.7,0,4.1,1.6,4.1,4.2v0.4c0,2.2-1.6,4.3-3.7,6.2l-7.4,6.6
	v2.7H3998.4L3998.4,4235.6z M4009.9,4236c5.4,0,7.7-4.2,7.7-11.4c0-7.2-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4
	C4002.2,4231.8,4004.5,4236,4009.9,4236z M4009.9,4233.7c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6
	C4014.9,4230.8,4013.4,4233.7,4009.9,4233.7z M4009.9,4226.5c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7
	C4007.9,4225.8,4008.4,4226.5,4009.9,4226.5z M3602.2,4235.6l0.2-2.2h-12l6.2-5.4c2.9-2.6,4.9-5,4.9-8.4c0-3.8-2.5-6.4-6.9-6.4
	s-6.3,2.6-7.2,5.2l2.4,0.9c0.7-2.3,2-3.8,4.7-3.8c2.7,0,4.1,1.6,4.1,4.2v0.4c0,2.2-1.6,4.3-3.7,6.2l-7.4,6.6v2.7H3602.2
	L3602.2,4235.6z M3613.7,4236c5.4,0,7.7-4.2,7.7-11.4c0-7.2-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4
	C3606,4231.8,3608.3,4236,3613.7,4236z M3613.6,4233.7c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6
	C3618.6,4230.8,3617.2,4233.7,3613.6,4233.7z M3613.7,4226.5c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7
	C3611.7,4225.8,3612.2,4226.5,3613.7,4226.5z M3856.3,4066.3c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2
	h105.3C3855.8,4067.5,3856.3,4067,3856.3,4066.3z M3909.5,4119.1c0-1-0.8-1.8-1.8-1.8h-210.6c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8
	h210.6C3908.7,4120.8,3909.5,4120.1,3909.5,4119.1z M3856.3,4172c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2
	s0.6,1.2,1.2,1.2h105.3C3855.8,4173.2,3856.3,4172.7,3856.3,4172z M3962.9,4436c0-1.4-1.1-2.5-2.5-2.5h-315.9
	c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5h315.9C3961.8,4438.5,3962.9,4437.4,3962.9,4436z M3990,4434.1l-2.4,0.1v2.3h2.6
	c3.3,0,4.9,1.5,4.9,4.1v0.2c0,2.6-1.7,4.1-4.8,4.1c-2.7,0-4-1.3-5.2-3l-2,1.5c1.3,1.9,3.3,3.8,7.2,3.8c4.6,0,7.6-2.6,7.6-6.4
	c0-3.4-2.3-5.1-4.7-5.6v-0.1c2.4-0.6,4.3-2.3,4.3-5.1c0-3.6-3-5.6-6.8-5.6c-3.6,0-5.6,1.8-6.7,3.6l2,1.5c0.9-1.7,2.3-2.8,4.6-2.8
	c2.4,0,4,1.2,4,3.5v0.2C3994.6,4432.6,3993.1,4434.1,3990,4434.1L3990,4434.1z M4009.9,4447.2c5.4,0,7.7-4.2,7.7-11.4
	c0-7.2-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4S4004.5,4447.2,4009.9,4447.2z M4009.9,4444.9c-3.6,0-5-2.9-5-7.3v-3.6
	c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6C4014.9,4442,4013.4,4444.9,4009.9,4444.9z M4009.9,4437.6c1.5,0,2-0.6,2-1.5v-0.7
	c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7C4007.9,4437,4008.4,4437.6,4009.9,4437.6z M3593.8,4434.1l-2.4,0.1v2.3h2.6
	c3.3,0,4.9,1.5,4.9,4.1v0.2c0,2.6-1.7,4.1-4.8,4.1c-2.7,0-4-1.3-5.2-3l-2,1.5c1.3,1.9,3.3,3.8,7.2,3.8c4.6,0,7.6-2.6,7.6-6.4
	c0-3.4-2.3-5.1-4.7-5.6v-0.1c2.4-0.6,4.3-2.3,4.3-5.1c0-3.6-3-5.6-6.8-5.6c-3.6,0-5.6,1.8-6.7,3.6l2,1.5c0.9-1.7,2.3-2.8,4.6-2.8
	c2.4,0,4,1.2,4,3.5v0.2C3598.4,4432.6,3596.9,4434.1,3593.8,4434.1L3593.8,4434.1z M3613.7,4447.2c5.4,0,7.7-4.2,7.7-11.4
	c0-7.2-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4S3608.3,4447.2,3613.7,4447.2z M3613.6,4444.9c-3.6,0-5-2.9-5-7.3v-3.6
	c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6C3618.6,4442,3617.2,4444.9,3613.6,4444.9z M3613.7,4437.6c1.5,0,2-0.6,2-1.5v-0.7
	c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7C3611.7,4437,3612.2,4437.6,3613.7,4437.6z M3856.3,4277.6c0-0.7-0.6-1.2-1.2-1.2h-105.3
	c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h105.3C3855.8,4278.8,3856.3,4278.3,3856.3,4277.6z M3909.5,4330.4c0-1-0.8-1.8-1.8-1.8
	h-210.6c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8h210.6C3908.7,4332.2,3909.5,4331.4,3909.5,4330.4z M3856.3,4383.2
	c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h105.3C3855.8,4384.5,3856.3,4383.9,3856.3,4383.2z
	 M3962.9,4647.2c0-1.4-1.1-2.5-2.5-2.5h-315.9c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5h315.9
	C3961.8,4649.7,3962.9,4648.6,3962.9,4647.2z M3993.4,4658l2.5,0v-4.3h3.3v-2.2h-3.3V4636h-3.9l-9.5,15.4v2.3h10.9V4658L3993.4,4658
	z M3993.3,4638h0.1v13.5h-8.5L3993.3,4638z M4009.9,4658.4c5.4,0,7.7-4.2,7.7-11.4c0-7.2-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4
	S4004.5,4658.4,4009.9,4658.4z M4009.9,4656.1c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6
	C4014.9,4653.2,4013.4,4656.1,4009.9,4656.1z M4009.9,4648.9c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7
	C4007.9,4648.2,4008.4,4648.9,4009.9,4648.9z M3597.2,4658l2.5,0v-4.3h3.3v-2.2h-3.3V4636h-3.9l-9.5,15.4v2.3h10.9V4658L3597.2,4658
	z M3597.1,4638h0.1v13.5h-8.5L3597.1,4638z M3613.7,4658.4c5.4,0,7.7-4.2,7.7-11.4c0-7.2-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4
	S3608.3,4658.4,3613.7,4658.4z M3613.6,4656.1c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6
	C3618.6,4653.2,3617.2,4656.1,3613.6,4656.1z M3613.7,4648.9c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7
	C3611.7,4648.2,3612.2,4648.9,3613.7,4648.9z M3856.3,4488.8c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2
	h105.3C3855.8,4490,3856.3,4489.5,3856.3,4488.8z M3909.5,4541.6c0-1-0.8-1.8-1.8-1.8h-210.6c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8
	h210.6C3908.7,4543.3,3909.5,4542.6,3909.5,4541.6z M3856.3,4700c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2
	s0.6,1.2,1.2,1.2h105.3C3855.8,4701.2,3856.3,4700.7,3856.3,4700z M3856.3,4805.7c0-0.7-0.6-1.2-1.2-1.2h-105.3
	c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h105.3C3855.8,4807,3856.3,4806.4,3856.3,4805.7z M3909.5,4752.9c0-1-0.8-1.8-1.8-1.8
	h-210.6c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8h210.6C3908.7,4754.7,3909.5,4753.9,3909.5,4752.9z M3856.3,4594.4
	c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h105.3C3855.8,4595.7,3856.3,4595.1,3856.3,4594.4z
	 M3962.9,4858.5c0-1.4-1.1-2.5-2.5-2.5h-315.9c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5h315.9
	C3961.8,4861,3962.9,4859.9,3962.9,4858.5z M3997.3,4849.5l0.1-2.1h-12l-0.8,12.1l2.2,0.3c0.9-1.1,1.9-1.9,4-1.9
	c3.1,0,4.8,1.7,4.8,4.6v0.2c0,2.8-1.7,4.6-4.7,4.6c-2.7,0-3.9-1.3-5.1-3l-2,1.5c1.4,1.9,3.3,3.8,7,3.8c4.7,0,7.5-3,7.5-7.3
	s-2.8-6.8-6.7-6.8c-2.3,0-3.5,0.9-4.6,2.4h-0.2l0.6-8.4H3997.3L3997.3,4849.5z M4009.9,4869.6c5.4,0,7.7-4.2,7.7-11.4
	c0-7.2-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4C4002.2,4865.4,4004.5,4869.6,4009.9,4869.6z M4009.9,4867.3c-3.6,0-5-2.9-5-7.3v-3.6
	c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6C4014.9,4864.4,4013.4,4867.3,4009.9,4867.3z M4009.9,4860.1c1.5,0,2-0.6,2-1.5v-0.7
	c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7C4007.9,4859.4,4008.4,4860.1,4009.9,4860.1z M3601.1,4849.5h0.1v-2.1h-12l-0.8,12.1l2.2,0.3
	c0.9-1.1,1.9-1.9,4-1.9c3.1,0,4.8,1.7,4.8,4.6v0.2c0,2.8-1.7,4.6-4.7,4.6c-2.7,0-3.9-1.3-5.1-3l-2,1.5c1.4,1.9,3.3,3.8,7,3.8
	c4.7,0,7.5-3,7.5-7.3s-2.8-6.8-6.7-6.8c-2.3,0-3.5,0.9-4.6,2.4h-0.2l0.6-8.4L3601.1,4849.5L3601.1,4849.5z M3613.7,4869.6
	c5.4,0,7.7-4.2,7.7-11.4c0-7.2-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4C3606,4865.4,3608.3,4869.6,3613.7,4869.6z M3613.6,4867.3
	c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6C3618.6,4864.4,3617.2,4867.3,3613.6,4867.3z M3613.7,4860.1
	c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7C3611.7,4859.4,3612.2,4860.1,3613.7,4860.1z M3962.9,5069.7
	c0-1.4-1.1-2.5-2.5-2.5h-315.9c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5h315.9C3961.8,5072.2,3962.9,5071.1,3962.9,5069.7z
	 M3991,5080.8c4.5,0,7.4-3,7.4-7.3c0-4.2-2.7-6.8-6.6-6.8c-2.7,0-4.3,1.4-5.4,3.2l-0.2-0.1c1.3-5.1,3.9-8,8.7-11.4h-3.4
	c-3.6,2.3-8,7.5-8,14C3983.5,5077.6,3986.3,5080.8,3991,5080.8z M3990.9,5078.6c-3,0-4.8-1.7-4.8-4.7v-0.2c0-3,1.8-4.7,4.8-4.7
	s4.8,1.7,4.8,4.7v0.2C3995.7,5076.8,3993.9,5078.6,3990.9,5078.6z M4009.9,5080.8c5.4,0,7.7-4.2,7.7-11.4c0-7.2-2.3-11.4-7.7-11.4
	s-7.7,4.2-7.7,11.4S4004.5,5080.8,4009.9,5080.8z M4009.9,5078.5c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6
	C4014.9,5075.6,4013.4,5078.5,4009.9,5078.5z M4009.9,5071.3c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7
	C4007.9,5070.6,4008.4,5071.3,4009.9,5071.3z M3594.8,5080.8c4.5,0,7.4-3,7.4-7.3c0-4.2-2.7-6.8-6.6-6.8c-2.7,0-4.3,1.4-5.4,3.2
	l-0.2-0.1c1.3-5.1,3.9-8,8.7-11.4h-3.4c-3.6,2.3-8,7.5-8,14C3587.3,5077.6,3590.1,5080.8,3594.8,5080.8z M3594.7,5078.6
	c-3,0-4.8-1.7-4.8-4.7v-0.2c0-3,1.8-4.7,4.8-4.7s4.8,1.7,4.8,4.7v0.2C3599.5,5076.8,3597.7,5078.6,3594.7,5078.6z M3613.7,5080.8
	c5.4,0,7.7-4.2,7.7-11.4c0-7.2-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4S3608.3,5080.8,3613.7,5080.8z M3613.6,5078.5
	c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6C3618.6,5075.6,3617.2,5078.5,3613.6,5078.5z M3613.7,5071.3
	c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7C3611.7,5070.6,3612.2,5071.3,3613.7,5071.3z M3856.3,4911.3
	c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h105.3C3855.8,4912.5,3856.3,4912,3856.3,4911.3z
	 M3909.5,4964.1c0-1-0.8-1.8-1.8-1.8h-210.6c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8h210.6C3908.7,4965.8,3909.5,4965.1,3909.5,4964.1
	z M3856.3,5016.9c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h105.3
	C3855.8,5018.2,3856.3,5017.6,3856.3,5016.9z M3962.9,5281c0-1.4-1.1-2.5-2.5-2.5h-315.9c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5
	h315.9C3961.8,5283.5,3962.9,5282.4,3962.9,5281z M3986.9,5291.6l2.7-0.1l8.5-19.7v-2.3h-14.7v6.4h2.4v-4.1h9.7L3986.9,5291.6
	L3986.9,5291.6z M4009.9,5292c5.4,0,7.7-4.2,7.7-11.4c0-7.2-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4
	C4002.2,5287.8,4004.5,5292,4009.9,5292z M4009.9,5289.7c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6
	C4014.9,5286.8,4013.4,5289.7,4009.9,5289.7z M4009.9,5282.5c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7
	C4007.9,5281.8,4008.4,5282.5,4009.9,5282.5z M3590.7,5291.6l2.7-0.1l8.5-19.7v-2.3h-14.7v6.4h2.4v-4.1h9.7L3590.7,5291.6
	L3590.7,5291.6z M3613.7,5292c5.4,0,7.7-4.2,7.7-11.4c0-7.2-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4
	C3606,5287.8,3608.3,5292,3613.7,5292z M3613.6,5289.7c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6
	C3618.6,5286.8,3617.2,5289.7,3613.6,5289.7z M3613.7,5282.5c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7
	C3611.7,5281.8,3612.2,5282.5,3613.7,5282.5z M3856.3,5122.5c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2
	h105.3C3855.8,5123.8,3856.3,5123.2,3856.3,5122.5z M3909.5,5175.3c0-1-0.8-1.8-1.8-1.8h-210.6c-1,0-1.8,0.8-1.8,1.8
	s0.8,1.8,1.8,1.8h210.6C3908.7,5177,3909.5,5176.3,3909.5,5175.3z M3856.3,5228.1c0-0.7-0.6-1.2-1.2-1.2h-105.3
	c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h105.3C3855.8,5229.3,3856.3,5228.8,3856.3,5228.1z M3962.9,5492.2c0-1.4-1.1-2.5-2.5-2.5
	h-315.9c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5h315.9C3961.8,5494.7,3962.9,5493.6,3962.9,5492.2z M3991.1,5503.2
	c5.1,0,7.7-2.8,7.7-6.4c0-3-1.8-4.8-4.5-5.5v-0.2c2.3-0.8,3.8-2.7,3.8-5.2c0-3.3-2.7-5.5-7.1-5.5c-4.5,0-7.1,2.1-7.1,5.5
	c0,2.6,1.5,4.4,3.8,5.2v0.2c-2.7,0.8-4.5,2.5-4.5,5.5C3983.2,5500.5,3985.8,5503.2,3991.1,5503.2z M3990.9,5501c-3.1,0-5-1.5-5-4
	v-0.7c0-2.5,1.8-4,5-4s5,1.5,5,4v0.7C3995.9,5499.5,3994.1,5501,3990.9,5501z M3990.9,5490.1c-2.8,0-4.4-1.3-4.4-3.5v-0.4
	c0-2.2,1.6-3.5,4.4-3.5c2.8,0,4.4,1.3,4.4,3.5v0.4C3995.3,5488.9,3993.7,5490.1,3990.9,5490.1z M4009.9,5503.2
	c5.4,0,7.7-4.2,7.7-11.4c0-7.2-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4S4004.5,5503.2,4009.9,5503.2z M4009.9,5500.9
	c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6C4014.9,5498,4013.4,5500.9,4009.9,5500.9z M4009.9,5493.7
	c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7C4007.9,5493,4008.4,5493.7,4009.9,5493.7z M3594.9,5503.2
	c5.1,0,7.7-2.8,7.7-6.4c0-3-1.8-4.8-4.5-5.5v-0.2c2.3-0.8,3.8-2.7,3.8-5.2c0-3.3-2.7-5.5-7.1-5.5c-4.5,0-7.1,2.1-7.1,5.5
	c0,2.6,1.5,4.4,3.8,5.2v0.2c-2.7,0.8-4.5,2.5-4.5,5.5C3587,5500.5,3589.6,5503.2,3594.9,5503.2z M3594.7,5501c-3.1,0-5-1.5-5-4v-0.7
	c0-2.5,1.8-4,5-4s5,1.5,5,4v0.7C3599.7,5499.5,3597.8,5501,3594.7,5501z M3594.7,5490.1c-2.8,0-4.4-1.3-4.4-3.5v-0.4
	c0-2.2,1.6-3.5,4.4-3.5c2.8,0,4.4,1.3,4.4,3.5v0.4C3599.1,5488.9,3597.6,5490.2,3594.7,5490.1z M3613.7,5503.2
	c5.4,0,7.7-4.2,7.7-11.4c0-7.2-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4S3608.3,5503.2,3613.7,5503.2z M3613.6,5500.9
	c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6C3618.6,5498,3617.2,5500.9,3613.6,5500.9z M3613.7,5493.7
	c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7C3611.7,5493,3612.2,5493.7,3613.7,5493.7z M3856.3,5333.8
	c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h105.3C3855.8,5335,3856.3,5334.5,3856.3,5333.8z
	 M3909.5,5386.6c0-1-0.8-1.8-1.8-1.8h-210.6c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8h210.6C3908.7,5388.3,3909.5,5387.6,3909.5,5386.6
	z M3856.3,5545c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h105.3
	C3855.8,5546.2,3856.3,5545.7,3856.3,5545z M3909.5,5597.8c0-1-0.8-1.8-1.8-1.8h-210.6c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8h210.6
	C3908.7,5599.5,3909.5,5598.8,3909.5,5597.8z M3856.3,5439.4c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2
	h105.3C3855.8,5440.7,3856.3,5440.1,3856.3,5439.4z M3962.9,5703.4c0-1.4-1.1-2.5-2.5-2.5h-315.9c-1.4,0-2.5,1.1-2.5,2.5
	s1.1,2.5,2.5,2.5h315.9C3961.8,5705.9,3962.9,5704.8,3962.9,5703.4z M3998.4,5688.4c0-5.3-2.9-8.5-7.5-8.5c-4.5,0-7.4,3-7.4,7.3
	c0,4.2,2.7,6.8,6.6,6.8c2.7,0,4.3-1.4,5.4-3.2l0.2,0.1c-1.3,5.1-3.9,8-8.7,11.4h3.4C3994,5700,3998.4,5694.9,3998.4,5688.4z
	 M3990.9,5691.8c-3,0-4.8-1.7-4.8-4.7v-0.2c0-3,1.8-4.7,4.8-4.7s4.8,1.7,4.8,4.7v0.2C3995.7,5690.1,3993.9,5691.8,3990.9,5691.8z
	 M4009.9,5702.7c5.4,0,7.7-4.2,7.7-11.4c0-7.2-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4S4004.5,5702.7,4009.9,5702.7z M4009.9,5700.4
	c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6C4014.9,5697.5,4013.4,5700.4,4009.9,5700.4z M4009.9,5693.2
	c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7C4007.9,5692.5,4008.4,5693.2,4009.9,5693.2z M3602.2,5688.4
	c0-5.3-2.9-8.5-7.5-8.5c-4.5,0-7.4,3-7.4,7.3c0,4.2,2.7,6.8,6.6,6.8c2.7,0,4.3-1.4,5.4-3.2l0.2,0.1c-1.3,5.1-3.9,8-8.7,11.4h3.4
	C3597.8,5700,3602.2,5694.9,3602.2,5688.4z M3594.7,5691.8c-3,0-4.8-1.7-4.8-4.7v-0.2c0-3,1.8-4.7,4.8-4.7s4.8,1.7,4.8,4.7v0.2
	C3599.5,5690.1,3597.7,5691.8,3594.7,5691.8z M3613.7,5702.7c5.4,0,7.7-4.2,7.7-11.4c0-7.2-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4
	S3608.3,5702.7,3613.7,5702.7z M3613.6,5700.4c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6
	C3618.6,5697.5,3617.2,5700.4,3613.6,5700.4z M3613.7,5693.2c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7
	C3611.7,5692.5,3612.2,5693.2,3613.7,5693.2z M3856.3,5650.6c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2
	h105.3C3855.8,5651.8,3856.3,5651.3,3856.3,5650.6z M3962.9,2112.4c0-1.4-1.1-2.5-2.5-2.5h-315.9c-1.4,0-2.5,1.1-2.5,2.5
	s1.1,2.5,2.5,2.5h315.9C3961.8,2114.9,3962.9,2113.8,3962.9,2112.4z M3991.1,2124c5.1,0,7.7-2.8,7.7-6.4c0-3-1.8-4.8-4.5-5.5v-0.2
	c2.3-0.8,3.8-2.7,3.8-5.2c0-3.3-2.7-5.5-7.1-5.5c-4.5,0-7.1,2.1-7.1,5.5c0,2.6,1.5,4.4,3.8,5.2v0.2c-2.7,0.8-4.5,2.5-4.5,5.5
	C3983.2,2121.2,3985.8,2124,3991.1,2124z M3990.9,2121.8c-3.1,0-5-1.5-5-4v-0.7c0-2.6,1.8-4,5-4s5,1.5,5,4v0.7
	C3995.9,2120.2,3994.1,2121.7,3990.9,2121.8z M3990.9,2110.9c-2.8,0-4.4-1.3-4.4-3.5v-0.4c0-2.2,1.6-3.5,4.4-3.5
	c2.8,0,4.4,1.3,4.4,3.5v0.4C3995.3,2109.6,3993.7,2110.9,3990.9,2110.9z M4009.9,2124c5.4,0,7.7-4.2,7.7-11.4s-2.3-11.4-7.7-11.4
	s-7.7,4.2-7.7,11.4S4004.5,2124,4009.9,2124z M4009.9,2121.7c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6
	C4014.9,2118.8,4013.4,2121.7,4009.9,2121.7z M4009.9,2114.4c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7
	C4007.9,2113.8,4008.4,2114.4,4009.9,2114.4z M3594.9,2124c5.1,0,7.7-2.8,7.7-6.4c0-3-1.8-4.8-4.5-5.5v-0.2c2.3-0.8,3.8-2.7,3.8-5.2
	c0-3.3-2.7-5.5-7.1-5.5c-4.5,0-7.1,2.1-7.1,5.5c0,2.6,1.5,4.4,3.8,5.2v0.2c-2.7,0.8-4.5,2.5-4.5,5.5
	C3587,2121.2,3589.6,2124,3594.9,2124z M3594.7,2121.8c-3.1,0-5-1.5-5-4v-0.7c0-2.6,1.8-4,5-4s5,1.5,5,4v0.7
	C3599.7,2120.2,3597.8,2121.8,3594.7,2121.8z M3594.7,2110.9c-2.8,0-4.4-1.3-4.4-3.5v-0.4c0-2.2,1.6-3.5,4.4-3.5
	c2.8,0,4.4,1.3,4.4,3.5v0.4C3599.1,2109.6,3597.6,2110.9,3594.7,2110.9z M3613.7,2124c5.4,0,7.7-4.2,7.7-11.4s-2.3-11.4-7.7-11.4
	s-7.7,4.2-7.7,11.4S3608.3,2124,3613.7,2124z M3613.6,2121.7c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6
	C3618.6,2118.8,3617.2,2121.7,3613.6,2121.7z M3613.7,2114.4c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7
	C3611.7,2113.8,3612.2,2114.4,3613.7,2114.4z M3856.3,1954c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2
	h105.3C3855.8,1955.2,3856.3,1954.7,3856.3,1954z M3909.5,2006.8c0-1-0.8-1.8-1.8-1.8h-210.6c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8
	h210.6C3908.7,2008.5,3909.5,2007.8,3909.5,2006.8z M3856.3,2059.6c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2
	s0.6,1.2,1.2,1.2h105.3C3855.8,2060.9,3856.3,2060.3,3856.3,2059.6z M3962.9,2323.6c0-1.4-1.1-2.5-2.5-2.5h-315.9
	c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5h315.9C3961.8,2326.1,3962.9,2325,3962.9,2323.6z M3986.9,2334.8l2.7-0.1l8.5-19.7v-2.3
	h-14.7v6.4h2.4v-4.1h9.7L3986.9,2334.8L3986.9,2334.8z M4009.9,2335.2c5.4,0,7.7-4.2,7.7-11.4s-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4
	S4004.5,2335.2,4009.9,2335.2z M4009.9,2332.9c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6
	C4014.9,2330,4013.4,2332.9,4009.9,2332.9z M4009.9,2325.6c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7
	C4007.9,2325,4008.4,2325.6,4009.9,2325.6z M3590.7,2334.8l2.7-0.1l8.5-19.7v-2.3h-14.7v6.4h2.4v-4.1h9.7L3590.7,2334.8
	L3590.7,2334.8z M3613.7,2335.2c5.4,0,7.7-4.2,7.7-11.4s-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4S3608.3,2335.2,3613.7,2335.2z
	 M3613.6,2332.9c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6C3618.6,2330,3617.2,2332.9,3613.6,2332.9z
	 M3613.7,2325.6c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7C3611.7,2325,3612.2,2325.6,3613.7,2325.6z
	 M3856.3,2165.2c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h105.3
	C3855.8,2166.5,3856.3,2165.9,3856.3,2165.2z M3909.5,2218c0-1-0.8-1.8-1.8-1.8h-210.6c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8h210.6
	C3908.7,2219.8,3909.5,2219,3909.5,2218z M3856.3,2270.8c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2
	h105.3C3855.8,2272,3856.3,2271.5,3856.3,2270.8z M3962.9,1901.2c0-1.4-1.1-2.5-2.5-2.5h-315.9c-1.4,0-2.5,1.1-2.5,2.5
	s1.1,2.5,2.5,2.5h315.9C3961.8,1903.7,3962.9,1902.6,3962.9,1901.2z M3998.4,1913.4c0-5.3-2.9-8.5-7.5-8.5c-4.5,0-7.4,3-7.4,7.3
	c0,4.2,2.7,6.8,6.6,6.8c2.7,0,4.3-1.4,5.4-3.2l0.2,0.1c-1.3,5.1-3.9,8-8.7,11.4h3.4C3994,1925,3998.4,1919.9,3998.4,1913.4z
	 M3990.9,1916.8c-3,0-4.8-1.7-4.8-4.7v-0.2c0-3,1.8-4.7,4.8-4.7s4.8,1.7,4.8,4.7v0.2C3995.7,1915.1,3993.9,1916.8,3990.9,1916.8z
	 M4009.9,1927.7c5.4,0,7.7-4.2,7.7-11.4c0-7.2-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4S4004.5,1927.7,4009.9,1927.7z M4009.9,1925.4
	c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6C4014.9,1922.5,4013.4,1925.4,4009.9,1925.4z M4009.9,1918.2
	c1.5,0,2-0.7,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.7-2,1.5v0.7C4007.9,1917.5,4008.4,1918.2,4009.9,1918.2z M3602.2,1913.4
	c0-5.3-2.9-8.5-7.5-8.5c-4.5,0-7.4,3-7.4,7.3c0,4.2,2.7,6.8,6.6,6.8c2.7,0,4.3-1.4,5.4-3.2l0.2,0.1c-1.3,5.1-3.9,8-8.7,11.4h3.4
	C3597.8,1925,3602.2,1919.9,3602.2,1913.4z M3594.7,1916.8c-3,0-4.8-1.7-4.8-4.7v-0.2c0-3,1.8-4.7,4.8-4.7s4.8,1.7,4.8,4.7v0.2
	C3599.5,1915.1,3597.7,1916.8,3594.7,1916.8z M3613.7,1927.7c5.4,0,7.7-4.2,7.7-11.4c0-7.2-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4
	S3608.3,1927.7,3613.7,1927.7z M3613.6,1925.4c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6
	C3618.6,1922.5,3617.2,1925.4,3613.6,1925.4z M3613.7,1918.2c1.5,0,2-0.7,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.7-2,1.5v0.7
	C3611.7,1917.5,3612.2,1918.2,3613.7,1918.2z M3962.9,2534.9c0-1.4-1.1-2.5-2.5-2.5h-315.9c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5
	h315.9C3961.8,2537.4,3962.9,2536.3,3962.9,2534.9z M3991,2546.3c4.5,0,7.4-3,7.4-7.3c0-4.2-2.7-6.8-6.6-6.8c-2.7,0-4.3,1.4-5.4,3.2
	l-0.2-0.1c1.3-5.1,3.9-8,8.7-11.4h-3.4c-3.6,2.3-8,7.5-8,14C3983.5,2543.2,3986.3,2546.4,3991,2546.3z M3990.9,2544.1
	c-3,0-4.8-1.7-4.8-4.7v-0.2c0-3,1.8-4.7,4.8-4.7s4.8,1.7,4.8,4.7v0.2C3995.7,2542.4,3993.9,2544.1,3990.9,2544.1z M4009.9,2546.4
	c5.4,0,7.7-4.2,7.7-11.4s-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4S4004.5,2546.4,4009.9,2546.4z M4009.9,2544.1c-3.6,0-5-2.9-5-7.3
	v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6C4014.9,2541.2,4013.4,2544.1,4009.9,2544.1z M4009.9,2536.8c1.5,0,2-0.6,2-1.5v-0.7
	c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7C4007.9,2536.2,4008.4,2536.8,4009.9,2536.8z M3594.8,2546.3c4.5,0,7.4-3,7.4-7.3
	c0-4.2-2.7-6.8-6.6-6.8c-2.7,0-4.3,1.4-5.4,3.2l-0.2-0.1c1.3-5.1,3.9-8,8.7-11.4h-3.4c-3.6,2.3-8,7.5-8,14
	C3587.3,2543.2,3590.1,2546.4,3594.8,2546.3z M3594.7,2544.1c-3,0-4.8-1.7-4.8-4.7v-0.2c0-3,1.8-4.7,4.8-4.7s4.8,1.7,4.8,4.7v0.2
	C3599.5,2542.4,3597.7,2544.1,3594.7,2544.1z M3613.7,2546.4c5.4,0,7.7-4.2,7.7-11.4s-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4
	S3608.3,2546.4,3613.7,2546.4z M3613.6,2544.1c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6
	C3618.6,2541.2,3617.2,2544.1,3613.6,2544.1z M3613.7,2536.8c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7
	C3611.7,2536.2,3612.2,2536.8,3613.7,2536.8z M3856.3,2376.4c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2
	h105.3C3855.8,2377.6,3856.3,2377.1,3856.3,2376.4z M3909.5,2429.2c0-1-0.8-1.8-1.8-1.8h-210.6c-1,0-1.8,0.8-1.8,1.8
	s0.8,1.8,1.8,1.8h210.6C3908.7,2431,3909.5,2430.2,3909.5,2429.2z M3856.3,2587.7c0-0.7-0.6-1.2-1.2-1.2h-105.3
	c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h105.3C3855.8,2589,3856.3,2588.4,3856.3,2587.7z M3856.3,2693.3c0-0.7-0.6-1.2-1.2-1.2
	h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h105.3C3855.8,2694.5,3856.3,2694,3856.3,2693.3z M3909.5,2640.5
	c0-1-0.8-1.8-1.8-1.8h-210.6c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8h210.6C3908.7,2642.2,3909.5,2641.5,3909.5,2640.5z
	 M3856.3,2482.1c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h105.3
	C3855.8,2483.4,3856.3,2482.8,3856.3,2482.1z M3962.9,2746.1c0-1.4-1.1-2.5-2.5-2.5h-315.9c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5
	h315.9C3961.8,2748.6,3962.9,2747.5,3962.9,2746.1z M3997.3,2737.5l0.1-2.1h-12l-0.8,12.1l2.2,0.3c0.9-1.1,1.9-1.9,4-1.9
	c3.1,0,4.8,1.7,4.8,4.6v0.2c0,2.8-1.7,4.6-4.7,4.6c-2.7,0-3.9-1.3-5.1-3l-2,1.5c1.4,1.9,3.3,3.8,7,3.8c4.7,0,7.5-3,7.5-7.3
	s-2.8-6.8-6.7-6.8c-2.3,0-3.5,0.9-4.6,2.4h-0.2l0.6-8.4H3997.3L3997.3,2737.5z M4009.9,2757.6c5.4,0,7.7-4.2,7.7-11.4
	s-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4S4004.5,2757.6,4009.9,2757.6z M4009.9,2755.3c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3
	s5,2.9,5,7.3v3.6C4014.9,2752.4,4013.4,2755.3,4009.9,2755.3z M4009.9,2748c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5
	s-2,0.6-2,1.5v0.7C4007.9,2747.4,4008.4,2748,4009.9,2748z M3601.1,2737.5h0.1v-2.1h-12l-0.8,12.1l2.2,0.3c0.9-1.1,1.9-1.9,4-1.9
	c3.1,0,4.8,1.7,4.8,4.6v0.2c0,2.8-1.7,4.6-4.7,4.6c-2.7,0-3.9-1.3-5.1-3l-2,1.5c1.4,1.9,3.3,3.8,7,3.8c4.7,0,7.5-3,7.5-7.3
	s-2.8-6.8-6.7-6.8c-2.3,0-3.5,0.9-4.6,2.4h-0.2l0.6-8.4L3601.1,2737.5L3601.1,2737.5z M3613.7,2757.6c5.4,0,7.7-4.2,7.7-11.4
	s-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4S3608.3,2757.6,3613.7,2757.6z M3613.6,2755.3c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3
	s5,2.9,5,7.3v3.6C3618.6,2752.4,3617.2,2755.3,3613.6,2755.3z M3613.7,2748c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5
	s-2,0.6-2,1.5v0.7C3611.7,2747.4,3612.2,2748,3613.7,2748z M3962.9,2957.3c0-1.4-1.1-2.5-2.5-2.5h-315.9c-1.4,0-2.5,1.1-2.5,2.5
	s1.1,2.5,2.5,2.5h315.9C3961.8,2959.8,3962.9,2958.7,3962.9,2957.3z M3995.9,2968.4v-4.3h3.3v-2.2h-3.3v-15.5h-3.9l-9.5,15.4v2.3
	h10.9v4.3H3995.9z M3993.3,2948.4h0.1v13.5h-8.5L3993.3,2948.4z M4009.9,2968.8c5.4,0,7.7-4.2,7.7-11.4s-2.3-11.4-7.7-11.4
	s-7.7,4.2-7.7,11.4C4002.2,2964.6,4004.5,2968.8,4009.9,2968.8z M4009.9,2966.5c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3
	s5,2.9,5,7.3v3.6C4014.9,2963.6,4013.4,2966.5,4009.9,2966.5z M4009.9,2959.2c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5
	s-2,0.6-2,1.5v0.7C4007.9,2958.6,4008.4,2959.2,4009.9,2959.2z M3599.7,2968.4v-4.3h3.3v-2.2h-3.3v-15.5h-3.9l-9.5,15.4v2.3h10.9
	v4.3H3599.7z M3597.1,2948.4h0.1v13.5h-8.5L3597.1,2948.4z M3613.7,2968.8c5.4,0,7.7-4.2,7.7-11.4s-2.3-11.4-7.7-11.4
	s-7.7,4.2-7.7,11.4C3606,2964.6,3608.3,2968.8,3613.7,2968.8z M3613.6,2966.5c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3
	s5,2.9,5,7.3v3.6C3618.6,2963.6,3617.2,2966.5,3613.6,2966.5z M3613.7,2959.2c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5
	s-2,0.6-2,1.5v0.7C3611.7,2958.6,3612.2,2959.2,3613.7,2959.2z M3856.3,2798.9c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2
	s0.6,1.2,1.2,1.2h105.3C3855.8,2800.1,3856.3,2799.6,3856.3,2798.9z M3909.5,2851.7c0-1-0.8-1.8-1.8-1.8h-210.6
	c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8h210.6C3908.7,2853.5,3909.5,2852.7,3909.5,2851.7z M3856.3,2904.5c0-0.7-0.6-1.2-1.2-1.2
	h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h105.3C3855.8,2905.8,3856.3,2905.2,3856.3,2904.5z M3962.9,3168.6
	c0-1.4-1.1-2.5-2.5-2.5h-315.9c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5h315.9C3961.8,3171.1,3962.9,3170,3962.9,3168.6z
	 M3990,3166.9l-2.4,0.1v2.3h2.6c3.3,0,4.9,1.5,4.9,4.1v0.2c0,2.6-1.7,4.1-4.8,4.1c-2.7,0-4-1.3-5.2-3l-2,1.5
	c1.3,1.9,3.3,3.8,7.2,3.8c4.6,0,7.6-2.6,7.6-6.4c0-3.4-2.3-5.1-4.7-5.6v-0.1c2.4-0.5,4.3-2.3,4.3-5.1c0-3.6-3-5.6-6.8-5.6
	c-3.6,0-5.6,1.8-6.7,3.6l2,1.5c0.9-1.7,2.3-2.8,4.6-2.8c2.4,0,4,1.2,4,3.5v0.2C3994.6,3165.3,3993.1,3166.9,3990,3166.9L3990,3166.9
	z M4009.9,3180c5.4,0,7.7-4.2,7.7-11.4s-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4S4004.5,3180,4009.9,3180z M4009.9,3177.7
	c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6C4014.9,3174.8,4013.4,3177.7,4009.9,3177.7z M4009.9,3170.4
	c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7C4007.9,3169.8,4008.4,3170.4,4009.9,3170.4z M3593.8,3166.9l-2.4,0.1
	v2.3h2.6c3.3,0,4.9,1.5,4.9,4.1v0.2c0,2.6-1.7,4.1-4.8,4.1c-2.7,0-4-1.3-5.2-3l-2,1.5c1.3,1.9,3.3,3.8,7.2,3.8
	c4.6,0,7.6-2.6,7.6-6.4c0-3.4-2.3-5.1-4.7-5.6v-0.1c2.4-0.5,4.3-2.3,4.3-5.1c0-3.6-3-5.6-6.8-5.6c-3.6,0-5.6,1.8-6.7,3.6l2,1.5
	c0.9-1.7,2.3-2.8,4.6-2.8c2.4,0,4,1.2,4,3.5v0.2C3598.4,3165.3,3596.9,3166.9,3593.8,3166.9L3593.8,3166.9z M3613.7,3180
	c5.4,0,7.7-4.2,7.7-11.4s-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4S3608.3,3180,3613.7,3180z M3613.6,3177.7c-3.6,0-5-2.9-5-7.3v-3.6
	c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6C3618.6,3174.8,3617.2,3177.7,3613.6,3177.7z M3613.7,3170.4c1.5,0,2-0.6,2-1.5v-0.7
	c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7C3611.7,3169.8,3612.2,3170.4,3613.7,3170.4z M3856.3,3010.1c0-0.7-0.6-1.2-1.2-1.2h-105.3
	c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h105.3C3855.8,3011.4,3856.3,3010.8,3856.3,3010.1z M3909.5,3063c0-1-0.8-1.8-1.8-1.8
	h-210.6c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8h210.6C3908.7,3064.8,3909.5,3064,3909.5,3063z M3856.3,3115.8c0-0.7-0.6-1.2-1.2-1.2
	h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h105.3C3855.8,3117,3856.3,3116.5,3856.3,3115.8z M3962.9,3379.8
	c0-1.4-1.1-2.5-2.5-2.5h-315.9c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5h315.9C3961.8,3382.3,3962.9,3381.2,3962.9,3379.8z
	 M3998.4,3390.8l0.2-2.2h-12l6.2-5.4c2.9-2.6,4.9-5,4.9-8.4c0-3.8-2.5-6.4-6.9-6.4s-6.3,2.6-7.2,5.2l2.4,0.9c0.7-2.3,2-3.8,4.7-3.8
	c2.7,0,4.1,1.6,4.1,4.2v0.4c0,2.2-1.6,4.3-3.7,6.2l-7.4,6.6v2.7H3998.4L3998.4,3390.8z M4009.9,3391.2c5.4,0,7.7-4.2,7.7-11.4
	s-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4S4004.5,3391.2,4009.9,3391.2z M4009.9,3388.9c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3
	s5,2.9,5,7.3v3.6C4014.9,3386,4013.4,3388.9,4009.9,3388.9z M4009.9,3381.6c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5
	s-2,0.6-2,1.5v0.7C4007.9,3381,4008.4,3381.6,4009.9,3381.6z M3602.2,3390.8l0.2-2.2h-12l6.2-5.4c2.9-2.6,4.9-5,4.9-8.4
	c0-3.8-2.5-6.4-6.9-6.4s-6.3,2.6-7.2,5.2l2.4,0.9c0.7-2.3,2-3.8,4.7-3.8c2.7,0,4.1,1.6,4.1,4.2v0.4c0,2.2-1.6,4.3-3.7,6.2l-7.4,6.6
	v2.7H3602.2L3602.2,3390.8z M3613.7,3391.2c5.4,0,7.7-4.2,7.7-11.4s-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4
	S3608.3,3391.2,3613.7,3391.2z M3613.6,3388.9c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6
	C3618.6,3386,3617.2,3388.9,3613.6,3388.9z M3613.7,3381.6c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7
	C3611.7,3381,3612.2,3381.6,3613.7,3381.6z M3856.3,3221.4c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2
	h105.3C3855.8,3222.6,3856.3,3222.1,3856.3,3221.4z M3909.5,3274.2c0-1-0.8-1.8-1.8-1.8h-210.6c-1,0-1.8,0.8-1.8,1.8
	s0.8,1.8,1.8,1.8h210.6C3908.7,3276,3909.5,3275.2,3909.5,3274.2z M3856.3,3432.6c0-0.7-0.6-1.2-1.2-1.2h-105.3
	c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h105.3C3855.8,3433.9,3856.3,3433.3,3856.3,3432.6z M3909.5,3485.4c0-1-0.8-1.8-1.8-1.8
	h-210.6c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8h210.6C3908.7,3487.1,3909.5,3486.4,3909.5,3485.4z M3856.3,3327
	c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h105.3C3855.8,3328.2,3856.3,3327.7,3856.3,3327z
	 M3962.9,3591.1c0-1.4-1.1-2.5-2.5-2.5h-315.9c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5h315.9
	C3961.8,3593.6,3962.9,3592.5,3962.9,3591.1z M3984.2,3602l14.6-0.1v-2.3h-5.8v-19.7h-4.1l-5.8,5.5l1.6,1.7l5.6-5.2h0.2v17.8h-6.3
	V3602L3984.2,3602z M4009.9,3602.4c5.4,0,7.7-4.2,7.7-11.4s-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4S4004.5,3602.4,4009.9,3602.4z
	 M4009.9,3600.1c-3.6,0-5-2.9-5-7.3v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6C4014.9,3597.2,4013.4,3600.1,4009.9,3600.1z
	 M4009.9,3592.8c1.5,0,2-0.6,2-1.5v-0.7c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7C4007.9,3592.2,4008.4,3592.8,4009.9,3592.8z
	 M3587.9,3602l14.6-0.1v-2.3h-5.8v-19.7h-4.1l-5.8,5.5l1.6,1.7l5.6-5.2h0.2v17.8h-6.3V3602L3587.9,3602z M3613.7,3602.4
	c5.4,0,7.7-4.2,7.7-11.4s-2.3-11.4-7.7-11.4s-7.7,4.2-7.7,11.4S3608.3,3602.4,3613.7,3602.4z M3613.6,3600.1c-3.6,0-5-2.9-5-7.3
	v-3.6c0-4.4,1.4-7.3,5-7.3s5,2.9,5,7.3v3.6C3618.6,3597.2,3617.2,3600.1,3613.6,3600.1z M3613.7,3592.8c1.5,0,2-0.6,2-1.5v-0.7
	c0-0.8-0.5-1.5-2-1.5s-2,0.6-2,1.5v0.7C3611.7,3592.2,3612.2,3592.8,3613.7,3592.8z M3856.3,3538.2c0-0.7-0.6-1.2-1.2-1.2h-105.3
	c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h105.3C3855.8,3539.5,3856.3,3538.9,3856.3,3538.2z M3856.3,3643.9c0-0.7-0.6-1.2-1.2-1.2
	h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h105.3C3855.8,3645.1,3856.3,3644.6,3856.3,3643.9z M3909.5,3696.7
	c0-1-0.8-1.8-1.8-1.8h-210.6c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8h210.6C3908.7,3698.5,3909.5,3697.7,3909.5,3696.7z
	 M3856.3,3749.5c0-0.7-0.6-1.2-1.2-1.2h-105.3c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h105.3
	C3855.8,3750.8,3856.3,3750.2,3856.3,3749.5z"
            />
        </svg>
    )

    let altitude = telemetryContext.altitude
    let speed = Math.abs(telemetryContext.speedX)

    const hdgString = {
        transform: `translateY(80%) rotate(${-telemetryContext.yaw}deg)`
    }

    return (
        <div className="horizon">
            <div className="alt-text">
                <div className="float-right inline plex">{altitude}</div>
            </div>
            <div className="air-text plex">{speed}</div>
            <div className="static-frame">
                <img
                    src="./assets/HUD_static-frame.svg"
                    alt="Artificial Horizon Base Frame"
                />
            </div>

            <div className="pitch-mask">
                {/* <div className="pitch-indicator-test" style={transformString}> */}
                {/* <div className="pitch-indicator-test">
                    <img
                        className="pitch-translate"
                        src="./assets/HUD_pitch-indicator_TEST.svg"
                        alt="pitch indicator svg"
                        width="100%"
                    />
                </div> */}
                <div className="pitch-indicator" style={transformString}>
                    {/* <img
                        className="pitch-translate"
                        src="./assets/HUD_pitch-indicator_SOLO.svg"
                        alt="pitch indicator svg"
                        width="100%"
                    /> */}
                    <PitchIndicator fill="#FFFFFF" /> {/* INLINE SVG */}
                </div>
            </div>

            <div className="pitch-indicator-colour" style={transformString}>
                <img
                    className="pitch-translate"
                    src="./assets/HUD_pitch-indicator_colour.svg"
                    alt="pitch indicator svg"
                    width="100%"
                />
            </div>

            <div className="heading-indicator" style={hdgString}>
                <img
                    src="./assets/HUD_heading-indicator.svg"
                    alt="Heading Indicator"
                />
            </div>
            {/* <div className="pitch-indicator" style={pitchPosition}>
                <img
                    src="./assets/HUD_pitch-indicator.svg"
                    alt="Pitch Indicator"
                />
            </div> */}

            <div className="horizon-indicator">&nbsp;</div>

            <div
                className="angle-of-bank-indicator"
                id="angle-of-bank-indicator"
                style={bankRotation}
            >
                <div id="angle-of-bank-indicator-visibility">
                    <img
                        src="./assets/HUD_angle-of-bank-indicator.svg"
                        alt="Angle of Bank Indicator"
                    />
                </div>
            </div>
        </div>
    )
}

export default ArtificialHorizon
