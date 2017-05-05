import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List} from 'material-ui/List';
// import Subheader from 'material-ui/Subheader';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
// import Toggle from 'material-ui/Toggle';
import CircularProgress from 'material-ui/CircularProgress';
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
            <Paper itemScope itemType="http://schema.org/Recipe">
                <Card style={{maxWidth: 800}} expanded={imgUrl.length > 1}>
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
                                    {//(this.props.masterUnits.length < 2 ?
                                        //        () => {
                                        //            return (
                                        //                <CircularProgress size={2}/>
                                        //            );
                                        //        } :
                                        //        () => {
                                        //            return (
                                        //                ingredients.map((ingredient, index) => {
                                        //                    return (
                                        //                        <RecipeListItem key={index} index={index}
                                        //                                        removeItem={this.handleRemoveIngredient}
                                        //                                        content={ingredient}
                                        //                                        type={'ingredient'}
                                        //                                        ignore={false}
                                        //                                        editing={editing}
                                        //                                        masterIngredients={this.props.masterIngredients}
                                        //                                        masterTags={this.props.masterTags}
                                        //                                        masterUnits={this.props.masterUnits}/>
                                        //                    );
                                        //                })
                                        //            );
                                        //        }
                                        //)()
                                        ingredients.map((ingredient, index) => {
                                            return (
                                                <RecipeListItem key={index} index={index}
                                                                removeItem={this.handleRemoveIngredient}
                                                                content={ingredient}
                                                                type={'ingredient'}
                                                                ignore={false}
                                                                editing={editing}
                                                                masterIngredients={this.props.masterIngredients}
                                                                masterTags={this.props.masterTags}
                                                                masterUnits={this.props.masterUnits}/>
                                            );
                                        })
                                    }
                                </List>
                            </Tab>
                            <Tab label="steps">
                                <List>
                                    {(this.state.emptySteps ?
                                            () => {
                                                const fake = {
                                                    text: 'Step 1',
                                                    key: 0,
                                                };
                                                return (
                                                    <RecipeListItem key={fake.key} index={0}
                                                                    removeItem={this.handleRemoveStep}
                                                                    content={fake}
                                                                    type={'step'} ignore={true}
                                                                    editing={editing}
                                                                    masterIngredients={this.props.masterIngredients}
                                                                    masterTags={this.props.masterTags}
                                                                    masterUnits={this.props.masterUnits}/>
                                                );
                                            } :
                                            () => {
                                                return (
                                                    steps.map((step, index) => {
                                                        return (
                                                            <RecipeListItem key={index} index={index}
                                                                            content={step}
                                                                            ignore={false}
                                                                            removeItem={this.handleRemoveStep}
                                                                            type={'step'}
                                                                            editing={editing}
                                                                            masterIngredients={this.props.masterIngredients}
                                                                            masterTags={this.props.masterTags}
                                                                            masterUnits={this.props.masterUnits}/>
                                                        );
                                                    })
                                                );
                                            }
                                    )()}
                                </List>
                            </Tab>
                        </Tabs>
                    </CardText>
                    <CardActions>
                    </CardActions>
                </Card>
            </Paper>
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
    masterIngredients: PropTypes.object.isRequired,
    masterTags: PropTypes.object.isRequired,
    masterUnits: PropTypes.object.isRequired,
};

export default RecipeTemplate;
