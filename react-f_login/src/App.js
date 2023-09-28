import './App.css';
import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Card } from 'react-facebook-login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App () {
  const [login, setLogin] = useState(false); //setup login
  const [data, setData] = useState({}); //set up fb data
  const [picture, setPicture] = useState(''); //set up fb profile image

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken){
      setLogin(true);
    }else {
      setLogin(false);
    }
  }

  return (
    <div class="container">
      <Card style={{width:'800px'}} className="mx-auto mt-5">
        <Card.Header classNmae="pb-4">
          <h1>My React App</h1>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {!login &&
            <React.Fragment>
              <h3>Please Login Using One of the Following:</h3>
              {/* login form  */ }
              <LoginForm></LoginForm> 
              {/* facebooklogin */}
              <FacebookLogin
                  appId="861507205482529"
                  autoLoad={false}
                  fields="name,email,picture"
                  scope="public_profile,user-friends"
                  callback={responseFacebook}
                  icon="fa-facebook"
              />
            </React.Fragment>
            }
            {login &&
              <Home fbpic={picture} fbdata={data} />
            }
          </Card.Text>
        </Card.Body>
      </Card>

    </div>
  )


};

function LoginForm () {
  return (
    <form className="border mt-3 mb-5 p-3 bg-white">
      <label className="m-2">Name:</label>
      <imput type="text" name="name" placeholder="Your name" />
      <label className="m-2">Email</label>
      <input type="email" name="emial" placeholder="Your Email" />
      <input tyep="submit" value="login" className="btn bg-success text-white my-3" />
    </form>
  )
}
function Home({fbpic,fbdata}) {
  return(
    <>
      <img src={fbpic} alt={fbdata.name}></img>
      <h3 className="d-inline text-success mx-2">
        Welcome Back {fbdata.name}!
      </h3>
      <p Name="my-5">This is the home page of the app</p>
    </>
  )
}



export default App;
