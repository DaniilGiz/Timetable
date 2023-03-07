import subjectsData from "../subjects.json"
import { faker } from "@faker-js/faker";
import { getRandomNum, randomSubjcetIDFromTeacher, createClasses } from "../helpers/default";
import { SubjectFromTeacher } from "../helpers/default";

const getDataSubjects = () => new Promise((res) => {
	const subjects = subjectsData.subjects.map(sobj => {
		return { name: sobj, id: getRandomNum(9999, 1111) }
	});

	setTimeout(() => res({ data: subjects }), 700)
});

const getDataRooms = () => new Promise((res) => {
	const rooms = Array.from(
		{ length: 30 },
		(_, index) => {
			return { id: index + 1 }
		}
	);
	setTimeout(() => res({ data: rooms }), 700)
});

const getDataTeachers = (array: SubjectFromTeacher[]) => new Promise((res) => {
	const teachers = Array.from(
		{ length: 21 },
		(_, index) => {
			return { name: faker.name.findName(), id: getRandomNum(9999, 1111), subject: randomSubjcetIDFromTeacher(array) }
		}
	);
	setTimeout(() => res({ data: teachers }), 700)
});

const getDataClasses = () => new Promise((res) => {
	const letterClasses = ["A", "B", "C"];
	const classes = createClasses((letterClasses));
	setTimeout(() => res({ data: classes }), 700)
});

export const getSubjects = () => {
	const res = getDataSubjects();
	return res;
};

export const getRooms = () => {
	const res = getDataRooms();
	return res;
};

export const getTeachers = (array: SubjectFromTeacher[]) => {
	const res = getDataTeachers(array);
	return res;
};

export const getClasses = () => {
	const res = getDataClasses();
	return res;
}







