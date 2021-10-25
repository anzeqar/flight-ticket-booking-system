import axios from "axios";
import { useState } from "react";

let selectedSeats = [];
const Book = () => {
  const [seats, getEditSeats] = useState([]);
  const [display, setDisplay] = useState("d-none");
  const [bookingIdSubmit, getbookingIdSubmit] = useState("");
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const getSeats = (e) => {
    e.preventDefault();
    const bookingId = {
      bookingId: e.target[0].value,
    };
    if (bookingId.bookingId.length !== 24) {
      alert("Error: Booking ID Invalid");
    } else {
      axios
        .post("/api/showeditseats", bookingId, header)
        .then((data) => {
          getbookingIdSubmit(bookingId.bookingId);
          getEditSeats(data.data.data);

          seats.forEach((item) => (item.isSelected = false));
          setDisplay("d-flex");
        })
        .catch((err) => {
          getEditSeats([]);
          setDisplay("d-none");
          alert("No Such Booking ID");
        });
    }
  };

  const editSeats = (e) => {
    e.preventDefault();
    const data = {
      bookingId: bookingIdSubmit,
      seats: selectedSeats,
    };
    if (selectedSeats.length <= 0) {
      alert("Error: Select atleast 1 Seat");
    } else if (selectedSeats.length >= seats.length) {
      alert("Error: No Seats Left for Cancelling");
    } else {
      axios
        .post("/api/editseats", data, header)
        .then((data) => {})
        .then(
          axios
            .post("/api/showeditseats", { bookingId: bookingIdSubmit }, header)
            .then((data) => {
              alert(`Success: Seats Cancelled Successfully`);

              getEditSeats(data.data.data);

              seats.forEach((item) => (item.isSelected = false));
              setDisplay("d-flex");
              setTimeout(() => {
                window.location.reload();
              }, 100);
            })
            .catch((err) => alert(err.response.data.err))
        )
        .catch((err) => alert(err.response.data.err));
    }
  };

  return (
    <div className="container">
      <header>
        <h1 className="mb-4 mt-4 mb-2 text-center">
          Cancel Seats IndiGo {`(BOM => DEL)`}
        </h1>
      </header>
      <div className="text-center container mt-2">
        <form method="post" className="d-flex flex-column" onSubmit={getSeats}>
          <input
            type="text"
            name="name"
            className="form-control mb-2"
            id="name"
            placeholder="Booking Id"
            required={true}
          />
          <input type="submit" className="btn btn-primary" value="Get Seats" />
        </form>
      </div>

      <div className={`${display} container`}>
        <div className="container flight-map">
          <div className="d-flex flex-column">
            <span className="h3 text-secondary text-center mt-2 mb-1">
              Select Seats You Want
            </span>
            <form
              method="post"
              className=" ms-auto mt-1 mb-2"
              onSubmit={editSeats}
            >
              <input
                type="submit"
                className="btn btn-danger "
                value="Cancel Unselected Seats"
              />
            </form>
          </div>

          <div className="container row row-cols-6 d-flex">
            {seats.map((seat) => {
              return (
                <div className="col" key={seat.number}>
                  <div
                    className={` btn d-flex justify-content-center mt-1 mb-1 p-3 text-center btn-primary`}
                    onClick={(event) => {
                      let targetElement = event.target || event.srcElement;
                      if (seat.isSelected) {
                        seat.isSelected = false;
                        targetElement.classList.add("btn-primary");
                        targetElement.classList.remove("btn-success");
                        const index = selectedSeats.indexOf(seat.number);
                        if (index > -1) {
                          selectedSeats.splice(index, 1);
                        }
                      } else {
                        seat.isSelected = true;

                        targetElement.classList.add("btn-success");
                        targetElement.classList.remove("btn-primary");
                        if (!selectedSeats.includes(seat.number)) {
                          selectedSeats.push(seat.number);
                        }
                      }
                    }}
                  >
                    {seat.number}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
