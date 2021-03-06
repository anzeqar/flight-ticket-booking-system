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
      name: e.target[0].value,
      mobile: e.target[1].value,
      seats: selectedSeats,
    };

    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data.mobile <= 1000000000) {
      alert("Error: Mobile number Less than 10 digits");
    } else if (data.mobile > 999999999999) {
      alert("Error: Mobile number Greater than 12 digits");
    } else if (data.seats.length <= 0) {
      alert("Error: Please Select Some Seats");
    } else {
      axios
        .post("/api/book", data, header)
        .then((data) => {
          const booking = {
            bookingId: data.data.data._id,
            date: data.data.data.date,
            mobile: data.data.data.mobile,
            seats: selectedSeats,
          };
          axios.put("/api/book", booking, header).then((data) => {
            const { bookingId, date, mobile, seats } = data.data.data;
            let formatDate = new Date(date);
            let year = formatDate.getFullYear();
            let month = formatDate.getMonth() + 1;
            let dt = formatDate.getDate();

            if (dt < 10) {
              dt = "0" + dt;
            }
            if (month < 10) {
              month = "0" + month;
            }
            fetchSeats();
            selectedSeats = [];
            e.target[0].value = "";
            e.target[1].value = "";
            alert(
              `Successfully Booked\nBooking ID: ${bookingId}\nDate: ${
                year + "-" + month + "-" + dt
              }\nMobile: ${mobile}\nSeats: ${seats}`
            );
          });
          setTimeout(() => {
            window.location.reload();
          }, 100);
        })
        .catch((err) => {
          alert("500: Internal Server Error");
        });
    }
  };
  return (
    <div className="">
      <header>
        <h1 className="mb-4 mt-4 mb-2 text-center">
          Book Seats IndiGo {`(BOM => DEL)`}
        </h1>
      </header>
      <div className="text-center container mt-4">
        <form method="post" className="d-flex flex-column" onSubmit={book}>
          <input
            type="text"
            name="name"
            className="form-control mb-2"
            id="name"
            placeholder="Enter Your Name"
            minLength="3"
            required={true}
          />

          <input
            type="number"
            name="mobile"
            className="form-control mb-2"
            id="mobile"
            placeholder="Enter Your Mobile"
            required={true}
          />
          <input type="submit" className="btn btn-primary" value="Book Seats" />
        </form>
      </div>
      <div className="container">
        <div className=" container flight-map rounded ">
          <div className="d-flex justify-content-center">
            <span className="h3 text-secondary text-center mt-2 mb-4">
              IndiGo Seats {`(BOM => DEL)`}
            </span>
          </div>

          <div className="container row row-cols-6 d-flex justify-content-center  ">
            {seats.map((seat, index) => {
              return (
                <div className="col" key={index}>
                  <div
                    className={` btn d-flex justify-content-center p-3 mt-1 mb-1 text-center ${
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
    </div>
  );
};

export default Book;
