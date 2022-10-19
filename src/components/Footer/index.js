import {FiInstagram} from 'react-icons/fi'
import {VscGithubAlt} from 'react-icons/vsc'
import {FaTwitter} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-main-container">
      <h1 className="covid-heading">
        COVID19<span className="span-element">INDIA</span>
      </h1>
      <p className="footer-paragraph">
        we stand with everyone fighting on the front lines
      </p>

      <div className="footer-icon-card">
        <VscGithubAlt className="git-icon" />
        <FiInstagram className="insta-icon" />
        <FaTwitter className="twitter-icon" />
      </div>
    </div>
  )
}
