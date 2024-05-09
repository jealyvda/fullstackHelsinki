import { CoursePart } from "../types";

interface PartProps {
    part: CoursePart;
}
  
const Part = (props: PartProps) => {
    return (
      <div>
        <b>{props.part.name} {props.part.exerciseCount}</b>
        {renderPartDetails(props.part)}
      </div>
    );
};
  
const renderPartDetails = (part: CoursePart) => {
    switch (part.kind) {
        case "basic":
            return (
                <>
                <p>{part.description}</p>
                </>
            );
        case "group":
            return (
                <>
                <p>{part.groupProjectCount}</p>
                </>
            );
        case "background":
            return (
                <>
                <p>{part.description}</p>
                <p>submit to {part.backgroundMaterial}</p>
                </>
            );
        case "special":
            return (
                <>
                <p>{part.description}</p>
                <p>required skils: { part.requirements.map((requirement) => {
                    return (
                        <span>{requirement} </span>
                    )
                })}</p>
                </>
            )
    }
};

  export default Part;