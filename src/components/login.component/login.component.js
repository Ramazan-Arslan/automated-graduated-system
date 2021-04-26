import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import postRequest from '../../data_access/postRequest';


async function LoginRequest() {
  var json =
  {
    email: "fsahin@std.iyte.edu.tr",
    password: "123456"
  }
  var obj = await postRequest("/login", json);
  return obj;
}


export default function Login() {


  const history = useHistory();
  const routeChange = () =>
  {
    let path = 'settings';
    history.push(path);
  }
  const [userInfo, setUserInfo] = useState({});
  useEffect(async () => {
    var object = await LoginRequest();
    if (object.id != null) {
      setUserInfo(object);
      routeChange();
    }
    else {
      object = object + "";
      var res_split = object.split("-");
    }

  });

  return (null)
}
