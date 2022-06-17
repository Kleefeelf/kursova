import logo from './logo.png'
import './Header.css'

function Header() {
    return (
        <div className="header">
            <nav>
                <img src={logo} id="logo"/>
            </nav>
        </div>
    )
}

export default Header