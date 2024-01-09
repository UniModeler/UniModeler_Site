import { Toaster } from 'react-hot-toast';

export default function ToasterContainer() {
    return (
        <Toaster 
            position='bottom-left'
            reverseOrder
            toastOptions={{
                duration: 3000,
                style: {
                    background: '#202020',
                    color: '#FFF',
                    borderRadius: '5px'
                }
            }}
        />
    )
}