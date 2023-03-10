export interface IDayOfWeek {
    id: string;
    isError: boolean;
    room: number;
    subject: string;
    subjectID: number;
    teacher: number;
}

export interface IClass {
    level: number;
    letter: string;
}

export interface IGroup {
    class: IClass;
    Monday: IDayOfWeek[];
    Tuesday: IDayOfWeek[];
    Wednesday: IDayOfWeek[];
    Thursday: IDayOfWeek[];
    Friday: IDayOfWeek[];
}