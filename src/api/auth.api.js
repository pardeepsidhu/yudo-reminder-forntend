const sendOtp=async(email,password,number)=>{
    try {
        let data = await fetch(`process.env.REACT_APP_BASE_URL/api/v1/user/sendotp`,{
            method:"post",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                email,
                password,
                number
            })
        })
        data = await data.json();
        return data;
    } catch (error) {
        console.log(error)
        return {error:"some error accured !"}
    }
}


export {sendOtp}