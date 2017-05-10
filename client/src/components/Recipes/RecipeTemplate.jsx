import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List} from 'material-ui/List';
// import Subheader from 'material-ui/Subheader';
import {Tabs, Tab} from 'material-ui/Tabs';
// import Paper from 'material-ui/Paper';
// import Toggle from 'material-ui/Toggle';
import {database} from '../../config/database'
import PropTypes from 'prop-types';

// import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import RecipeListItem from './RecipeListItem';

class RecipeTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: true,
            emptyIngredients: this.props.ingredients.length <= 0,
            emptySteps: this.props.steps.length <= 0,
            emptyTitle: this.props.title.length <= 0,
            emptyDescription: this.props.description.length <= 0
        };
    }

    componentWillMount() {
        const comp = this;
        database.ref('recipes').on('value', function (snap) {
            comp.setState({
                recipes: snap.val()
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
        database.ref('tags').on('value', (snap) => {
            comp.setState({
                masterTags: snap.val()
            });
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

            <Card itemScope itemType="http://schema.org/Recipe" style={{maxWidth: 800, margin: '0 auto'}}
                  expanded={imgUrl.length > 1}>
                <CardHeader
                    title={this.props.title}
                    subtitle={this.props.description}
                />
                <CardMedia expandable={true}>
                    <img src={imgUrl} alt={this.props.title}/>
                </CardMedia>
                <CardTitle title={this.props.authorName || 'Author unknown'}
                           subtitle={this.props.source || 'Source unknown'}/>
                <CardText>
                    <Tabs>
                        <Tab label="Ingredients">
                            <List>
                                {
                                    ingredients.map((ingredient, index) => {
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
                                {steps.map((step, index) => {
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
                <CardActions>
                </CardActions>
            </Card>
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
