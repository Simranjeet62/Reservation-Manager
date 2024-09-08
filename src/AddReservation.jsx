import { useContext } from "react";
import { postContext } from "./App";

export default function AddReservation() {
  const { addForm, setTrigger } = useContext(postContext);

  function handleForm(e) {
    e.preventDefault();
    const { name, guests, room, checkIn, checkOut } = e.target;

    async function postGuest() {
      try {
        await fetch("http://localhost:8000/reservations", {
          method: "POST",
          body: JSON.stringify({
            name: name.value,
            guests: guests.value,
            room: room.value,
            checkIn: checkIn.value,
            checkOut: checkOut.value,
          }),
        });
      } catch (err) {
        console.error(err);
      }
      addForm(false);
      setTrigger(Math.random());
    }
    postGuest();
  }

  return (
    <div className="bg-gray-100 bg-opacity-80 fixed w-full h-full">
      <form
        className="flex flex-col gap-5 text-xl bg-gray-300 w-1/4 p-5 rounded-xl ml-auto mr-auto mt-20"
        onSubmit={(e) => handleForm(e)}
      >
        <span
          className="self-end -mb-7 cursor-pointer"
          onClick={() => addForm(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </span>
        <div>
          <label htmlFor="name">Name</label>
          <input className="rounded-md ml-3" type="text" id="name" required />
        </div>

        <div>
          <label htmlFor="guests">Guests</label>
          <input
            className="rounded-md ml-3"
            type="number"
            id="guests"
            required
          />
        </div>

        <div>
          <label htmlFor="room">Room</label>
          <select className="rounded-md ml-3" type="text" id="room" required>
            <option value="">Select</option>
            <option value="budget">Budget</option>
            <option value="semiDelux">Semi Delux</option>
            <option value="deluxRoom">Delux Room</option>
          </select>
        </div>

        <div>
          <label htmlFor="checkIn">Checkin date</label>
          <input className="rounded-md ml-3" type="date" id="checkIn" />
        </div>

        <div>
          <label htmlFor="checkOut">Checkout date</label>
          <input className="rounded-md ml-3" type="date" id="checkOut" />
        </div>
        <button className="border-2 border-black rounded-md w-28 mt-2 self-center">
          Submit
        </button>
      </form>
    </div>
  );
}
