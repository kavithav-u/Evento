import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  useFetchSearchMutation,
  useFilterSearchMutation,
} from "../../Slices/usersApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { selectSelectedHallId } from "../../Slices/searchSlice";

const HallList = () => {
  const [halls, setHalls] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");
  const [responseArray, setResponseArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const hallsPerPage = 6;
  const [fetchSearch] = useFetchSearchMutation();
  const [fetchFilter] = useFilterSearchMutation();
  const selectedHallId = useSelector(selectSelectedHallId);
  const searchResult = responseArray.filter((e) => e._id == selectedHallId);

  useEffect(() => {
    fetchHalls();
  }, [sortOrder, currentPage]);

  const handleFilter = async () => {
    try {
      const filters = {
        eventType: selectedEventType,
        eventId: selectedEventId,
        location: selectedLocation,
        sortOrder: sortOrder,
      };
      if (!selectedEventId) {
        const response = await fetchSearch().unwrap();
        const halls = response.halls;
        if (halls.length === 0) {
          toast.error("No halls found");
        } else {
          setResponseArray(halls);
        }
      } else {
    
        const response = await fetchFilter(filters).unwrap();
        const halls = response.filterData;
        if (halls.length === 0) {
          setResponseArray([]);
          toast.error("No halls found");
        } else {
          setResponseArray(halls);
        }
      }
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching hall details:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCardClick = async (hallId) => {
    navigate(`/details/${hallId}`);
  };
  const indexOfLastHall = currentPage * hallsPerPage;
  const indexOfFirstHall = indexOfLastHall - hallsPerPage;
  const currentHalls = responseArray.slice(indexOfFirstHall, indexOfLastHall);

  const fetchHalls = async () => {
    try {
      const res = await fetchSearch().unwrap();
      const events = res.events;
      const halls = res.halls;
      setEvents(events);
      setHalls(halls);
      setResponseArray(halls);
    } catch (error) {
      console.error("Error fetching hall details:", error);
    }
  };

  const handleBookNowClick = (hallId) => {
    navigate(`/details/${hallId}`);
  };

  const handleClearFilters = () => {
    setSelectedEventId("");
    setSelectedEventType("");
    setSelectedLocationId("");
    setSelectedLocation("");
    setSortOrder("");
    setCurrentPage(1);
    fetchHalls(); // Fetch all halls after clearing filters
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
                const selectedId = e.target.value;
                setSelectedEventId(selectedId);
                setSelectedEventType(
                  selectedId
                    ? e.target.options[e.target.selectedIndex].text
                    : ""
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
        <div className="flex items-center gap-5 mb-4 mt-10">
          <label className="font-semibold">Location</label>
          <select
            value={selectedLocationId}
            onChange={(e) => {
              const selectedId = e.target.value;
              setSelectedLocationId(selectedId);
              const selectedLocation =
                e.target.options[e.target.selectedIndex].text;
              setSelectedLocation(selectedLocation);
            }}
            className="border rounded-lg p-3"
          >
            <option value="">All Locations</option>
            {Array.from(new Set(halls.map((hall) => hall.location))).map(
              (location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              )
            )}
          </select>
        </div>
        {/* Sort Row */}
        <div className="flex items-center gap-5 mb-4 mt-10">
          <label className="font-semibold">Sort:</label>
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
            id="sort_order"
            className="border rounded-lg p-3"
          >
            <option value="regularPrice_desc">Price high to low</option>
            <option value="regularPrice_asc">Price low to high</option>
          </select>
        </div>

        {/* Search Row */}
        <div className="flex space-x-4">
      {/* Search Button */}
      <button
        onClick={handleFilter}
        className="bg-slate-700 text-white p-3 w-full rounded-lg uppercase hover:opacity-95"
      >
        Search
      </button>

      {/* Clear Filters Button */}
      <button
        onClick={handleClearFilters}
        className="bg-red-700 text-white p-3 w-full rounded-lg uppercase hover:opacity-95"
      >
        Clear All
      </button>
    </div>
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results:
        </h1>
        <div className="p-7 flex flex-wrap">
          {searchResult && searchResult.length > 0 ? (
            <Row xs={1} md={2} lg={3}>
              {searchResult.map((hall) => (
                <Col key={hall._id}>
                  <Card
                    style={{ width: "18rem" }}
                    onClick={() => handleCardClick(hall._id)}
                  >
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
          ) : currentHalls && currentHalls.length > 0 ? (
            <Row xs={1} md={2} lg={3} className="g-4">
              {currentHalls.map((hall) => (
                <Col key={hall._id}>
                  <Card
                    style={{
                      flex:
                        currentHalls.length > 1
                          ? "1 0 calc(33.3333% - 20px)"
                          : "1 0 100%",
                      margin: "10px",
                      width: "18rem",
                    }}
                    onClick={() => handleCardClick(hall._id)}
                  >
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
                      <Button
                        variant="primary"
                        onClick={() => handleBookNowClick(hall._id)}
                      >
                        Book Now
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center text-gray-700 mt-5">
              <p>Nothing found</p>
            </div>
          )}
        </div>
        {/* Pagination */}
        {responseArray.length > hallsPerPage && (
          <div className="flex justify-end mt-4 mb-5">
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
