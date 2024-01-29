import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

export default function ToasterContainer({props}) {

    let position = props.position ? props.position : 'bottom-left';

    return (
        <Toaster 
            position={position}
            reverseOrder
            containerClassName='cont-toaster'
            toastOptions={{
                duration: 3000,
                style: {
                    background: '#202020',
                    color: '#FFF',
                    borderRadius: '5px'
                }
            }}
            {...props}
        />
    )
}