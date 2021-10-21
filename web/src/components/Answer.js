import React from 'react'

export const Answer = ({ answer, userId, onDelete }) => (
  <aside className="answer">
    <div dangerouslySetInnerHTML={{__html:answer.answer}} />
    {answer.userId === userId && <button className="button" onClick={() => onDelete(answer.id)}>DELETE</button>}
  </aside>
)
