import handleApiError from '../utils/Errorhandler';
const signin = async (user) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}:12707/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'credentials': 'include',
        },
        body: JSON.stringify(user)
      })
      return await response.json()
    } catch(err) {
      console.log("loginError::",err)
      handleApiError(err);

    }
  }
  
  const signout = async () => {
    try {
      let response = await fetch('/signout', { method: 'GET' })
      return await response.json()
    } catch(err) {
      console.log(err)
      handleApiError(err);
    }
  }
  
  export {
    signin, 
    signout
  }
  