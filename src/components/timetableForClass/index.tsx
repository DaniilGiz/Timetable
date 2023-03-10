import OneDayCard from "../oneDayCard/oneDayCard";
import { DragDropContext, DraggableLocation, Droppable, DropResult } from 'react-beautiful-dnd';
import { reorder, removeDraggable } from '../../helpers/default';
import { checkingMultipleLessons } from "../../helpers/lessons";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addTimetable, roomsState, teachersState, timetableState } from "../../redux/timetable";
import { IGroup } from "../../types/timetable";
import { FC } from "react";

interface ITimetableForClass {
	group: IGroup
}


const TimetableForClass: FC<ITimetableForClass> = ({ group }) => {
	const timetable = useAppSelector(timetableState);
	const teachers = useAppSelector(teachersState);
	const rooms = useAppSelector(roomsState);
	const dispatch = useAppDispatch();

	const refreshTimetable = (timetable: IGroup[], classObject: IGroup, start: DraggableLocation, end: DraggableLocation) => {
		const copyTimetable: IGroup[] = [...timetable];
		const changedClassIndex = copyTimetable.findIndex((group: IGroup) =>
			group.class.level === classObject.class.level && group.class.letter === classObject.class.letter
		)
		copyTimetable.splice(changedClassIndex, 1, classObject)

		const checkingForTeacher = checkingMultipleLessons(teachers, copyTimetable, 'teacher', start, end);
		const checkingForRoom = checkingMultipleLessons(rooms, checkingForTeacher, 'room', start, end);

		dispatch(addTimetable(checkingForRoom));
	};


	const onDragEnd = (result: DropResult) => {
		const { destination, source } = result;

		if (!destination) {
			const quotes = removeDraggable(
				group,
				source,
			);

			refreshTimetable(
				timetable,
				quotes,
				source,
				source
			);
			return
		}

		if (destination.droppableId === source.droppableId && destination.index === source.index) return;

		const quotes = reorder(
			group,
			source,
			destination
		);

		refreshTimetable(
			timetable,
			quotes,
			source,
			destination
		);
	};

	const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

	if (!group) {
		return null;
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="class-column">
				<div className="class-number">
					{group.class.level} - {group.class.letter}
				</div>
				{daysOfWeek.map((day, dayIndex) => {
					return (
						<Droppable droppableId={day} key={dayIndex}>
							{(provider, snapshot) => (
								<div
									ref={provider.innerRef}
									{...provider.droppableProps}
								>
									<OneDayCard group={group} day={day} />
									{provider.placeholder}
								</div>
							)}

						</Droppable>

					)
				})}
			</div>
		</DragDropContext>

	)
}

export default TimetableForClass;