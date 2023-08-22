import { FormEvent, useEffect, useState } from "react"
import { Button, Form, Stack } from "react-bootstrap"
import { FaFacebookF } from "react-icons/fa6"
import { FaGoogle } from "react-icons/fa6"
import { FaLinkedin } from "react-icons/fa6"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { apiSlice } from './../../slices/apiSlice';
import { setCredentials } from './../../slices/authSlice';
import { useLoginMutation, useRegisterMutation } from "../../slices/usersApiSlice"
import { toast } from 'react-toastify';
import './Login.scss'
import { Loader } from "../Loader"

export const Login = () => {
    const [activePanel, setActivePanel] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()
    const [register] = useRegisterMutation()

    const { userInfo } = useSelector((state: any) => state.auth)

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    const switchActivePanel = () => {
        setActivePanel(prev => prev === '' ? 'right-panel-active' : '')
    }

    const signIn = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const res = await login({ email, password }).unwrap()
            dispatch(setCredentials({...res}))
            navigate('/')
        } catch (err: any) {
            toast.error(err?.data?.message || err.error)
        }
    }

    const signUp = async (e: FormEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
        } else {
            try {
                const res = await register({ name, email, password }).unwrap()
                dispatch(setCredentials({...res}))
                navigate('/')
            } catch (err: any) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    return (
        <div className={`login-container ${activePanel} mx-auto`}>
            <div className="login login-sign-up">
                <Form>
                    <h1>Create Account</h1>
                    <Stack direction="horizontal" className="login-social mx-auto">
                        <Link to="/facebook" className="social text-muted"><FaFacebookF/></Link>
                        <Link to="/google" className="social text-muted"><FaGoogle/></Link>
                        <Link to="/linkedin" className="social text-muted"><FaLinkedin/></Link>
                    </Stack>
                    <span>or use your email for registration</span>
                    <Form.Control
                        type="text"
                        placeholder="Name"
                        className="mb-1"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        className="mb-1" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        className="mb-1" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        className="mb-1" 
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <Button variant="secondary" onClick={signUp}>Sign Up</Button>
                </Form>
            </div>
            <div className="login login-sign-in">
                <Form>
                    <h1>Sign in</h1>
                    <Stack direction="horizontal" className="login-social mx-auto">
                        <Link to="/facebook" className="social text-muted"><FaFacebookF/></Link>
                        <Link to="/google" className="social text-muted"><FaGoogle/></Link>
                        <Link to="/linkedin" className="social text-muted"><FaLinkedin/></Link>
                    </Stack>
                    <span>or use your account</span>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        className="mb-1" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        className="mb-1" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Link to="/reset" className="text-muted">Forgot your password?</Link>
                    <Button variant="secondary" onClick={signIn}>Sign In</Button>
                    {isLoading && <Loader />}
                </Form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <Button 
                            style={{ background: 'transparent', borderColor: '#ffffff' }}
                            onClick={switchActivePanel}
                        >
                            Sign In
                        </Button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <Button 
                            style={{ background: 'transparent', borderColor: '#ffffff' }}
                            onClick={switchActivePanel}
                        >
                            Sign Up
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}