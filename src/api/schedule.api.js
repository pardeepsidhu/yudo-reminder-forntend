const scheduleEmail = async(EmailDetails,setMessage,navigate,setWaiting,token)=>{
    try {
        setWaiting(true)
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/email/schedule`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token":token
            },
            body: JSON.stringify({
                 subject:EmailDetails.subject,
                body:EmailDetails.message,
                scheduleTime:EmailDetails.scheduledTime 
            }),
        });

        let data = await response.json();
        if(data.error){
            setMessage(data.error)
        }
        else{
            setMessage("Successfuly Scheduled !")
            navigate("/allreminder")
        }
    } catch (error) {
        console.log(error)
        setMessage("Some Error Accured !")
    }
    finally{
        setWaiting(false)
    }
}

const getAll =async(token,setMessage,setEmails,setWaiting,limit,setTotal)=>{
    try {
        setWaiting(true)
        let emails = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/email/getall/${limit}`,{
            headers:{
                "auth-token":token
            }
            })
        emails = await emails.json();
        if(emails.error){
            setMessage(emails.error)
        }
        else{
            setEmails(emails.emails)
            setTotal(emails.total)
            console.log(emails)
        }
    } catch (error) {
        console.log("this is eerrro "+error)
        setMessage("Some Error Accured !")
    }
    finally{
        setWaiting(false)
    }
}

const deleteEmail = async (jobId, setMessage, token, setFilteredEmails, filteredEmails, setOpenDialog) => {
    try {
        setOpenDialog(false)
        console.log(`Deleting email with jobId: ${jobId}`);

        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/email/delete/${jobId}`, {
            method: "DELETE",
            headers: {
                "auth-token": token
            }
        });

        let data = await response.json();
        console.log("Response:", data);

        if (data.error) {
            setMessage(data.error);
        } else {
            setFilteredEmails(filteredEmails.filter((email) => email.jobId !== jobId));
            setMessage("Deleted Successfully!");
        }
    } catch (error) {
        // console.error("Error:", error);
        setMessage("An error occurred while deleting the email!");
    } 
};


export{scheduleEmail,getAll,deleteEmail}