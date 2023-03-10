import {DraggableLocation} from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import {Room} from '../types/rooms';

import { Subject } from "../types/subjects";
import { Teacher } from "../types/teachers";
import {IDayOfWeek, IGroup} from '../types/timetable';
import { getRandomNum } from "./default";

export const randomSubjcetIDFromTeacher = (subjects: Subject[]) => {
	const newSubjects: number[] = [];

	const numSubject = getRandomNum(10, 7);
	for (let i = 0; i <= numSubject; i++) {
		const randSubject = Math.floor(Math.random() * subjects.length);

		if (!newSubjects.includes(subjects[randSubject].id)) {
			newSubjects.push(subjects[randSubject].id);
		}
	}
	return newSubjects;
};

export const randomSubjcetFromTeacher = (subjects: Subject[]) => {
	const newSubjects: (Subject | null)[] = [];

	const numSubject = getRandomNum(8, 5);
	for (let i = 0; i < numSubject; i++) {
		const randSubject = Math.floor(Math.random() * subjects.length);

		newSubjects.push(subjects[randSubject]);

	}

	return newSubjects;
};

export const randomSubjects = (allSubjects: Subject[], allTeachers: Teacher[]) => {
	const subjects = randomSubjcetFromTeacher(allSubjects);

	if (subjects.length < 7) {
		for (let lacks = 0; lacks <= (7 - subjects.length); lacks++) {
			subjects.push(null)
		}
	}

	const newSubjects = subjects.map((subj: Subject | null) => {
		if (subj) {
			const localTeacher: Teacher[] = [];
			allTeachers.forEach((teach: Teacher) => {
				const isTeach = teach.subject.find((item: number) => item === subj.id);
				if (isTeach) {
					localTeacher.push(teach);
				}
			})
			const teacher: Teacher = localTeacher[getRandomNum(localTeacher.length, 0)];
			if (teacher) {

				if (subj.name === 'Информатика' || subj.name === "Англ. язык") {
					return [
						{ id: uuidv4(), subject: subj.name, subjectID: subj.id, isError: false, room: getRandomNum(15, 1), teacher: localTeacher[getRandomNum(localTeacher.length / 2, 0)].id },
						{ id: uuidv4(), subject: subj.name, subjectID: subj.id, isError: false, room: getRandomNum(30, 16), teacher: localTeacher[getRandomNum(localTeacher.length, localTeacher.length / 2)].id },

					]
				}

				return { id: uuidv4(), subject: subj.name, subjectID: subj.id, isError: false, room: getRandomNum(30, 1), teacher: teacher.id }
			}
		}
		return null


	})
	return newSubjects;
};

export const checkingMultipleLessons = (
	validatingArray: Teacher[] | Room[],
	timetable: IGroup[],
	field: string,
	initialDraggable: DraggableLocation,
	finalDraggable: DraggableLocation
) => {
	const copyTimetable = [...timetable];

	const fromTo = [initialDraggable.index, finalDraggable.index].sort((a, b) => a - b);

	const dayArray = initialDraggable.droppableId === finalDraggable.droppableId ?
		[initialDraggable.droppableId] :
		[initialDraggable.droppableId, finalDraggable.droppableId];

	const maxLessons = [0, 1, 2, 3, 4, 5, 6];
	const numLessons = dayArray.length > 1 ? fromTo : maxLessons.splice(fromTo[0], fromTo[1] + 1);

	for (let dayIndex = 0; dayIndex < dayArray.length; dayIndex++) {
		for (let lessonIndex = 0; lessonIndex < numLessons.length; lessonIndex++) {
			validatingArray.forEach((validatingElem: Teacher | Room) => {
				let filterArr: number[] = [];

				timetable.forEach((item: IGroup) => {
					const day = item[dayArray[dayIndex] as keyof IGroup] as IDayOfWeek[];
					const subject = day[numLessons[lessonIndex]] as IDayOfWeek

					if (subject && Array.isArray(subject)) {
						subject.forEach((subgroup: IDayOfWeek) => {
							if (validatingElem.id === subgroup[field as keyof IDayOfWeek]) {
								filterArr.push(validatingElem.id)
							}
						})
					}

					if (subject && (validatingElem.id === subject[field as keyof IDayOfWeek])) {
						filterArr.push(validatingElem.id)
					}

				});

				if (filterArr.length > 1) {
					copyTimetable.forEach((item: IGroup, index: number) => {

						const copyClass: IGroup = { ...item };
						const day: any = [...copyClass[dayArray[dayIndex] as keyof IGroup] as IDayOfWeek[]]; 
						const lesson: IDayOfWeek | IDayOfWeek[] = Array.isArray(day[numLessons[lessonIndex]]) ?
							[...day[numLessons[lessonIndex]]]
							: { ...day[numLessons[lessonIndex]] };

						if (lesson && Array.isArray(lesson)) {
							const newLesson = lesson.map((subgroup: any) => {
								if (lesson && (filterArr[0] === subgroup[field])) {
									return { ...subgroup, isError: true }
								}
								return subgroup;
							})
							day.splice(numLessons[lessonIndex], 1, newLesson);
							copyClass[dayArray[dayIndex] as keyof IGroup] = day;
							copyTimetable.splice(index, 1, copyClass);
						}

						if (lesson && !Array.isArray(lesson) && (filterArr[0] === lesson[field as keyof IDayOfWeek])) {
							lesson.isError = true;

							day.splice(numLessons[lessonIndex], 1, lesson);
							copyClass[dayArray[dayIndex] as keyof IGroup] = day;
							copyTimetable.splice(index, 1, copyClass);
						}
					})
				}

				if (filterArr.length === 1) {
					copyTimetable.forEach((item: any, index: any) => {

						const copyClass = { ...item };
						const day: any = [...copyClass[dayArray[dayIndex]]];
						const lesson: any = Array.isArray(day[numLessons[lessonIndex]]) ?
							[...day[numLessons[lessonIndex]]]
							: { ...day[numLessons[lessonIndex]] };

						if (lesson && Array.isArray(lesson)) {
							const newLesson = lesson.map((subgroup: any) => {
								if (lesson && (filterArr[0] === subgroup[field])) {
									return { ...subgroup, isError: false }
								}
								return subgroup;
							})
							day.splice(numLessons[lessonIndex], 1, newLesson);
							copyClass[dayArray[dayIndex]] = day;
							copyTimetable.splice(index, 1, copyClass);
						}

						if (lesson && (filterArr[0] === lesson[field])) {
							lesson.isError = false;

							day.splice(numLessons[lessonIndex], 1, lesson);
							copyClass[dayArray[dayIndex]] = day;
							copyTimetable.splice(index, 1, copyClass);
						}
					})

				}


			})
		}

	}

	return copyTimetable;
};