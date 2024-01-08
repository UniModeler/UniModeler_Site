import { useState } from "react";

export default function CollectionInfo({ infoCollection }) {

    const [showInside, setShowInside] = useState(false);
    const [showInCanvas, setShowInCanvas] = useState(true);

    return (
        <section className="collection">
            <div className="title">
                <div>
                    <button onClick={() => setShowInside(!showInside)}>
                        {showInside ?
                            <img src="/assets/images/icons/angle-arrow-down.svg" alt="" /> :
                            <img src="/assets/images/icons/angle-arrow-right.svg" alt="" />}
                    </button>

                    <h5>{infoCollection.entity}</h5>
                </div>

                <button onClick={() => setShowInCanvas(!showInCanvas)}>
                    {showInCanvas ?
                        <img src="/assets/images/icons/eye.svg" alt="" /> :
                        <img src="/assets/images/icons/eye-risked.svg" alt="" />}
                </button>
            </div>

            <div className="attributes">
                {showInside &&
                    infoCollection.attributes.map(attribute =>
                        <CollectionField attribute={attribute} />
                    )
                }
            </div>
        </section>
    )
}

function CollectionField({ attribute }) {

    const [showInfo, setShowInfo] = useState(false);

    return (

        <section className="attribute">
            <div className="title">
                <div>
                    <button onClick={() => setShowInfo(!showInfo)}>
                        {showInfo ?
                            <img src="/assets/images/icons/angle-arrow-down.svg" alt="" /> :
                            <img src="/assets/images/icons/angle-arrow-right.svg" alt="" />}
                    </button>

                    <div className="info">
                        <h6>{attribute.name}</h6>

                        {showInfo &&
                            <div>
                                {attribute.description &&
                                    <p>{attribute.description}</p>
                                }

                                {attribute.example &&
                                    <p> Ex:{attribute.example}</p>
                                }

                                {attribute.optional &&
                                    <p> Opcional</p>
                                }

                                {attribute.references &&
                                    <p> References to: {attribute.references}</p>
                                }
                            </div>
                        }
                    </div>
                </div>

                <h6>{attribute.type}</h6>
            </div>

            {attribute.attributes && showInfo &&
                attribute.attributes.map(attribute =>
                    <CollectionField attribute={attribute} />
                )
            }
        </section >
    )
}