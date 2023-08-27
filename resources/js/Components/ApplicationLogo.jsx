export default function ApplicationLogo({ panjangKah }) {
    return (
        <div className="w-full h-fit m-auto">
            {panjangKah ? (
                <LogoPanjang />
            ) : (
                <LogoPendek />
            )}
        </div>
    );
}

function LogoPendek() {
    return (
        <svg className="text-white w-full h-full text-5xl font-hemiHead" viewBox="0 0 100 100">
            <g fill="currentColor">
                <polygon points="10,95 50,5 50,35" className="leftWing" />
                <text x="30" y="90" className="text">
                    B
                </text>
                <polygon points="100,95 55,5 55,35" className="rightWing" />
            </g>
        </svg>
    );
}

function LogoPanjang() {
    return (
        <svg className="text-white w-full h-full text-5xl font-hemiHead" viewBox="0 0 450 100">
            <g fill="currentColor">
                <polygon points="45,95 15,20 35,40" className="leftWing" />
                <text x="60" y="90" className="text">
                    Blackadders
                </text>
                <polygon points="450,35 10,5 40,35" className="rightWing" />
            </g>
        </svg>
    );
}