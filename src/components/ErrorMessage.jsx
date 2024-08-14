const ErrorMessage = ({ message }) => {
  if(message ===null )
    return null
  const css =  {
    color: 'red',
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

export default ErrorMessage