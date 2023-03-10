import { FC } from "react";

interface ITimetableWrapper {
	children: React.ReactNode
}

const TimetableWrapper: FC<ITimetableWrapper> = ({ children }) => {
	return (
		<>
			{children}
		</>
	)
}

export default TimetableWrapper;