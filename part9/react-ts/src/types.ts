export interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

export interface DescriptionCourse extends CoursePartBase {
    description: string;
}

export interface CoursePartBasic extends DescriptionCourse {
    kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

export interface CoursePartBackground extends DescriptionCourse {
    backgroundMaterial: string;
    kind: "background"
}

export interface CoursePartRequirements extends DescriptionCourse {
    requirements: string[];
    kind: "special"
}
  
export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;