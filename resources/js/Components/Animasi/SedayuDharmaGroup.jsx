import { useRef, useEffect } from 'react';
import anime from 'animejs';

export default function Animasi() {
    const animationRef = useRef(null);

    const animasi = () => {
        animationRef.current =
            anime.timeline({
                easing: 'linear',
                loop: true,
                direction: 'alternate',
                duration: 2000
            })
                .add({
                    targets: '#SD',
                    strokeDashoffset: [anime.setDashoffset, 0],
                })
                .add({
                    targets: '#airAtas',
                    strokeDashoffset: [anime.setDashoffset, 0],
                }, '-=1000')
                .add({
                    targets: '#airAtas',
                    fill: '#05437c'
                }, '-=500')
                .add({
                    targets: '#airBawah',
                    strokeDashoffset: [anime.setDashoffset, 0]
                }, '-=2500')
                .add({
                    targets: '#airBawah',
                    fill: '#d60707'
                }, '-=500')
                .add({
                    targets: '#textLogo',
                    opacity: [0, 1]
                }, '-=2000');
    }

    useEffect(() => {
        animasi();
    }, []);

    return (

        <div id="box" className='flex justify-center w-fit p-5 bg-white'>
            <svg viewBox="0 0 256 256" className='h-96'>
                <g id="logo">
                    <path id="SD" fill="none" style={{strokeWidth: "1", stroke: "#221515"}}
                        d="M90,90 C90,90 110,110 130,90 C130,90 150,60 100,55 C100,55 90,50 100,40" />
                    <path id="airAtas" fill="none" style={{strokeWidth: "1", stroke: "#05437c"}}
                        d="M0,130 C0,130 70,90 130,122 C130,122 186,150 256,124 C256,124 186,170 128,140 C128,140 70,110 0,130 Z" />
                    <path id="airBawah" fill="none" style={{strokeWidth: "1", stroke: "#d60707"}}
                        d="M128,145 C128,145 180,174 256,128 C256,128 180,198 128,145 Z" />
                </g>
                <text id="textLogo" x="32" y="185" fill="#05437c" style={{fontSize: '10pt', letterSpacing: '1px'}}>SEDAYU
                    DHARMA GROUP</text>
            </svg>
        </div>
    );
}