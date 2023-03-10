import { FC } from "react";
import { IDayOfWeek, IGroup } from "../../types/timetable";
import { LessonList } from "./lessonList/lessonList";

interface IOneDayCard {
	group: IGroup;
	day: string;
}

const OneDayCard: FC<IOneDayCard> = ({ group, day }) => {

	const dayOfWeek = day as keyof IGroup;

	return (
		<div className="card">
			{group && group[dayOfWeek] &&
				<LessonList timetableDay={group[dayOfWeek] as IDayOfWeek[]} />
			}
		</div>
	)
}

export default OneDayCard;