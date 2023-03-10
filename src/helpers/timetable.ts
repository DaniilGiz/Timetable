import { IClass, IDayOfWeek, IGroup } from "../types/timetable";
import { randomSubjects } from "./lessons";
import { daysOfWeek } from "../constants";
import { Room } from "../types/rooms";
import { Subject } from "../types/subjects";
import { Teacher } from "../types/teachers";

const checkTimetable = (validatingArray: Room[], timetable: IGroup[], field: string) => {    
	const numLessons = [0, 1, 2, 3, 4, 5, 6];

	for (let dayIndex = 0; dayIndex < daysOfWeek.length; dayIndex++) {
		for (let lessonIndex = 0; lessonIndex < numLessons.length; lessonIndex++) {
			validatingArray.forEach((validatingElem) => {
				let filterArr: number[] = [];

				timetable.forEach((item: IGroup) => {
                    const day = item[daysOfWeek[dayIndex] as keyof IGroup] as IDayOfWeek[];
					const subject = day[lessonIndex] as IDayOfWeek;
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
					timetable.forEach((item: IGroup) => {
                        const day = item[daysOfWeek[dayIndex] as keyof IGroup] as IDayOfWeek[];
                        const subject = day[lessonIndex] as IDayOfWeek;

						if (subject && Array.isArray(subject)) {
							subject.forEach((subgroup: IDayOfWeek) => {
								if (filterArr[0] === subgroup[field as keyof IDayOfWeek]) {
									subgroup.isError = true;
								}
							})
						}

						if (subject && (filterArr[0] === subject[field as keyof IDayOfWeek])) {
							subject.isError = true;
						}
					})
				}

			})
		}

	}

};

export const creatingSchedule = (classes: IClass[], subjects: Subject[], teachers: Teacher[], rooms: Room[]) => {
    const timetable = classes.map((obj: IClass) => {
		return {
			class: obj,
			Monday: randomSubjects(subjects, teachers),
			Tuesday: randomSubjects(subjects, teachers),
			Wednesday: randomSubjects(subjects, teachers),
			Thursday: randomSubjects(subjects, teachers),
			Friday: randomSubjects(subjects, teachers)
		}
	});

	checkTimetable(teachers, timetable as IGroup[], 'teacher');
	checkTimetable(rooms, timetable as IGroup[], 'room');

	return timetable;

};