import React, { Component } from 'react';
import {Card,CardTitle,CardImg,CardBody, CardText,Breadcrumb,BreadcrumbItem, Row,Col,Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';
import { Link } from 'react-router-dom'
import {Control,LocalForm,Errors} from 'react-redux-form'
import {Loading} from './LoadingComponent'
import {baseUrl} from '../shared/baseUrl'

import { FadeTransform, Fade, Stagger } from 'react-animation-components'

const RenderDish = ({dish}) => {
    return(
        <div className='col-12 col-md-5 m-1'>
            <FadeTransform in transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg width='100%' src={baseUrl+dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    );
}
const RenderComment = ({comment,postComment,dishId}) => {
    if(comment != null){
    return(
        <div className='col-12 col-md-5 m-1'>
            <h2>Comments</h2>
            <Stagger in>
                {comment.map((cmnt) => {
                    return(
                        <Fade in>
                            <div key={cmnt.id}>
                                <p>{cmnt.comment}</p>
                                <p>--{cmnt.author} , {new Intl.DateTimeFormat('en-US',{ year: 'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(cmnt.date)))}</p>
                            </div>
                        </Fade>
                    );
                })}
            </Stagger>
            <RenderCommentForm dishId={dishId} postComment={postComment} />
            
        </div>
        
    );
    }else{
        return(<div></div>);
    }
}

class RenderCommentForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            isModelOpen : false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }

    toggleModal(){
        this.setState({
            isModelOpen : !this.state.isModelOpen
        })
    }
    handleComment(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId,values.rating,values.author,values.comment)
    }

    render() { 
        return ( 
            <>
                <Button type='text' outline onClick={this.toggleModal}><span class="fa fa-pencil"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        <strong>Submit Comment</strong>
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleComment}>
                            <Row className='form-group'>
                                <Label md={12} htmlFor='rating'>
                                    <strong>Rating</strong>
                                </Label>
                                <Col>
                                    <Control.select model='.rating' className='form-control' name='rating'>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label md={12} htmlFor='author'>
                                    <strong>Your Name</strong>
                                </Label>
                                <Col>
                                    <Control.text model='.author' className='form-control' name='author' placeholder='Your Name'/>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label md={12} htmlFor='comment'>
                                    <strong>Comment</strong>
                                </Label>
                                <Col>
                                    <Control.textarea rows='6' model='.comment' className='form-control' name='comment'/>
                                </Col>
                            </Row>
                            <Button type='text' color='primary'>Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
         );
    }
}

      
export const DishDetail = (props) => {

    if(props.isLoading){
        return(
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        );
    }
    else if(props.errMsg){
        return(
            <div className='container'>
                <div className='row'>
                    <h4>{props.errMsg}</h4>
                </div>
            </div>
        );
    }
    else if(props.selectedDishById != null){
        return ( 
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.selectedDishById.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.selectedDishById.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className='row'>
                    <RenderDish dish={props.selectedDishById} />
                    <RenderComment comment={props.comments} postComment={props.postComment} dishId={props.selectedDishById.id} />
                </div>
            </div>
        );
    }else{
        return(
            <div></div>
        );
    }
}
        
export default DishDetail;