import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/index.sass';

import { useAppDispatch, useAppSelector } from './hooks/hooks';
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
} from './redux/timetable';

import TimetableWrapper from './components/timetableWrapper';
import TimetableForClass from './components/timetableForClass';

import { creatingSchedule } from './helpers/default';

const App = () => {
	const dispatch = useAppDispatch();
	const teachers = useAppSelector(teachersState);
	const rooms = useAppSelector(roomsState);
	const classes = useAppSelector(classesState);
	const subjects = useAppSelector(subjectsState);
	const timetable = useAppSelector(timetableState);

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
			schedule && dispatch(addTimetable(schedule))
		}
	}, [teachers, subjects, classes, rooms]);


	return (
		<div className="App">
			<TimetableWrapper>
				<div className='d-flex justify-content-between'>
					{timetable.length ?
						timetable.map((item: any, index) => {
							return (
								<TimetableForClass key={index} group={item} />
							)
						})
						: <p>Loading...</p>}
				</div>
			</TimetableWrapper>
		</div >
	);
}

export default App;
