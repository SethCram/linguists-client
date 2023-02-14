import CallToAction from "./CallToAction";
import "./Header.css"
import ME from "../../assets/Linguists Project Conceptual View.png"

export default function Header() {
  return (
    <header>
      <div className="container header__container">
        <h5>Hello, We're</h5>
        <h1>The Linguists</h1>
        <h5 className="text-light">Seth Cram & Khoi Nhugen</h5>
        <CallToAction />
        
        <div className='development__process'>
          <img src={ME} alt="development__process" />
        </div>
        
        <a href="#userinput" className='scroll__down__right'>Scroll Down</a>
        <a href="#userinput" className='scroll__down__left'>Scroll Down</a>
      </div>
    </header>
  )
}
