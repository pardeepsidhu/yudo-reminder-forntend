const sendOtp=async(email,password,setMessage,setOtp,setOtpSent,setOtpTimer,setWaiting)=>{
    // console.log(process.env.REACT_APP_BASE_URL)
    try {
        setWaiting(true)
        let data = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/user/sendotp`,{
            method:"post",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        })
        data = await data.json();
        // console.log(data)
        if(data.error) {
            setMessage(data.error)
            return;
        }
        else{
            setOtp(data.otp)
            setOtpSent(true)
            setMessage(`OTP sent successfuly to ${email}`)
            setOtpTimer(60)
        }
        
        
    } catch (error) {
        // console.log(error)
        setMessage("some error accured !")
        return {error:"some error accured !"}
    }
    setWaiting(false)
}

const handleSignIn = async(email,password,setMessage,e,navigate,setWaiting,setUser)=>{
    try {
        setWaiting(true)
        if (e && e.preventDefault) e.preventDefault(); 

        let data = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/user/login`,{
            method:"post",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        })
        data = await data.json();
        // console.log(data)
        if(data.error) {
            setMessage(data.error)
            return;
        }
        else{
            setMessage("Login Successfuly !");
            setUser(true)
            localStorage.setItem("user",JSON.stringify(data))
            navigate("/")
        }

    } catch (error) {
        setMessage("Some Error Accured While Login !")
    }
    finally{
        setWaiting(false)
    }
}

const verifyOtp = async (email, otp, setMessage, e,navigate,setWaiting,setUser) => {
    try {
        setWaiting(true)
        if (e && e.preventDefault) e.preventDefault(); 

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/user/verifyotp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, otp }),
        });

        const jsonData = await response.json();

        if(jsonData.error){
            setMessage(jsonData.error);
            return;
        }

        localStorage.setItem("user", JSON.stringify(jsonData));
        setUser(true)
        setMessage("Signup Successfully !");
        navigate("/")
        
    } catch (error) {
        // console.error("OTP Verification Error:", error);
        setMessage("An error occurred while verifying OTP !");
    }
    finally{
        setWaiting(false)
    }
};

export {sendOtp,verifyOtp,handleSignIn}