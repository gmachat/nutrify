import React from 'react'
import {Link} from 'react-router-dom'

import { handleRecipeSearch} from '../Utils/UtilFunctions'
import SearchBar from './SearchBar'

function Dashboard({userInfo, searchTerms, setSearchTerms}) {



  if(userInfo?.isLoggedIn){
  return (
    <div className="dashboard-main">
      <div className="dashboard-inner secondary-backdrop secondary-on-primary" >
      <div className="dashboard-inner-content primary-backdrop primary-on-secondary">
        <h3 className='secondary-backdrop text-section secondary-on-primary'>Welcome {userInfo?.user?.username}</h3>
      </div>
        <div className="recipe-search-home-container  primary-backdrop primary-on-secondary">
          <SearchBar searchTerms={searchTerms} setSearchTerms={setSearchTerms} />
        </div>
      </div>
    </div>
  )
  }else{
    return (
      <div className="dashboard-main">
        <div className="dashboard-inner  primary-backdrop primary-on-secondary" >
          <div className="dashboard-inner-content primary-backdrop primary-on-secondary">
            <h3 className='secondary-backdrop text-section secondary-on-primary'>Welcome to Nutrify!</h3>
            <div className="secondary-backdrop text-section secondary-on-primary">
              <div> Nutrify is a unique recipe creation and sharing experience that allows users to create full nutritional profiles of all of their favorite recipes in seconds! Simply enter the ingredients/quantity and have the full nutritional portfolio in seconds!</div>
            <br />
            <div>To get started: <Link className="mid-sentence-link-secondary" to="/login">Login</Link> or <Link className="mid-sentence-link-secondary" to={'/signup'}>Create an Account</Link></div>
            </div>
          </div>
          <div className="recipe-search-home-container  primary-backdrop primary-on-secondary">
            <SearchBar searchTerms={searchTerms}  setSearchTerms={setSearchTerms}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
