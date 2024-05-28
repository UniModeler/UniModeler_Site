import { Toaster } from 'react-hot-toast';

export default function ToasterContainer({props}) {

  if(!props) {
    props = {}
  }

  return (
    <Toaster 
      position={props.position ? props.position : 'bottom-left'}
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