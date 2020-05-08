import React,{Component} from 'react';

import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import Home from './HomeComponent'
import Contact from './ContactComponent'
import About from './AboutComponent'

import {Switch,Route,Redirect,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { actions } from 'react-redux-form'

import { postComment,fetchDishes, fetchComments,fetchPromos,fetchLeaders,postFeedback} from '../redux/ActionCreators'

import { CSSTransition,TransitionGroup } from 'react-transition-group'

const mapStateToProps = state => {
  return{
    dishes : state.dishes,
    comments : state.comments,
    leaders : state.leaders,
    promotions : state.promotions
  }
}
const mapDispatchToProps = (dispatch) => ({
  postComment : (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment)),
  fetchDishes : () => { dispatch(fetchDishes()) },
  resetFeedbackForm : () => { dispatch(actions.reset('feedback')) },
  fetchComments : () => { dispatch(fetchComments()) },
  fetchPromos : () => { dispatch(fetchPromos()) },
  fetchLeaders : () => { dispatch(fetchLeaders()) },
  postFeedback : (firstname,lastname,telnum,email,contactType,message) => dispatch(postFeedback(firstname,lastname,telnum,email,contactType,message))
});

class Main extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
      this.props.fetchDishes();
      this.props.fetchComments();
      this.props.fetchPromos();
      this.props.fetchLeaders();
    }
    render(){
      const HomePage = () => {
        return(
          <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
            dishesLoading={this.props.dishes.isLoading} dishesErrMsg={this.props.dishes.errMsg}
            comment={this.props.comments.comments.filter((comment) => comment.featured)[0]}
            leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
            leadersLoading={this.props.leaders.isLoading} leadersErrMsg={this.props.leaders.errMsg}
            promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
            promotionsLoading={this.props.promotions.isLoading} promotionsErrMsg={this.props.promotions.errMsg} />
        );
      }
      const DishWithId = ({match}) =>{
        return(
          <DishDetail selectedDishById={ this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0] }
            isLoading={this.props.dishes.isLoading} errMsg={this.props.dishes.errMsg}
            comments={ this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10)) } 
            postComment={this.props.postComment}
            commentsErrMsg={this.props.comments.errMsg}  />
        );
      }
        return (
            <div>
              <Header />
              <TransitionGroup>
                <CSSTransition key={this.props.location.key} classNames='page' timeout={300}>
                  <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes.dishes} />} />
                    <Route path='/menu/:dishId' component={DishWithId} />
                    <Route exact path='/' component={HomePage} />
                    <Route path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedBack} /> } />
                    <Route path='/aboutus' component={() => <About leaders={this.props.leaders.leaders}
                      leadersLoading={this.props.leaders.isLoading} leadersErrMsg={this.props.leaders.errMsg} />} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
              <Footer />
            </div>
          );
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
