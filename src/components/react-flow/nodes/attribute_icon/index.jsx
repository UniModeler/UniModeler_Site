export default function CollectionIcon({prop}) {
  let img = "/assets/images/collection_icons/";

  if (prop.key) {
    img += prop.key === 'primary key' ? 'id.svg' : 'foreign.svg'

  } else if (prop.type === "array_object") {
    img = img + "array_object.svg";

  } else if (prop.type.includes("array")) {
    img = img + "array.svg";

  } else {
    switch (prop.type) {
      case 'object':
        img = img + 'object.svg'
        break;
    
      default:
        img = img + 'simple_value.svg'
        break;
    }
  }

  return (
    <img src={img} alt="" />
  )
}