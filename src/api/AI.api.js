const generateAIContent = async (aiPrompt,setEmailDetails,setWaiting,setMessage,EmailDetails) => {
    try {
        setWaiting(true)
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/email/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: aiPrompt 
        }),
      });
      const data = await response.json();
      // console.log(data)
    if(data.error){
        setMessage(data.error)
    }
    else{
        let {message,subject}=data;
        setEmailDetails({scheduledTime:EmailDetails.scheduledTime,message,subject})
    }
    } catch (error) {
        // console.log(error)
     setMessage("Some Error Accured While Genrating AI Content !")
    }
    finally{
        setWaiting(false)
    }
  };

  export {generateAIContent}