import axios from "axios";
import { useState } from "react";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const fetchBookings = () => {
    axios.get("/api/bookings").then((res) => {
      const fetchedBookings = res.data.data;
      setBookings(fetchedBookings);
    });
  };
  if (bookings.length === 0) {
    fetchBookings();
  }

  const toggleArrived = (e) => {
    e.preventDefault();
    const bookingId = e.target[0].value;
    const isArrived = e.target[1].value;
    const data = {
      bookingId: bookingId,
      isArrived: isArrived,
    };
    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.post("/api/bookings", data, header).then(fetchBookings());
  };
  return (
    <div className="container">
      <header>
        <h1 className="mb-4 mt-2 text-center">All Bookings in Sequence</h1>
      </header>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Seq.</th>
            <th scope="col">Name</th>
            <th scope="col">Booking Id</th>
            <th scope="col">Seats</th>
            <th scope="col">Mobile</th>
            <th scope="col">Arrived</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking._id}>
              <td>{index + 1}</td>
              <td>{booking.name}</td>
              <td>{booking._id}</td>
              <td>
                {booking.seats.map((seat) => (
                  <span key={seat}>{"| " + seat + " |"}</span>
                ))}
              </td>
              <td>
                <a href={`tel:${booking.mobile}`} className="btn btn-success">
                  {booking.mobile}
                </a>
              </td>
              <td>
                <form method="post" onSubmit={toggleArrived}>
                  <input type="hidden" name="bookingId" value={booking._id} />
                  <input
                    type="hidden"
                    name="isArrived"
                    value={Boolean(booking.isArrived)}
                  />

                  <button className="btn btn-primary" type="sumbit">
                    {String(booking.isArrived)}
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
