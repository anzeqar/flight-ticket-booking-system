import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div>
            <Link to="/book">New Booking</Link>
            <br />
            <Link to="/update">Update Booking</Link>
            <br />
            <Link to="/bookings">All Bookings</Link>

        </div>
    )
}

export default Landing;