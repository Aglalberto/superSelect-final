import React, { useState } from 'react';
import './login.css'
function Login() {

  return (
    <div className='App'>
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Login</h2>
      <form action='url/register' method='POST'/>
      <form>
  <div class="row mb-3">
    <label for="inputEmail3" class="col-sm-2 col-form-label" className='Email'>Email</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" id="inputEmail3" className='input' />
    </div>
  </div>
  <div class="row mb-3">
    <label for="inputPassword3" class="col-sm-2 col-form-label row-cols-1" className='senha'>Senha</label>
    <div class="col-sm-10">
      <input type="password" class="form-control "  id="inputPassword3" className='input'/>
    </div>
  </div>
  <fieldset class="row mb-3">
   
    
  </fieldset>
  <div class="row mb-3">
    <div class="col-sm-10 offset-sm-2">
      
    </div>
  </div>
  <button type="submit" class="btn btn-primary" >Entrar</button>
</form>
    </div>
    </div>
  );
};

export default Login;