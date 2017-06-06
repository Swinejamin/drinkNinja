import React from 'react';
// import Paper from 'material-ui/Paper';
// import {withRouter} from 'react-router-dom';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import {Tabs, Tab} from 'material-ui/Tabs';
import RecipeListItem from '../../components/Recipes/RecipeListItem';

import {database} from '../../config/database';
import PropTypes from 'prop-types';
import './recipe.css';

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            ingredientList: [],
            stepsList: [],
            recipe: {
                title: '',
                source: '',
                author: '',
                imgUrl: ''
            },
            masterIngredients: {},
            masterUnits: {},
        };
    }

    componentDidMount() {
        const comp = this;
        let loaded = 0;
        function checkLoaded(){
            loaded +=1;
            if (loaded >= 5) {
                comp.setState({
                    loaded: true
                })
            }
        }
        const id = this.props.match.params.id;
        const recipeRef = database.ref(`recipes/${id}`);
        const ingredientsRef = database.ref(`ingredientLists/${id}`);
        const stepsRef = database.ref(`stepsLists/${id}`);
        recipeRef.on('value', function (snap) {
            comp.setState({
                recipe: snap.val()
            });
            checkLoaded();
        });
        ingredientsRef.on('value', function (snap) {
            comp.setState({
                ingredientList: snap.val()
            });
            checkLoaded();
        });
        stepsRef.on('value', function (snap) {
            comp.setState({
                stepsList: snap.val()
            });
            checkLoaded();
        });
        database.ref('ingredients').on('value', (snap) => {
            comp.setState({
                masterIngredients: snap.val()
            });
            checkLoaded();
        });
        database.ref('units').on('value', (snap) => {
            comp.setState({
                masterUnits: snap.val()
            });
            checkLoaded();
        });

    }

    render() {
        const editing = this.props.editing;
        return (
                this.state.loaded ?
                <Card itemScope itemType="http://schema.org/Recipe" style={{maxWidth: 800, margin: '0 auto'}}
                      expandable initiallyExpanded>
                    <CardHeader
                        title={this.state.recipe.title}
                        subtitle={this.props.description}
                        actAsExpander
                    />

                    <CardTitle title={this.state.recipe.author || 'Author unknown'}
                               subtitle={this.state.recipe.source || 'Source unknown'}/>
                    <CardText>
                        <Tabs>
                            <Tab label="Ingredients">
                                <List>
                                    {
                                        this.state.ingredientList.map((ingredient, index) => {
                                            return (
                                                <RecipeListItem key={index} index={index}
                                                                removeItem={this.handleRemoveIngredient}
                                                                content={ingredient}
                                                                type={'ingredient'}
                                                                ignore={false}
                                                                editing={editing}
                                                                masterIngredients={this.state.masterIngredients}
                                                                masterTags={this.state.masterTags}
                                                                masterUnits={this.state.masterUnits}/>
                                            );
                                        })
                                    }
                                </List>
                            </Tab>
                            <Tab label="steps">
                                <List>
                                    {this.state.stepsList.map((step, index) => {
                                        return (
                                            <RecipeListItem key={index} index={index}
                                                            removeItem={this.handleRemoveIngredient}
                                                            content={step}
                                                            type={'step'}
                                                            ignore={true}
                                                            editing={editing}
                                                            masterIngredients={this.state.masterIngredients}
                                                            masterTags={this.state.masterTags}
                                                            masterUnits={this.state.masterUnits}/>
                                        );
                                    })}
                                </List>
                            </Tab>
                        </Tabs>
                    </CardText>
                    <CardMedia expandable={true}>
                        <img src={this.state.recipe.imgUrl} alt={this.state.recipe.title}/>
                    </CardMedia>
                    <CardActions>
                    </CardActions>
                </Card> :
                <CircularProgress size={100} thickness={10} style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>


        );
    }
}
Recipe.PropTypes = {
    match: PropTypes.object.isRequired
}

export default Recipe;

// {/*<RecipeTemplate title={this.state.recipe.title}*/}
// {/*ingredients={this.state.ingredientList}*/}
// {/*steps={this.state.stepsList}*/}
// {/*description={this.state.recipe.description || ''}*/}
// {/*editing={false}*/}
// {/*imgUrl={this.state.recipe.imgUrl || ''}*/}
// {/*authorName={this.state.recipe.author || ''}*/}
// {/*source={this.state.recipe.source}*/}
// {/*masterIngredients={this.state.ingredients}/>*/}
