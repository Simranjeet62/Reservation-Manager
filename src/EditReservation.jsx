import { useContext, useReducer } from "react";
import { postContext } from "./App";

function reducer(state, action) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "guests":
      return { ...state, guests: action.payload };
    case "room":
      return { ...state, room: action.payload };
    case "checkIn":
      return { ...state, checkIn: action.payload };
    case "checkOut":
      return { ...state, checkOut: action.payload };
    default:
      console.log("Error");
  }
}

export default function EditReservation() {
  const { setTrigger, guestData, id, setEditState } = useContext(postContext);
  console.log(id);

  const editGuestObj = guestData?.find((el) => el.id == id);
  const [state, dispatch] = useReducer(reducer, editGuestObj);

  console.log(state);

  function handleEdit(e) {
    e.preventDefault();
    const { name, guests, room, checkIn, checkOut } = e.target;
    async function editGuest() {
      try {
        const res = await fetch(`http://localhost:8000/reservations/${id}`, {
          method: "PUT",
          body: JSON.stringify({
            name: name.value,
            guests: guests.value,
            room: room.value,
            checkIn: checkIn.value,
            checkOut: checkOut.value,
          }),
        });
        setEditState(false);
        setTrigger(Math.random());
      } catch (err) {
        console.error(err);
      }
    }
    editGuest();
  }

  return (
    <div className="bg-gray-100 bg-opacity-80 fixed w-full h-full">
      <form
        className="flex flex-col gap-5 text-xl bg-gray-300 w-1/4 p-5 rounded-xl ml-auto mr-auto mt-20"
        onSubmit={(e) => handleEdit(e)}
      >
        <span
          className="self-end -mb-7 cursor-pointer"
          onClick={() => setEditState(false)}
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
          <input
            className="rounded-md ml-3"
            type="text"
            id="name"
            value={state.name}
            onChange={(e) =>
              dispatch({ type: "name", payload: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label htmlFor="guests">Guests</label>
          <input
            className="rounded-md ml-3"
            type="number"
            id="guests"
            value={state.guests}
            onChange={(e) =>
              dispatch({ type: "guests", payload: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label htmlFor="room">Room</label>
          <select
            className="rounded-md ml-3"
            type="text"
            id="room"
            value={state.room}
            onChange={(e) =>
              dispatch({ type: "room", payload: e.target.value })
            }
            required
          >
            <option value="">Select</option>
            <option value="budget">Budget</option>
            <option value="semiDelux">Semi Delux</option>
            <option value="deluxRoom">Delux Room</option>
          </select>
        </div>

        <div>
          <label htmlFor="checkIn">Checkin date</label>
          <input
            className="rounded-md ml-3"
            type="date"
            id="checkIn"
            onChange={(e) =>
              dispatch({ type: "checkIn", payload: e.target.value })
            }
            value={state.checkIn}
          />
        </div>

        <div>
          <label htmlFor="checkOut">Checkout date</label>
          <input
            className="rounded-md ml-3"
            type="date"
            id="checkOut"
            onChange={(e) =>
              dispatch({ type: "checkOut", payload: e.target.value })
            }
            value={state.checkOut}
          />
        </div>
        <button className="border-2 border-black rounded-md w-28 mt-2 self-center">
          Submit
        </button>
      </form>
    </div>
  );
}
