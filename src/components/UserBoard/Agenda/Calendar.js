import React, { useState, useEffect } from "react";
import format from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek"
import addDays from "date-fns/addDays"
import startOfMonth from "date-fns/startOfMonth"
import endOfMonth from "date-fns/endOfMonth"
import endOfWeek from "date-fns/endOfWeek"
import isSameMonth from "date-fns/isSameMonth"
import isToday from "date-fns/isToday"
import addMonths from "date-fns/addMonths"
import subMonths from "date-fns/subMonths"
import moment from "moment"
import "./Calendar.css";
import AgendaServices from "../../../services/AgendaServices";
import { UncontrolledTooltip } from "reactstrap"


const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(moment()._d);
    const [selectedDate, setSelectedDate] = useState([
        {
            id: 1,
            title: "title-1",
            start_date: moment("2020-08-10").format('Y-MM-DD'),
            content: "initialState"
        }
    ]);

    useEffect(() => {
        retrieveAgenda()
    }, [])

    const retrieveAgenda = () => {
        AgendaServices.getAgendaUser().then(
            (response) => {
                setSelectedDate(response.data)
            })
    }

    const header = () => {
        const dateFormat = "MMMM yyyy";
        return (
            <div className="header row flex-middle text-center">
                <div className="column col-start">
                    <div className="icon" onClick={prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="column col-center">
                    <span>{format(currentDate, dateFormat)}</span>
                </div>
                <div className="column col-end">
                    <div className="icon" onClick={nextMonth}>
                        chevron_right
                    </div>
                </div>
            </div>
        );
    };

    const days = () => {
        const dateFormat = "ddd";
        const days = [];
        let startDate = startOfWeek(currentDate);
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="column col-center" key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }
        return <div className="days row text-center">{days}</div>;
    };

    const itemCells = (day, monthStart, selectedDate, formattedDate) => {
        let itemCell = "";
        let startDateExplode = []
        let dayExp = moment(day).format('Y-MM-DD')

        selectedDate.map((item) => {
            startDateExplode.push(item.start_date)
        })

        itemCell = <div
            className={`column cell ${!isSameMonth(day, monthStart) ? "disabled" : selectedDate.some(item => item.start_date === dayExp) ? "selected" : ""} ${isToday(day) ? "selected2" : ""}`}
            key={day}
        >

            {fetchTitle(selectedDate, dayExp)}

            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
        </div>
        return itemCell;
    }

    const fetchTitle = (array, day) => {
        let result = "";
        let idTooltips = ""
        array.some(item => {
            if (item.start_date === day) {
                idTooltips = `UncontrolledTooltip${item.id}`
                result = <div id={idTooltips}>
                    <p>{item.title.substring(0, 20)}...</p>
                    <UncontrolledTooltip placement="right" target={idTooltips} trigger="click">
                        <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                    </UncontrolledTooltip>
                </div>
            }
        })
        return result
    }

    const cells = () => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);
        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                days.push(
                    itemCells(day, monthStart, selectedDate, formattedDate)
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}> {days} </div>
            );
            days = [];
        }

        return <div className="body">{rows}</div>;
    }
    const nextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };
    const prevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };
    return (
        <div className="container">
            <div className="calendar">
                <div>{header()}</div>
                <div>{days()}</div>
                <div>{cells()}</div>
            </div>
        </div>
    );
};
export default Calendar;