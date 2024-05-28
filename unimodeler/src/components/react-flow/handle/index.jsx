import { useEffect, useState } from "react";
import { Handle, Position } from "reactflow";

export default function NodeHandle({ attribute, opened }) {

  const [hasKeysInside, setHasKeysInside] = useState(false);

  useEffect(() => {
    if(attribute.attributes)
      findKeysInside(attribute.attributes);
  }, [attribute])

  function findKeysInside(attributes) {
    for (let attribute of attributes) {
      if (attribute.key) {
        setHasKeysInside(true);
      }
      else if (attribute.attributes) {
        findKeysInside(attribute.attributes);
      }
    }
  }

  if (attribute.key || (hasKeysInside && !opened))
    return (
      <>
        <Handle id="left" position={Position.Left} type="source" />
        <Handle id="right" position={Position.Right} type="source" />
      </>
    )
}