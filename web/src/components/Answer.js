import React from 'react'

export const Answer = ({ answer }) => (
  <aside className="answer">
    <div dangerouslySetInnerHTML={{__html:answer.answer}} />
  </aside>
)
