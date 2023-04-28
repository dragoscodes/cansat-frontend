import './Battery.scss'

export default function Battery({ level }) {

    if (level > "25%" || level=="100%") return (
        <div class="battery">
            <div class="battery-level" style={{ height: level }}>
            </div>
            <div style={{ position: 'absolute', left: '3px' }}>
                <h1>{level}</h1>
            </div>
        </div>
    )
    else if (level > "10%") return (
        <div class="battery">
            <div class="battery-level warn" style={{ height: level }}>
            </div>
            <div style={{ position: 'absolute', left: '3px' }}>
                <h1>{level}</h1>
            </div>
        </div>
    )
    else return (
        <div class="battery">
            <div class="battery-level alert" style={{ height: level }}>
            </div>
            <div style={{ position: 'absolute', left: '3px' }}>
                <h1>{level}</h1>
            </div>
        </div>
    )

}