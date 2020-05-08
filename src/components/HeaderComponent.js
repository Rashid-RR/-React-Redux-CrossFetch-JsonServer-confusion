import React, { Component } from 'react';
import {Navbar, NavbarBrand ,Nav,NavItem,NavbarToggler,Collapse, Jumbotron,Button,Modal,ModalBody,ModalHeader, Form, FormGroup, Input, Label} from 'reactstrap';
import { NavLink } from 'react-router-dom'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isNavOpen : false,
            isModalOpen : false
         }
         this.toggleNav = this.toggleNav.bind(this);
         this.toggleModal = this.toggleModal.bind(this);
         this.handleLogin = this.handleLogin.bind(this);
    }
    toggleNav(){
        this.setState({
            isNavOpen : !this.state.isNavOpen,
        })
    }

    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen,
        });
    }
    handleLogin(){
        this.toggleModal();
        alert('username : ' + this.username.value + ' password : ' + this.password.value + ' remember me : ' + this.rememberme.checked);
    }
    
    render() {
        return ( 
            <>
                <Navbar dark expand='md'>
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand href="/" className='mr-auto'>
                            <img src='assets/images/logo.png' height='30' width='41' alt='Ristorante Con Fusion' />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className='nav-link' to='/home' >
                                        <span className='fa fa-home fa-lg'></span> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='nav-link' to='/aboutus' >
                                        <span className='fa fa-info fa-lg'></span> About Us
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='nav-link' to='/menu' >
                                        <span className='fa fa-list fa-lg'></span> Menu
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='nav-link' to='/contactus' >
                                        <span className='fa fa-address-card fa-lg'></span> Contact Us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className='ml-auto' navbar>
                                <NavItem>
                                    <Button outline onClick={this.toggleModal}>
                                        <span className='fa fa-sign-in fa-lg'> Login</span>
                                    </Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className='container'>
                        <div className='row row-header'>
                            <div className='col-12 col-sm-6'>
                                <h1>Restraunt Con Fusion</h1>
                                <p>We take inspirational from the World's best cusion,and create a unique fusion experience.Our Lips matching creation will tickle your clinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor='username'>Username</Label>
                                <Input type='text' id='username' innerRef={(input) => this.username = input} className='username'/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='password'>Password</Label>
                                <Input type='password' id='password' innerRef={(input) => this.password = input} className='password'/>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type='checkbox' name='remember' innerRef={(input) => this.rememberme = input} />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button color='primary' type='submit' value='submit'>Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
         );
    }
}
 
export default Header;