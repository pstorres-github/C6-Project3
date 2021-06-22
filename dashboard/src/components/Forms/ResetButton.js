// TODO: Can this interaction be isolated to the current form only

function ResetButton(field) {
  function handleReset() {

  } Array.from(document.querySelectorAll(field)).forEach(
    input => (input.value = "")
  );

  return (<div><button onClick={handleReset}>Cancel</button></div>)
  
}
  
export default ResetButton

