import { CoursePart } from "../types"
import Part from "./Part"

interface ContentProps {
    content: CoursePart[]
}

const Content = (props: ContentProps) => {
    return (  
        props.content.map((content) => {
            return (
                <Part part={content} />
            )}
        )
    
    )
}

export default Content