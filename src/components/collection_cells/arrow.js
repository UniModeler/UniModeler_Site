import randomColor from "randomcolor"
import { useState } from "react"
import Xarrow from "react-xarrows";

export default function Arrow({ prop, collectionName }) {

    const [corSeta] = useState(randomColor());

    return (
        <Xarrow
            start={`${prop.references}_id`}
            end={`${collectionName}_${prop.name}`}
            color={corSeta}
        />
    )
}