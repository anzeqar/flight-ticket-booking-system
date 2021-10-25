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
      alert("Mobile number less than 10 digits");
    } else if (data.mobile > 999999999999) {
      alert("Mobile number greater than 12 digits");
    } else if (data.seats.length <= 0) {
      alert("Please Select Some Seats");
    } else {
      axios
        .post("/api/book", data, header)
        .then((data) => {
          console.log(data);
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
              `Booking ID: ${bookingId}\nDate: ${
                year + "-" + month + "-" + dt
              }\nMobile: ${mobile}\nSeats: ${seats}`
            );
          });
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
        <h1 className="mb-4 mt-2 text-center">New Booking</h1>
      </header>
      <div className="text-center d-flex justify-content-center">
        <form method="post" className="d-flex flex-column" onSubmit={book}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            minLength="3"
            required={true}
          />

          <input
            type="number"
            name="mobile"
            id="mobile"
            placeholder="Mobile"
            required={true}
          />
          <input type="submit" value="submit" />
        </form>
      </div>

      <div className="container ">
        <div className="container row row-cols-6 d-flex justify-content-center ">
          {seats.map((seat) => {
            return (
              <div className="col" key={seat.number}>
                <div
                  className={` btn d-flex justify-content-center mt-1 mb-1 text-center ${
                    seat.isBooked ? "btn-secondary" : "btn-primary"
                  }`}
                  onClick={(event) => {
                    if (seat.isBooked) {
                      alert("Reserved Seat");
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
                        alert("Booking limit exceeded");
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
