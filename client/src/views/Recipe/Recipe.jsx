import React from 'react';
// import Paper from 'material-ui/Paper';
import RecipeTemplate from '../../components/Recipes/RecipeTemplate';
// import {withRouter} from 'react-router-dom';
import {database} from '../../config/database';
import PropTypes from 'prop-types';
import './recipe.css';

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: {
                title: '',
                ingredientList: [],
                stepsList: [],
                image: {
                    url: '',
                    portrait: true
                }
            },
            masterIngredients: {},
            masterUnits: {},
        };
    }

    componentWillMount() {
        const comp = this;
        const recipeStr = `recipes/${this.props.match.params.id}`;
        const recipeRef = database.ref(recipeStr);
        recipeRef.on('value', function (snap) {
            comp.setState({
                recipe: snap.val()
            });
        });
        database.ref('ingredients').on('value', (snap) => {
            comp.setState({
                masterIngredients: snap.val()
            });
        });
        database.ref('units').on('value', (snap) => {
            comp.setState({
                masterUnits: snap.val()
            });
        });

    }

    render() {
        return (
            <div className="Recipe-Wrapper">
                <RecipeTemplate title={this.state.recipe.title}
                                ingredients={this.state.recipe.ingredientList}
                                steps={this.state.recipe.stepsList}
                                description={this.state.recipe.description || ''}
                                editing={false}
                                imgUrl={this.state.recipe.imgUrl || ''}
                                authorName={this.state.recipe.author || ''}
                                source={this.state.recipe.source}
                                masterIngredients={this.state.ingredients}/>
            </div>
        );
    }
}
Recipe.PropTypes = {
    match: PropTypes.object.isRequired
}

export default Recipe;
