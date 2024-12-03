function submitApplication(e) {
    e.preventDefault(); // You can ignore this; prevents the default form submission!
    const jobs = document.getElementsByName("job");
    for (let job of jobs) {
        if (job["checked"] == true) {
            alert("Thank you for applying being a " + job["value"] + "!");
            return;
        }
    }
    alert("Please select a job!");
    // TODO: Alert the user of the job that they applied for!
    
}