async function signup(e){
    try{
        e.preventDefault();
        const userObj={
            name:e.target.name.value,
            email: e.target.mail.value,
            password: e.target.password.value
        }
        console.log(userObj)
        const response = await axios.post('http://localhost:4000/user/sign-up',userObj)
        if(response.status===201){
            window.location.href='./login.html';
        }else{
            throw new Error('failed to signin');
        }
    }catch(err){
        document.body.innerHTML += `<section class="container"><div style="color:red;">${err.message}</div></section>`
    } 
}

async function login(e){
    try{
        e.preventDefault();
        const loginDetails = {
            email: e.target.mail.value,
            password: e.target.password.value
        }

        const response = await axios.post('http://localhost:4000/user/login',loginDetails)
        if(response.status === 201){
            alert(response.data.message)
            localStorage.setItem('token' , response.data.token)
            window.location.href='./expenseTracker.html';
        }else{
            throw new Error(response.data.message)
        }
    }
    catch(err){
        document.body.innerHTML += `<section class="container"><div style="color:red;">${err.message}</div></section>`
    }
}

async function Send(e){
    try{
        e.preventDefault();
        const emailobj ={
            email: e.target.mail.value
        }
        const response = await axios.post('http://localhost:4000/password/forgotpassword',emailobj)
        console.log(response.data)
        if(response.status === 202){
            document.body.innerHTML += '<section class="container"><div style="color:red;">Mail Successfuly sent <div></section>'
        } else {
            throw new Error('Something went wrong!!!')
        }
    }catch(err){
        document.body.innerHTML += `<section class="container"><div style="color:red;">${err.message}</div></section>`
    }
}