import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound: React.FC = () => {
  return (
    <div className="page">
      <h1>Page Not Found</h1>
      <Link to="/" replace>
        back home
      </Link>
    </div>
  )
}

export default PageNotFound
