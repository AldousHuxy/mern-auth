import { useState } from "react"
import { Button, Form, Stack } from "react-bootstrap"
import { FaFacebookF } from "react-icons/fa6"
import { FaGoogle } from "react-icons/fa6"
import { FaLinkedin } from "react-icons/fa6"
import { Link } from "react-router-dom"

export const Login = () => {
    const [activePanel, setActivePanel] = useState<string>('')

    const switchActivePanel = () => {
        setActivePanel(prev => prev === '' ? 'right-panel-active' : '')
    }

    return (
        <div className={`login-container ${activePanel}`}>
            <div className="login login-sign-up">
                <Form>
                    <h1>Create Account</h1>
                    <Stack direction="horizontal" className="login-social mx-auto">
                        <Link to="/facebook" className="social text-muted"><FaFacebookF/></Link>
                        <Link to="/google" className="social text-muted"><FaGoogle/></Link>
                        <Link to="/linkedin" className="social text-muted"><FaLinkedin/></Link>
                    </Stack>
                    <span>or use your email for registration</span>
                    <Form.Control type="text" placeholder="Name" className="mb-1"/>
                    <Form.Control type="email" placeholder="Email" className="mb-1" />
                    <Form.Control type="password" placeholder="Password" className="mb-1" />
                    <Button variant="secondary">Sign Up</Button>
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
                    <Form.Control type="email" placeholder="Email" className="mb-1" />
                    <Form.Control type="password" placeholder="Password" className="mb-1" />
                    <Link to="/reset" className="text-muted">Forgot your password?</Link>
                    <Button variant="secondary">Sign In</Button>
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