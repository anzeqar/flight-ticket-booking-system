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
      alert("Booking ID Invalid");
    } else {
      axios
        .post("/api/showeditseats", bookingId, header)
        .then((data) => {
          getbookingIdSubmit(bookingId.bookingId);
          getEditSeats(data.data.data);

          seats.forEach((item) => (item.isSelected = false));
          setDisplay("d-block");
          // console.log(data);
        })
        .catch((err) => {
          getEditSeats([]);
          alert(err.response.data.err);
        });
    }
  };

  const editSeats = (e) => {
    e.preventDefault();
    console.log(bookingIdSubmit, selectedSeats);
    const data = {
      bookingId: bookingIdSubmit,
      seats: selectedSeats,
    };
    if (selectedSeats.length <= 0) {
      alert("Select some seats to edit");
    } else if (selectedSeats.length >= seats.length) {
      alert("You are selecting all seats, why editing ?");
    } else {
      axios
        .post("/api/editseats", data, header)
        .then((data) => {
          console.log(data);
        })
        .then(
          axios
            .post("/api/showeditseats", { bookingId: bookingIdSubmit }, header)
            .then((data) => {
              console.log(data.data.data);
              alert(`All seats edited successfully`);

              getEditSeats(data.data.data);

              seats.forEach((item) => (item.isSelected = false));
              setDisplay("d-block");
              setTimeout(() => {
                window.location.reload();
              }, 100);
              // console.log(data);
            })
            .catch((err) => alert(err.response.data.err))
        )
        .catch((err) => alert(err.response.data.err));
    }
  };

  return (
    <div className="">
      <header>
        <h1 className="mb-4 mt-2 text-center">Edit Booking</h1>
      </header>
      <div className="text-center d-flex justify-content-center">
        <form method="post" className="d-flex flex-column" onSubmit={getSeats}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Booking Id"
            required={true}
          />
          <input type="submit" value="submit" />
        </form>
      </div>

      <form
        action=""
        method="post"
        className={`${display}`}
        onSubmit={editSeats}
      >
        <input type="submit" value="Submit" />
      </form>

      <div className="container ">
        <div className="container row row-cols-6 d-flex justify-content-center ">
          {seats.map((seat) => {
            return (
              <div className="col" key={seat.number}>
                <div
                  className={` btn d-flex justify-content-center mt-1 mb-1 text-center btn-primary`}
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
  );
};

export default Book;
