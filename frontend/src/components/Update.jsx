import axios from 'axios';
import { useState } from 'react';

let selectedSeats = [];

const Book = () => {
    const [seats, getSeats] = useState([]);
    const fetchSeats = () => {
        axios.get('/api/seats').then(res => {
            getSeats(res.data.data);
        })
        seats.forEach((item) => item.isSelected = false);
    }
    if (seats.length === 0) {
        fetchSeats();

    }

    const book = (e) => {
        e.preventDefault();
        const data = {
            'mobile': e.target[0].value,
            'seats': selectedSeats
        }

        const header = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.put('/api/update', data, header).then(data => {
            alert('updated booking')
            fetchSeats();
            e.target[0].value = ''
        }).catch(err => {
            alert(err.response.data.err)
        })


    }
    return (
        <div className=''>
            <header>
                <h1 className='mb-4 mt-2 text-center'>Update Booking</h1>
            </header>
            <div className="text-center d-flex justify-content-center">
                <form method="post" onSubmit={book}>

                    <input type="number" name="mobile" id="mobile" placeholder='Mobile' />
                    <input type="submit" value="submit" />
                </form>
            </div>

            <div className="container">
                <div className="container row row-cols-6 d-flex justify-content-center ">
                    {seats.map(seat => {
                        return (<div key={seat.number}
                            className={`col m-1 fs-6 btn ${seat.isBooked ? 'btn-secondary' : 'btn-primary'}`}
                            onClick={(event) => {
                                if (seat.isBooked) {
                                    alert('Reserved Seat')
                                }
                                else {

                                    let targetElement = event.target || event.srcElement;
                                    if (seat.isSelected) {
                                        seat.isSelected = false;
                                        targetElement.classList.add('btn-primary');
                                        targetElement.classList.remove('btn-success');
                                        const index = selectedSeats.indexOf(seat.number);
                                        if (index > -1) {
                                            selectedSeats.splice(index, 1);
                                        }
                                    }
                                    else {
                                        seat.isSelected = true;

                                        targetElement.classList.add('btn-success');
                                        targetElement.classList.remove('btn-primary');
                                        if (!(selectedSeats.includes(seat.number)) && selectedSeats.length < 6) {
                                            selectedSeats.push(seat.number)
                                        }
                                    }

                                    if (selectedSeats.length >= 6) {
                                        alert('Booking limit exceeded')
                                    }
                                }
                            }}>
                            {seat.number}
                        </div>)

                    })}
                </div>

            </div>
        </div>
    )
}

export default Book;