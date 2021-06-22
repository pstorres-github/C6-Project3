import ResetButton from "./Forms/ResetButton"
import SubmitButton from "./Forms/SubmitButton"

function ScheduleJobs() {


  return (
    <div>
      <h3>Schedule a Flight</h3>

      
      {/* job request form */}
      {/* job number
      job location
      job details
      submit button */}

      <form>
        <label>Job title:</label>
        <input type="text" id="job-title" placeholder="Job Title"></input>

        {/* Possibly auto-assigned as a default and user can enter own details if required */}
        <label>Job number:</label>
        <input type="text" id="job-number" placeholder="Job Number"></input> 

        <br/>
        <label>Job details:</label>
        <textarea type="text" id="job-details" placeholder="Job Details"></textarea>

        <br />

        {/* <label for="datemax">
          Enter a date before 2019-01-01:
        </label> */}

        <label>Job date:</label>
        <input type='date' min='2019-01-01' max='2030-01-01' />
        
      </form>
      <ResetButton field="textarea, input"/>
      <SubmitButton />

    </div>
  )
}

export default ScheduleJobs