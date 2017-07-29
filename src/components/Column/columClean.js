import React from 'react'

const ColumnClean = (props) => {
  const { title, isEmpty, children } = props
  return (
    <div className="column">
      <div className="column__inner">
        <h2 className="column__title">{title}</h2>
        <div className="column__body">
          {children}
          {isEmpty && <div className="column__empty">Is empty...</div>}
        </div>
      </div>
    </div>
  )
}

export default ColumnClean
