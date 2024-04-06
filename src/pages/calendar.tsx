import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "../components/MainNavbar";

const CalendarWrapper = styled.div`
  width: 83%;
  margin-left: 40%;
  height: 100vh;
  margin: 0 auto;
  background-color: black;
  color: #e13063;

  @media (max-height: 1827px) {
    width: 65%;
    margin-left: 16.5%;
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  font-size: 2em;

  color: white;
  font-weight: bold;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
`;

const CalendarHeaderCell = styled.div`
  padding: 20px;
  font-size: 1.5em;
  background-color: #e13063;
  color: black;
  font-weight: bold;
  text-align: center;
`;

const CalendarCell = styled.div`
  position: relative;
  padding: 20px;
  font-size: 1.5em;
  background-color: black;
  color: #e13063;
  text-align: center;
  c
  ursor: pointer;
`;

const EventCircle = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 10px;
  height: 10px;
  background-color: #e13063;
  border-radius: 50%;
`;

const EventBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 100px;
  background-color: white;
  border: 1px solid #e13063;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EventName = styled.p`
  font-size: 16px;
`;

const Calendar: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [eventName, setEventName] = useState("");
  const [events, setEvents] = useState<{ [key: number]: string }>({});
  const [monthYear, setMonthYear] = useState(new Date());

  // Sample days for demonstration
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const totalDays = new Date(
    monthYear.getFullYear(),
    monthYear.getMonth() + 1,
    0
  ).getDate();

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
  };

  const handleAddEvent = () => {
    if (eventName.trim() && selectedDay !== null) {
      setEvents({ ...events, [selectedDay]: eventName });
      setEventName("");
      setSelectedDay(null);
    }
  };

  const handlePrevMonth = () => {
    setMonthYear(new Date(monthYear.getFullYear(), monthYear.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setMonthYear(new Date(monthYear.getFullYear(), monthYear.getMonth() + 1));
  };

  return (
    <CalendarWrapper>
      <NavBar />
      <CalendarHeader>
        <button onClick={handlePrevMonth}>{"<"}</button>
        <h2>{`${monthYear.toLocaleString("default", {
          month: "long",
        })} ${monthYear.getFullYear()}`}</h2>
        <button onClick={handleNextMonth}>{">"}</button>
      </CalendarHeader>
      <CalendarGrid>
        {days.map((day, index) => (
          <CalendarHeaderCell key={index}>{day}</CalendarHeaderCell>
        ))}
        {[...Array(totalDays)].map((_, index) => {
          const day = index + 1;
          const hasEvent = events[day];

          return (
            <CalendarCell key={index} onClick={() => handleDayClick(day)}>
              {day}
              {hasEvent && <EventCircle />}
              {selectedDay === day && (
                <EventBox>
                  <input
                    type="text"
                    value={events[day] || ""}
                    onChange={(e) => setEventName(e.target.value)}
                    onBlur={handleAddEvent}
                  />
                </EventBox>
              )}
            </CalendarCell>
          );
        })}
      </CalendarGrid>
    </CalendarWrapper>
  );
};

export default Calendar;
