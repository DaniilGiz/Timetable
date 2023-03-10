import { DraggableLocation } from 'react-beautiful-dnd';
import { IDayOfWeek, IGroup } from './../types/timetable';

export const getRandomNum = (max: number, min: number) => {
	return Math.floor(Math.random() * (max - min) + min);
};

export const removeDraggable = (list: IGroup, start: DraggableLocation) => {
	const copyList: IGroup = { ...list };
	const day = copyList[start.droppableId as keyof IGroup] as (IDayOfWeek | null)[]
	const copyDay = [...day];
	copyDay.splice(start.index, 1, null);
	(copyList[start.droppableId as keyof IGroup] as (IDayOfWeek | null)[]) = copyDay;

	return copyList;
};

// TODO: Проверить правильно работает функция. Т.к заметил один баг. Если поменять урок с ошибкой, на другой, а потом вернуть обратно, иногда ошибка не возвращается.

export const reorder = (list: IGroup, start: DraggableLocation, end: DraggableLocation) => {

	if (start.droppableId === end.droppableId) {
		const copyList: IGroup = { ...list };
		const startDay = copyList[start.droppableId as keyof IGroup] as (IDayOfWeek | null)[]
		const copyDay = [...startDay];
		const [removed] = copyDay.splice(start.index, 1);
		copyDay.splice(end.index, 0, removed);
		(copyList[start.droppableId as keyof IGroup] as (IDayOfWeek | null)[]) = copyDay;

		return copyList;
	} else {
		const copyList: IGroup = { ...list };
		const startDay = copyList[start.droppableId as keyof IGroup] as (IDayOfWeek | null)[]
		const copyStartDay = [...startDay];
		const endDay = copyList[end.droppableId as keyof IGroup] as (IDayOfWeek | null)[]
		const copyEndDay = [...endDay];

		const [removed] = [...startDay].splice(start.index, 1);
		const [replaced] = [...endDay].splice(end.index, 1);


		copyStartDay.splice(start.index, 1, replaced)
		copyEndDay.splice(end.index, 1, removed)

		if (copyEndDay.length > 7) {
			console.log("больше 7")
			return copyList;
		}

		(copyList[start.droppableId as keyof IGroup] as (IDayOfWeek | null)[]) = copyStartDay;
		(copyList[end.droppableId as keyof IGroup] as (IDayOfWeek | null)[]) = copyEndDay;

		return copyList;
	}

};
