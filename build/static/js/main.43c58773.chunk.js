(this["webpackJsonpflight-ticket-booking-system"]=this["webpackJsonpflight-ticket-booking-system"]||[]).push([[0],{34:function(e,t,n){},35:function(e,t,n){},60:function(e,t,n){"use strict";n.r(t);var a=n(1),s=n.n(a),c=n(27),i=n.n(c),r=(n(34),n(35),n(10)),l=n(2),o=n(9),d=n(4),b=n.n(d),j=n(0),m=function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],s=t[1],c=function(){b.a.get("/api/bookings").then((function(e){var t=e.data.data;s(t)}))};0===n.length&&c();var i=function(e){e.preventDefault();var t={bookingId:e.target[0].value,isArrived:e.target[1].value};b.a.post("/api/bookings",t,{headers:{"Content-Type":"application/json"}}).then(c())};return Object(j.jsxs)("div",{className:"container",children:[Object(j.jsx)("header",{children:Object(j.jsxs)("h1",{className:"mb-4 mt-4 text-center",children:["Bookings For IndiGo ","(BOM => DEL)"]})}),Object(j.jsx)("div",{className:"m-2",children:Object(j.jsx)("div",{className:"p-2"})}),Object(j.jsxs)("table",{className:"table table-striped table-hover",children:[Object(j.jsx)("thead",{children:Object(j.jsxs)("tr",{className:"text-center",children:[Object(j.jsx)("th",{scope:"col",children:"Seq."}),Object(j.jsx)("th",{scope:"col",children:"Name"}),Object(j.jsx)("th",{scope:"col",children:"Booking Id"}),Object(j.jsx)("th",{scope:"col",children:"Seats"}),Object(j.jsx)("th",{scope:"col",children:"Mobile"}),Object(j.jsx)("th",{scope:"col",children:"Arrived"})]})}),Object(j.jsx)("tbody",{children:n.map((function(e,t){return Object(j.jsxs)("tr",{className:"text-center",children:[Object(j.jsx)("td",{children:t+1}),Object(j.jsx)("td",{children:e.name}),Object(j.jsx)("td",{children:e._id}),Object(j.jsx)("td",{children:e.seats.map((function(e){return Object(j.jsx)("span",{children:"| "+e+" |"},e)}))}),Object(j.jsx)("td",{children:Object(j.jsx)("a",{href:"tel:".concat(e.mobile),className:"btn btn-success w-75",children:e.mobile})}),Object(j.jsx)("td",{children:Object(j.jsxs)("form",{method:"post",onSubmit:i,children:[Object(j.jsx)("input",{type:"hidden",name:"bookingId",value:e._id}),Object(j.jsx)("input",{type:"hidden",name:"isArrived",value:Boolean(e.isArrived)}),Object(j.jsx)("button",{className:e.isArrived?" btn btn-primary w-100":" btn btn-danger w-100",style:{textTransform:"capitalize"},type:"sumbit",children:String(e.isArrived)})]})})]},e._id)}))})]})]})},h=function(){return Object(j.jsx)("div",{className:"d-flex justify-content-center algin-items-center bg-landing ",style:{minHeight:"100vh"},children:Object(j.jsxs)("div",{className:"d-flex justify-content-center align-self-center rounded flex-column overlay-bg p-4",children:[Object(j.jsx)("h1",{className:"text-light pb-2",children:"Flight Ticket Booking System"}),Object(j.jsxs)("h2",{className:"text-center mt-2 mb-2 text-primary",children:["IndiGo ","(BOM => DEL)"]}),Object(j.jsxs)("div",{className:"d-flex flex-column mt-4 justify-content-center text-center",children:[Object(j.jsx)(r.b,{to:"/bookings",className:"text-decoration-none btn btn-outline-info fs-4 m-2",children:"Bookings"}),Object(j.jsx)(r.b,{to:"/book",className:"text-decoration-none btn btn-outline-success fs-4 m-2",children:"Book Seats"}),Object(j.jsx)(r.b,{to:"/update",className:"text-decoration-none btn btn-outline-primary fs-4 m-2",children:"Update Seats"}),Object(j.jsx)(r.b,{to:"/edit",className:"text-decoration-none btn btn-outline-danger fs-4 m-2",children:"Cancel Seats"})]})]})})},u=[],x=function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],s=t[1],c=function(){b.a.get("/api/seats").then((function(e){s(e.data.data)})),n.forEach((function(e){return e.isSelected=!1}))};0===n.length&&c();return Object(j.jsxs)("div",{className:"",children:[Object(j.jsx)("header",{children:Object(j.jsxs)("h1",{className:"mb-4 mt-4 text-center",children:["Update Seats IndiGo ","(BOM => DEL)"]})}),Object(j.jsx)("div",{className:"text-center container mt-2",children:Object(j.jsxs)("form",{method:"post",className:"d-flex flex-column",onSubmit:function(e){e.preventDefault();var t={bookingId:e.target[0].value,seats:u};24!==t.bookingId.length?alert("Error: Booking ID Invalid"):t.seats.length<=0?alert("Error: Please select some seats"):b.a.put("/api/update",t,{headers:{"Content-Type":"application/json"}}).then((function(t){alert("Success: Seats Updated Successfully"),c(),e.target[0].value="",setTimeout((function(){window.location.reload()}),100)})).catch((function(e){alert(e.response.data.err)}))},children:[Object(j.jsx)("input",{type:"text",className:"form-control mb-2",name:"bookingId",id:"bookingId",placeholder:"Booking Id"}),Object(j.jsx)("input",{type:"submit",value:"Update Seats",className:"btn btn-primary"})]})}),Object(j.jsxs)("div",{className:"container flight-map",children:[Object(j.jsx)("div",{className:"d-flex justify-content-center",children:Object(j.jsxs)("span",{className:"h3 text-secondary text-center mt-2 mb-4",children:["IndiGo Seats ","(BOM => DEL)"]})}),Object(j.jsx)("div",{className:"container row row-cols-6 d-flex justify-content-center ",children:n.map((function(e){return Object(j.jsx)("div",{className:"col",children:Object(j.jsx)("div",{className:" d-flex mt-1 mb-1 justify-content-center btn ".concat(e.isBooked?"btn-secondary":"btn-primary"),onClick:function(t){if(e.isBooked)alert("Warning: Reserved Seat");else{var n=t.target||t.srcElement;if(e.isSelected){e.isSelected=!1,n.classList.add("btn-primary"),n.classList.remove("btn-success");var a=u.indexOf(e.number);a>-1&&u.splice(a,1)}else e.isSelected=!0,n.classList.add("btn-success"),n.classList.remove("btn-primary"),!u.includes(e.number)&&u.length<6&&u.push(e.number);u.length>=6&&alert("Warning: Only 6 seats in One Booking")}},children:e.number},e.number)},e.number)}))})]})]})},O=[],p=function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],s=t[1],c=function(){b.a.get("/api/seats").then((function(e){s(e.data.data)})),n.forEach((function(e){return e.isSelected=!1}))};0===n.length&&c();return Object(j.jsxs)("div",{className:"",children:[Object(j.jsx)("header",{children:Object(j.jsxs)("h1",{className:"mb-4 mt-4 mb-2 text-center",children:["Book Seats IndiGo ","(BOM => DEL)"]})}),Object(j.jsx)("div",{className:"text-center container mt-4",children:Object(j.jsxs)("form",{method:"post",className:"d-flex flex-column",onSubmit:function(e){e.preventDefault();var t={name:e.target[0].value,mobile:e.target[1].value,seats:O},n={headers:{"Content-Type":"application/json"}};t.mobile<=1e9?alert("Error: Mobile number Less than 10 digits"):t.mobile>999999999999?alert("Error: Mobile number Greater than 12 digits"):t.seats.length<=0?alert("Error: Please Select Some Seats"):b.a.post("/api/book",t,n).then((function(t){var a={bookingId:t.data.data._id,date:t.data.data.date,mobile:t.data.data.mobile,seats:O};b.a.put("/api/book",a,n).then((function(t){var n=t.data.data,a=n.bookingId,s=n.date,i=n.mobile,r=n.seats,l=new Date(s),o=l.getFullYear(),d=l.getMonth()+1,b=l.getDate();b<10&&(b="0"+b),d<10&&(d="0"+d),c(),O=[],e.target[0].value="",e.target[1].value="",alert("Successfully Booked\nBooking ID: ".concat(a,"\nDate: ").concat(o+"-"+d+"-"+b,"\nMobile: ").concat(i,"\nSeats: ").concat(r))})),setTimeout((function(){window.location.reload()}),100)})).catch((function(e){alert(e.response.data.err)}))},children:[Object(j.jsx)("input",{type:"text",name:"name",className:"form-control mb-2",id:"name",placeholder:"Enter Your Name",minLength:"3",required:!0}),Object(j.jsx)("input",{type:"number",name:"mobile",className:"form-control mb-2",id:"mobile",placeholder:"Enter Your Mobile",required:!0}),Object(j.jsx)("input",{type:"submit",className:"btn btn-primary",value:"Book Seats"})]})}),Object(j.jsxs)("div",{className:" container flight-map rounded ",children:[Object(j.jsx)("div",{className:"d-flex justify-content-center",children:Object(j.jsxs)("span",{className:"h3 text-secondary text-center mt-2 mb-4",children:["IndiGo Seats ","(BOM => DEL)"]})}),Object(j.jsx)("div",{className:"container row row-cols-6 d-flex justify-content-center  ",children:n.map((function(e){return Object(j.jsx)("div",{className:"col",children:Object(j.jsx)("div",{className:" btn d-flex justify-content-center mt-1 mb-1 text-center ".concat(e.isBooked?"btn-secondary":"btn-primary"),onClick:function(t){if(e.isBooked)alert("Warning: Reserved Seat");else{var n=t.target||t.srcElement;if(e.isSelected){e.isSelected=!1,n.classList.add("btn-primary"),n.classList.remove("btn-success");var a=O.indexOf(e.number);a>-1&&O.splice(a,1)}else e.isSelected=!0,n.classList.add("btn-success"),n.classList.remove("btn-primary"),!O.includes(e.number)&&O.length<6&&O.push(e.number);O.length>=6&&alert("Warning: Only 6 seats in One Booking")}},children:e.number})},e.number)}))})]})]})},f=[],v=function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],s=t[1],c=Object(a.useState)("d-none"),i=Object(o.a)(c,2),r=i[0],l=i[1],d=Object(a.useState)(""),m=Object(o.a)(d,2),h=m[0],u=m[1],x={headers:{"Content-Type":"application/json"}};return Object(j.jsxs)("div",{className:"container",children:[Object(j.jsx)("header",{children:Object(j.jsxs)("h1",{className:"mb-4 mt-4 mb-2 text-center",children:["Cancel Seats IndiGo ","(BOM => DEL)"]})}),Object(j.jsx)("div",{className:"text-center container mt-2",children:Object(j.jsxs)("form",{method:"post",className:"d-flex flex-column",onSubmit:function(e){e.preventDefault();var t={bookingId:e.target[0].value};24!==t.bookingId.length?alert("Error: Booking ID Invalid"):b.a.post("/api/showeditseats",t,x).then((function(e){u(t.bookingId),s(e.data.data),n.forEach((function(e){return e.isSelected=!1})),l("d-flex")})).catch((function(e){s([]),l("d-none"),alert(e.response.data.err)}))},children:[Object(j.jsx)("input",{type:"text",name:"name",className:"form-control mb-2",id:"name",placeholder:"Booking Id",required:!0}),Object(j.jsx)("input",{type:"submit",className:"btn btn-primary",value:"Get Seats"})]})}),Object(j.jsx)("div",{className:"".concat(r),children:Object(j.jsxs)("div",{className:"container flight-map",children:[Object(j.jsxs)("div",{className:"d-flex flex-column",children:[Object(j.jsx)("span",{className:"h3 text-secondary text-center mt-2 mb-1",children:"Select Seats You Want"}),Object(j.jsx)("form",{method:"post",className:" ms-auto mt-1 mb-2",onSubmit:function(e){e.preventDefault();var t={bookingId:h,seats:f};f.length<=0?alert("Error: Select atleast 1 Seat"):f.length>=n.length?alert("Error: No Seats Left for Cancelling"):b.a.post("/api/editseats",t,x).then((function(e){})).then(b.a.post("/api/showeditseats",{bookingId:h},x).then((function(e){alert("Success: Seats Cancelled Successfully"),s(e.data.data),n.forEach((function(e){return e.isSelected=!1})),l("d-flex"),setTimeout((function(){window.location.reload()}),100)})).catch((function(e){return alert(e.response.data.err)}))).catch((function(e){return alert(e.response.data.err)}))},children:Object(j.jsx)("input",{type:"submit",className:"btn btn-danger ",value:"Cancel Unselected Seats"})})]}),Object(j.jsx)("div",{className:"container row row-cols-6 d-flex",children:n.map((function(e){return Object(j.jsx)("div",{className:"col",children:Object(j.jsx)("div",{className:" btn d-flex justify-content-center mt-1 mb-1 text-center btn-primary",onClick:function(t){var n=t.target||t.srcElement;if(e.isSelected){e.isSelected=!1,n.classList.add("btn-primary"),n.classList.remove("btn-success");var a=f.indexOf(e.number);a>-1&&f.splice(a,1)}else e.isSelected=!0,n.classList.add("btn-success"),n.classList.remove("btn-primary"),f.includes(e.number)||f.push(e.number)},children:e.number})},e.number)}))})]})})]})},g=function(){return Object(j.jsx)("div",{children:Object(j.jsx)("nav",{className:"navbar navbar-expand-lg navbar-dark bg-dark",children:Object(j.jsxs)("div",{className:"container-fluid",children:[Object(j.jsx)("a",{className:"navbar-brand",href:"/",children:"Flight Ticket Booking System"}),Object(j.jsx)("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(j.jsx)("span",{className:"navbar-toggler-icon"})}),Object(j.jsx)("div",{className:"collapse navbar-collapse",id:"navbarNav",children:Object(j.jsxs)("ul",{className:"navbar-nav ms-auto",children:[Object(j.jsx)("li",{className:"nav-item",children:Object(j.jsx)("a",{className:"nav-link",href:"/bookings",children:"Bookings"})}),Object(j.jsx)("li",{className:"nav-item",children:Object(j.jsx)("a",{className:"nav-link",href:"/book",children:"Book Seats"})}),Object(j.jsx)("li",{className:"nav-item",children:Object(j.jsx)("a",{className:"nav-link",href:"/update",children:"Update Seats"})}),Object(j.jsx)("li",{className:"nav-item",children:Object(j.jsx)("a",{className:"nav-link",href:"/edit",children:"Cancel Seats"})})]})})]})})})},N=function(){return Object(j.jsx)("div",{className:"footer mt-4",children:Object(j.jsxs)("p",{className:"text-dark text-center",children:["Developed by",Object(j.jsx)("span",{children:" "}),Object(j.jsx)("a",{href:"https://github.com/anzeqar",className:"link-info",target:"_blank",rel:"noreferrer",children:"@anzeqar"})]})})},k=function(){return Object(j.jsx)("div",{children:Object(j.jsx)(r.a,{children:Object(j.jsxs)(l.d,{children:[Object(j.jsx)(l.b,{path:"/",exact:!0,children:Object(j.jsx)(h,{})}),Object(j.jsxs)(l.b,{path:"/book",exact:!0,children:[Object(j.jsx)(g,{}),Object(j.jsx)(p,{}),Object(j.jsx)(N,{})]}),Object(j.jsxs)(l.b,{path:"/update",exact:!0,children:[Object(j.jsx)(g,{}),Object(j.jsx)(x,{}),Object(j.jsx)(N,{})]}),Object(j.jsxs)(l.b,{path:"/edit",exact:!0,children:[Object(j.jsx)(g,{}),Object(j.jsx)(v,{}),Object(j.jsx)(N,{})]}),Object(j.jsxs)(l.b,{path:"/bookings",exact:!0,children:[Object(j.jsx)(g,{}),Object(j.jsx)(m,{}),Object(j.jsx)(N,{})]}),Object(j.jsx)(l.b,{path:"/",children:Object(j.jsx)(l.a,{to:"/"})})]})})})},S=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,61)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),a(e),s(e),c(e),i(e)}))};i.a.render(Object(j.jsx)(s.a.StrictMode,{children:Object(j.jsx)(k,{})}),document.getElementById("root")),S()}},[[60,1,2]]]);
//# sourceMappingURL=main.43c58773.chunk.js.map