const Notification = ({ message }) => {
  if(message ===null )
    return null
  const css =  {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return(
    <div style={css}>
      <p>{message}</p>
    </div>
  )
}

export default Notification