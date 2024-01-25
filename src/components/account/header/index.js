import './index.scss';

export default function Header() {
    return (
        <header className="accounts-header">
            <div className="welcome">
                <img src="/assets/images/logo_icon.svg" alt="" />
                <h2>Olá, bom te ver de novo Bruno ;)</h2>
            </div>

            <div className="user-menu">
                <div>B</div>
                <img src="/assets/images/icons/chevron-down.svg" alt="" />
            </div>
        </header>
    )
}