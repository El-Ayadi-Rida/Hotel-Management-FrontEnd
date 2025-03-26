import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { login } from 'auth/authSlice';
import { USER_ROLE } from 'constants.js';


const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser, isLogin , status , error } = useSelector((state) => state.auth);

  const title = 'Login';
  const description = 'Login Page';

  console.log("currentUser::: ", currentUser);
  


  useEffect(()=>{
    
    if(currentUser){
      const userRole = currentUser?.role;
      history.push(userRole === USER_ROLE.Admin ? "app/admin": "app/custumer");      
    }
  },[currentUser])


  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  const initialValues = { email: '', password: '' };

  const onSubmit = async (values) => {
    console.log('submit form', values);
    await dispatch(login(values));
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
          <h2 className="cta-1 text-primary">let's get started!</h2>
        </div>
        <div className="mb-5">
          <p className="h6">Please use your credentials to login.</p>
          <p className="h6">
            If you are not a member, please <NavLink to="/register">register</NavLink>.
          </p>
        </div>
        <div>
          <form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="email" />
              <Form.Control type="text" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
              {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="lock-off" />
              <Form.Control type="password" name="password" onChange={handleChange} value={values.password} placeholder="Password" />
              <NavLink className="text-small position-absolute t-3 e-3" to="/forgot-password">
                Forgot?
              </NavLink>
              {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
            </div>
            <Button size="lg" type="submit">
              Login
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

export default Login;
