import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import {Tabs, Tab} from 'material-ui/Tabs';
// import Paper from 'material-ui/Paper';
// import Toggle from 'material-ui/Toggle';
import {database} from '../../config/database'
import PropTypes from 'prop-types';

// import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

// import RecipeListItem from './RecipeListItem';

class RecipeTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            expanded: true,
            emptyIngredients: this.props.ingredients.length <= 0,
            emptySteps: this.props.steps.length <= 0,
            emptyTitle: this.props.title.length <= 0,
            emptyDescription: this.props.description.length <= 0,
            masterUnits: {},
            masterIngredients: {}

        };
    }

    componentDidMount() {
        const comp = this;
        let loaded = 0;
        function checkLoaded(){
            loaded +=1;
            if (loaded >= 4) {
                comp.setState({
                    loaded: true
                })
            }
        }
        database.ref('recipes').on('value', function (snap) {
            comp.setState({
                recipes: snap.val()
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
        database.ref('tags').on('value', (snap) => {
            comp.setState({
                masterTags: snap.val()
            });
            checkLoaded();
        });
        this.setState({
            emptyIngredients: this.props.ingredients.length <= 0,
            emptySteps: this.props.steps.length <= 0,
            emptyTitle: this.props.title.length <= 0,
            emptyDescription: this.props.description.length <= 0
        })
    }

    handleRemoveIngredient(index) {
        this.props.removeItem('ingredients', index);
    }

    handleRemoveStep(index) {
        this.props.removeItem('steps', index);
    }

    render() {
        let ingredients = this.props.ingredients;
        let steps = this.props.steps;
        const imgUrl = this.props.imgUrl;
        const editing = this.props.editing;
        return (

            <div></div>



        );
    }
}
RecipeTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.array.isRequired,
    steps: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
    removeItem: PropTypes.func,
    editing: PropTypes.bool.isRequired,
    imgUrl: PropTypes.string,
    authorName: PropTypes.string,
    source: PropTypes.string,
    // masterIngredients: PropTypes.object.isRequired,
    // masterTags: PropTypes.object.isRequired,
    // masterUnits: PropTypes.object.isRequired,
};

export default RecipeTemplate;
