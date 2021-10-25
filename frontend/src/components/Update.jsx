import axios from "axios";
import { useState } from "react";

let selectedSeats = [];

const Book = () => {
  const [seats, getSeats] = useState([]);
  const fetchSeats = () => {
    axios.get("/api/seats").then((res) => {
      getSeats(res.data.data);
    });
    seats.forEach((item) => (item.isSelected = false));
  };
  if (seats.length === 0) {
    fetchSeats();
  }

  const book = (e) => {
    e.preventDefault();
    const data = {
      bookingId: e.target[0].value,
      seats: selectedSeats,
    };

    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (data.bookingId.length !== 24) {
      alert("Error: Booking ID Invalid");
    } else if (data.seats.length <= 0) {
      alert("Error: Please select some seats");
    } else {
      axios
        .put("/api/update", data, header)
        .then((data) => {
          alert("Success: Seats Updated Successfully");
          fetchSeats();
          e.target[0].value = "";
          setTimeout(() => {
            window.location.reload();
          }, 100);
        })
        .catch((err) => {
          alert(err.response.data.err);
        });
    }
  };
  return (
    <div className="">
      <header>
        <h1 className="mb-4 mt-4 text-center">
          Update Seats IndiGo {`(BOM => DEL)`}
        </h1>
      </header>
      <div className="text-center container mt-2">
        <form method="post" className="d-flex flex-column" onSubmit={book}>
          <input
            type="text"
            className="form-control mb-2"
            name="bookingId"
            id="bookingId"
            placeholder="Booking Id"
          />
          <input
            type="submit"
            value="Update Seats"
            className="btn btn-primary"
          />
        </form>
      </div>

      <div className="container flight-map">
        <div className="d-flex justify-content-center">
          <span className="h3 text-secondary text-center mt-2 mb-4">
            IndiGo Seats {`(BOM => DEL)`}
          </span>
        </div>
        <div className="container row row-cols-6 d-flex justify-content-center ">
          {seats.map((seat) => {
            return (
              <div className="col" key={seat.number}>
                <div
                  key={seat.number}
                  className={` d-flex mt-1 mb-1 justify-content-center btn ${
                    seat.isBooked ? "btn-secondary" : "btn-primary"
                  }`}
                  onClick={(event) => {
                    if (seat.isBooked) {
                      alert("Warning: Reserved Seat");
                    } else {
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
                        if (
                          !selectedSeats.includes(seat.number) &&
                          selectedSeats.length < 6
                        ) {
                          selectedSeats.push(seat.number);
                        }
                      }

                      if (selectedSeats.length >= 6) {
                        alert("Warning: Only 6 seats in One Booking");
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
  );
};

export default Book;
