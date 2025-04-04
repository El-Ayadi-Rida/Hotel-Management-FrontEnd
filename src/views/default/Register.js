import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { register } from 'auth/authSlice';

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  
  
  const title = 'Register';
  const description = 'Register Page';


    useEffect(()=>{
      if(status === 'succeded'){
        history.push('/login');      
      }
    },[status])
    
  
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('User Name is required'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(6, 'Must be at least 6 chars!').required('Password is required'),
  });
  const initialValues = { username: '', email: '', password: '', role: 'customer' };
  const onSubmit = async (values) => {
    await dispatch(register(values));
    console.log('submit form', values);
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const leftSide = (
    <div className="min-h-100 d-flex align-items-center">
      <div className="w-100 w-lg-75 w-xxl-50">
        <div>
          <div className="mb-5">
            <h1 className="display-3 text-white">Hotel Management System</h1>
            <h1 className="display-3 text-white">Ecole Supérieure de Technologie (EST), Meknès</h1>
          </div>
          <p className="h6 text-white lh-1-5 mb-5">
            The Hotel Management System is a web-based platform designed to streamline hotel operations, including room management, user authentication, and booking services. Built using Node.js (Express.js) for the backend, MySQL for data storage, and React.js for the frontend - 
            <span role="img" aria-label="team members">👥</span> Team Members: Douae BEN SAGA - Imane CHIBANI - 
            <span role="img" aria-label="supervisor">🧑‍💼</span> Supervisor: Ibtissam TOUAHRI
          </p>
        </div>
      </div>
    </div>
  );

  const rightSide = (
    <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-50 px-5">
        <div className="sh-11">
          <NavLink to="/">
            <div className="logo-default" />
          </NavLink>
        </div>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">Welcome,</h2>
          <h2 className="cta-1 text-primary">let's get the ball rolling!</h2>
        </div>
        <div className="mb-5">
          <p className="h6">Please use the form to register.</p>
          <p className="h6">
            If you are a member, please <NavLink to="/login">login</NavLink>.
          </p>
        </div>
        <div>
          <form id="registerForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="user" />
              <Form.Control type="text" name="username" placeholder="User Name" value={values.username} onChange={handleChange} />
              {errors.username && touched.username && <div className="d-block invalid-tooltip">{errors.username}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="email" />
              <Form.Control type="text" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
              {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="lock-off" />
              <Form.Control type="password" name="password" onChange={handleChange} value={values.password} placeholder="Password" />
              {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
            </div>
            <Button size="lg" type="submit">
              Signup
            </Button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <HtmlHead title={title} description={description} />
      <LayoutFullpage left={leftSide} right={rightSide} />
    </>
  );
};

export default Register;
