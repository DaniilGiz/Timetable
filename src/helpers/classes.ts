import { IClass } from "../types/timetable";

const sortClassesForLevel = (a: IClass, b: IClass) => {
	return a.level - b.level;
};

export const createClasses = (letterClasses: string[]) => {
	const classes = letterClasses.map(elem => {
		const group = Array.from(
			{ length: 7 },
			(_, index) => {
				return { level: index + 5, letter: elem }
			}
		);
		return group
	})
	const newClasses: IClass[] = [];

	return newClasses.concat(classes[0], classes[1], classes[2]).sort(sortClassesForLevel)
};
