import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div
      className="d-flex justify-content-center algin-items-center bg-landing "
      style={{ minHeight: "100vh" }}
    >
      <div className="d-flex justify-content-center align-self-center rounded flex-column overlay-bg p-4">
        <h1 className="text-light pb-2">Flight Ticket Booking System</h1>
        <h2 className="text-center mt-2 mb-2 text-primary">
          IndiGo {`(BOM => DEL)`}
        </h2>
        <div className="d-flex flex-column mt-4 justify-content-center text-center">
          <Link
            to="/bookings"
            className="text-decoration-none btn btn-outline-info fs-4 m-2"
          >
            Bookings
          </Link>

          <Link
            to="/book"
            className="text-decoration-none btn btn-outline-success fs-4 m-2"
          >
            Book Seats
          </Link>

          <Link
            to="/update"
            className="text-decoration-none btn btn-outline-primary fs-4 m-2"
          >
            Update Seats
          </Link>

          <Link
            to="/edit"
            className="text-decoration-none btn btn-outline-danger fs-4 m-2"
          >
            Cancel Seats
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
