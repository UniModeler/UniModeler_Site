import randomColor from "randomcolor"
import { useState } from "react"
import Xarrow, { Xwrapper } from "react-xarrows";

export default function Arrow({ prop, collectionName }) {

    const [corSeta] = useState(randomColor());

    return (
        <Xwrapper>
            <Xarrow
                start={`${prop.references}_id`}
                end={`${collectionName}_${prop.name}`}
                color={corSeta}
                dashness={{ strokeLen: 10, nonStrokeLen: 5, animation: 5 }}
            />    
        </Xwrapper> 
    )
}