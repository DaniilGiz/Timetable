import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sass/index.sass";

import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import {
	setTeachers,
	teachersState,
	roomsState,
	setRooms,
	classesState,
	setClasses,
	subjectsState,
	setSubjcets,
	timetableState,
	addTimetable
} from "./redux/timetable";

import TimetableWrapper from "./components/timetableWrapper";
import TimetableForClass from "./components/timetableForClass";

import { creatingSchedule } from "./helpers/timetable";
import { CustomPagination } from "./components/pagination/pagination";
import { IGroup } from "./types/timetable";
import {Backdrop, CircularProgress} from "@mui/material";

const App = () => {
	const dispatch = useAppDispatch();
	const teachers = useAppSelector(teachersState);
	const rooms = useAppSelector(roomsState);
	const classes = useAppSelector(classesState);
	const subjects = useAppSelector(subjectsState);
	const timetable = useAppSelector(timetableState);

	const [page, setPage] = useState<number>(1);

	const daysOfWeek = ["Mon.", "Tues.", "Wed.", "Thurs.", "Fri."];

	const setItemsState = () => {
		dispatch(setRooms());
		dispatch(setClasses());
		dispatch(setSubjcets());
	};

	useEffect(() => {
		if (!teachers.length || !classes.length || !rooms.length || !subjects.length) {
			setItemsState();
		}
	}, []);

	useEffect(() => {
		if (subjects.length) {
			dispatch(setTeachers(subjects))
		}
	}, [subjects]);

	useEffect(() => {
		if (teachers.length && subjects.length && classes.length && rooms.length) {
			const schedule = creatingSchedule(classes, subjects, teachers, rooms);
			schedule && dispatch(addTimetable(schedule as IGroup[]))
		}
	}, [teachers, subjects, classes, rooms]);

	return (
		<div className="App">
			<TimetableWrapper>
				{timetable.length > 0 ? (
					<div className="d-flex justify-content-between">
						<div className="days-wrapper">
							{daysOfWeek.map((day, i) => <span key={`${day}-${i}`}>{day}</span>)}
						</div>
						{timetable.slice((page - 1) * 3, page * 3) // Crop the array depending on the current page
							.map((item: IGroup, index) => {
								return (
									<TimetableForClass key={index} group={item} />
								)
						})}
					</div>					
				)
				: (
					<Backdrop
						sx={{ color: '#fff', zIndex: 10 }}
						open={true}
					>
						<CircularProgress color="inherit" />
					</Backdrop>
				)}
				{timetable.length > 0 && (
					<CustomPagination page={page} setPage={setPage} />
				)}
			</TimetableWrapper>
		</div >
	);
}

export default App;
