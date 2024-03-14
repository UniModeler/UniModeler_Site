import { confirmAlert } from 'react-confirm-alert';
import './index.scss';

export default function UnsavedAlert({ blocker }) {
    return (
        confirmAlert({
            onClickOutside: blocker.reset,
            onkeyPress: blocker.reset,
            onKeypressEscape: blocker.reset,
            overlayClassName: 'unsaved-alert-overlay',
            customUI: ({ onClose }) => <Alert onClose={onClose} blocker={blocker} />
        })
    )
}

function Alert({ onClose, blocker }) {
    return (
        <div className="unsaved-alert">
            <h2>Are you sure you want to leave?</h2>
            <p>This project have unsaved changes.</p>

            <div className="buttons">
                <button onClick={() => { blocker.proceed(); onClose(); }}>
                    Proceed
                </button>
                <button onClick={() => { blocker.reset(); onClose(); }}>
                    Cancel
                </button>
            </div>
        </div>
    )
}