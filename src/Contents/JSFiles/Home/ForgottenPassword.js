import '../../../Contents/CSSFiles/Login.css';
import {Link, useNavigate} from "react-router-dom";
import {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useRef } from 'react';
import {Login} from './Login'
import { toast,ToastContainer } from "react-toastify";
import bcrypt from 'bcryptjs-react';
import axios from 'axios'


export const ForgottenPassword = () =>{
  
    const [email,setEmail] = useState('');
    const [maidenName,setMaidenName] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [show, setShow] = useState(false); 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 
    const [isChecking,SetIsChecking] = useState(false);
    const [data,setData] = useState('');
    const [counter,setCounter] = useState(0);
    const [templateParams,setTemplateParams] = useState({});

  const navigate = useNavigate()

  useEffect(()=>{
    fetch(`${process.env.URL}/register`)
    .then(res =>{
        return res.json();
     })
     .then((data) =>{
       setData(data);
      })
     .catch(err=>{
          console.log(err);
    })
   },[]);

const handleSubmit = (e) =>{
  e.preventDefault();
  const id = data.length
  const hash=bcrypt.hashSync(password);//Hashing password here
  const datax = {id,email,maidenName,hash};
  if(!email||!maidenName||!confirmPassword||!password) 
  return toast.warning("Enter all field");

  if(password!=confirmPassword) {
    toast.warning("Password missmatch")
    return
  }
 
  SetIsChecking(true);
     fetch(`${process.env.REACT_APP_URL}/register`,
          {
            method: 'PUT',
            headers:{
                "Content-Type": "application/json"
             },
            body: JSON.stringify(datax)
            }
            )
        .then(res =>{return res.json()})
        .then(data =>{ 
          if(data){ 
                  toast.success(data);     
                  SetIsChecking(false)   
                  setEmail("");
                  setMaidenName("");
                  setPassword("");
                  setConfirmPassword("");              
                  setTimeout(() => {           
                  window.location.reload();
                 }, 2000); 
                } 
                else{
                  toast.warning("Password not changed");
                  SetIsChecking(false)
                } 
             })
             .catch(err=>{  
              SetIsChecking(false)              
                  console.log(err);
          })
    
          }

        return (
          <div style={{cursor:"pointer", marginRight:"20px"}}>
           
            <button class="btn btn-primary" type='submit' onClick={handleShow}>
             Password Recovery
            </button>
      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Recover Password</Modal.Title>
              </Modal.Header>
              <form  onSubmit={handleSubmit}>
              <Modal.Body>
              <div class="modal1">
       
        <div class="container">
          <div class="row  ">
            <div  class="col-12 login">
                <input 
                value={email}
                name="email"
                onChange = {(e)=>setEmail(e.target.value)}
                type='email' 
                placeholder="Email" />
            </div>
            <div class="col-12 login">
            <input 
                value={maidenName}
                name="maidenName"
                onChange = {(e)=>setMaidenName(e.target.value)}
                type='text' 
                placeholder="Maiden Name" />
           </div>
             <div class="col-12 login">
                <input 
                value={password}
                name="password"
                onChange = {(e)=>setPassword(e.target.value)}
                type='password' 
                placeholder="New Password" />
             </div>
             <div class="col-12 login">
             <input 
                value={confirmPassword}
                onChange = {(e)=>setConfirmPassword(e.target.value)}
                type='password' 
                placeholder="Confirm New Password" />
             </div>
              <div class="col-12 login">
                {isChecking && <strong style={{color:'white'}}>Checking your details...</strong>}
              </div>
                </div>
          </div>
          </div>
                </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                 Submit
                </Button>
                <ToastContainer
                  position='top-right'
                  autoClose={4000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme='light'
                  />
              </Modal.Footer>
              </form>
            </Modal>
          </div>
        );
      }
      
     
  
  
  
  