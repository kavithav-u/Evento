import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap"; // Use Bootstrap or any other styling library
import {
  useFetchSearchMutation,
  useFilterSearchMutation,
} from "../../Slices/usersApiSlice";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"; // Import icons from react-icons library

const HallList = () => {
  const [halls, setHalls] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedEventType, setSelectedEventType] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");
  const [responseArray, setResponseArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const hallsPerPage = 6;
  const [fetchSearch] = useFetchSearchMutation();
  const [fetchFilter] = useFilterSearchMutation();
  useEffect(() => {
    // Fetch hall details when the component mounts
    fetchHalls();
  }, [sortOrder, currentPage]);

  const handleFilter = async () => {
    try {
      const filters = {
        eventType: selectedEventType,
        eventId: selectedEventId,
      };
      const response = await fetchFilter(filters).unwrap();
      const halls = response.filterData;
      console.log("response", response, "halls", halls);
      let sortedHalls;

      if (sortOrder === "regularPrice_desc") {
        sortedHalls = [...halls].sort((a, b) => b.pricePerDay - a.pricePerDay);
      } else if (sortOrder === "regularPrice_asc") {
        sortedHalls = [...halls].sort(
          (a, b) => parseFloat(a.pricePerDay) - parseFloat(b.pricePerDay)
        );
      } else {
        sortedHalls = halls;
      }
      setResponseArray(sortedHalls);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching hall details:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastHall = currentPage * hallsPerPage;
  const indexOfFirstHall = indexOfLastHall - hallsPerPage;
  const currentHalls = responseArray.slice(indexOfFirstHall, indexOfLastHall);

  const fetchHalls = async () => {
    try {
      const res = await fetchSearch().unwrap();
      console.log(res, "LKLKK");
      const events = res.events;
      const halls = res.halls;
      console.log(events, "LKLKK");
      setEvents(events);
      setHalls(halls); 
    setResponseArray(halls);
    } catch (error) {
      console.error("Error fetching hall details:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7  border-b-2 md:border-r-2 md:min-h-screen">
        {/* Event Types Row */}
        <div className="flex flex-col md:flex-row gap-2 items-center mb-4">
          <label className="whitespace-nowrap font-semibold">
            Event Types:
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full md:w-auto bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              value={selectedEventId}
              onChange={(e) => {
                setSelectedEventId(e.target.value);
                setSelectedEventType(
                  e.target.options[e.target.selectedIndex].text
                );
              }}
            >
              <option value="">All Events</option>
              {events.slice(0, 5).map((event) => (
                <option key={event._id} value={event._id}>
                  {event.eventType}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M0 0h20v20H0z" fill="none" />
                <path
                  d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                  stroke="#4A5568"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Sort Row */}
        <div className="flex items-center gap-5 mb-4 mt-10">
          <label className="font-semibold">Sort:</label>
          <select
            // onChange={handleChange}
            // value={sortOrder}
            id="sort_order"
            className="border rounded-lg p-3"
          >
            <option value="regularPrice_desc">Price high to low</option>
            <option value="regularPrice_asc">Price low to high</option>
          </select>
        </div>

        {/* Search Row */}
        <button
          onClick={handleFilter}
          className="bg-slate-700 text-white p-3 w-full rounded-lg uppercase hover:opacity-95"
        >
          Search
        </button>
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          <Row xs={1} md={3} className="g-4">
            {currentHalls.map((hall) => (
              <Col key={hall._id}>
                <Card style={{ width: "18rem", margin: "10px" }}>
                  <Card.Img
                    className="h-64"
                    variant="top"
                    src={hall.hallImage[0]}
                    alt={hall.hallName}
                  />
                  <Card.Body>
                    <Card.Title>{hall.hallName}</Card.Title>
                    {hall.description.split(" ").slice(0, 10).join(" ")}...
                    <Card.Text>${hall.pricePerDay} per Day</Card.Text>
                    <Card.Text>{hall.location}</Card.Text>
                    <Button variant="primary">Book Now</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        {/* Pagination */}
        {responseArray.length > hallsPerPage && (
          <div className="flex justify-end mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`mx-1 px-3 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                  : "bg-gray-700 text-white"
              }`}
              disabled={currentPage === 1}
            >
              <BsChevronLeft className="h-5 w-5" />
            </button>
            {Array.from({
              length: Math.ceil(responseArray.length / hallsPerPage),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-3 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-gray-700 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`mx-1 px-3 py-2 rounded ${
                currentPage === Math.ceil(responseArray.length / hallsPerPage)
                  ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                  : "bg-gray-700 text-white"
              }`}
              disabled={
                currentPage === Math.ceil(responseArray.length / hallsPerPage)
              }
            >
              <BsChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HallList;
