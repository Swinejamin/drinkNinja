"use strict";

import React from 'react';
import update from 'react-addons-update';
import RecipeTemplate from './RecipeTemplate.jsx';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import DropDownMenu from 'material-ui/DropDownMenu';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import base from '../../modules/rebase';
import {Tabs, Tab} from 'material-ui/Tabs';


import IngredientFinder from '../ingredients/IngredientFinder.jsx';


const dataSourceConfig = {
    text: 'value',
    value: 'key',
};

const RecipeAdder = React.createClass({
    propTypes: {
        masterIngredientList: React.PropTypes.object.isRequired,
        masterTagList: React.PropTypes.object.isRequired,
        masterUnitList: React.PropTypes.object.isRequired,
        add: React.PropTypes.func.isRequired,
        // loading: React.PropTypes.bool.isRequired
    },
    getInitialState() {
        return {
            unitSearchText: '',
            ingredientSearchText: '',
            recipeTitle: '',
            stepsList: [],
            newStep: '',
            ingredientList: [],
            tagList: {},
            unitList: {},
            amount: '',
            unit: '',
            currentIngredient: '',
            currentUnit: '',
            description: '',
            ingredients: {},
            imgUrl: '',
            author: '',
            source: ''
        };
    },
    handleTitleChange(e) {
        this.setState({recipeTitle: e.target.value});
    },
    //ingredients
    handleNewIngredient() {
        const ingredient = this.state.currentIngredient;
        const amount = this.state.amount;
        const unit = this.state.currentUnit;
        const newState = update(this.state, {
            ingredientList: {
                $push: [{
                    ingredient: ingredient,
                    amount: amount,
                    unit: unit
                }]
            },
            amount: {$set: ''},
            ingredientSearchText: {$set: ''},
            unitSearchText: {$set: ''},
            currentIngredient: {$set: ''},
            currentUnit: {$set: ''}
        });

        this.setState(newState);
    },
    // ingredients
    handleIngredientChange(ingredient) {
        this.setState({currentIngredient: ingredient.key});
    },
    handleUpdateIngredientSearch(t) {
        this.setState({ingredientSearchText: t});
    },
    // units
    handleUnitChange(unit) {
        this.setState({currentUnit: unit.key});
    },
    handleUpdateUnitSearch(t) {
        this.setState({unitSearchText: t});
    },
    // amounts
    handleAmountChange(e) {
        this.setState({amount: e.target.value});
    },

    // steps
    handleStepChange(e) {
        this.setState({newStep: e.target.value});
    },
    handleNewStep(e) {
        const newState = update(this.state, {
            stepsList: {$push: [{text: this.state.newStep, key: Date.now()}]},
            newStep: {$set: ''}
        });
        this.setState(newState);
        e.preventDefault();
    },
    // details
    handleImageChange(e) {
        this.setState({
            imgUrl: e.target.value
        });
    },
    handleAuthorChange(e) {
        this.setState({
            author: e.target.value
        });
    },
    handleSourceChange(e) {
        this.setState({
            source: e.target.value
        });
    },

    handleRemoveItem(type, index) {
        let target = '';
        let newState = '';

        if (type === 'ingredients') {
            target = this.state.ingredientList;
            const newData = target.slice(); // copy array
            newData.splice(index, 1); // remove element
            newState = update(this.state, {
                ingredientList: {$set: newData}
            });
        } else if (type === 'steps') {
            target = this.state.stepsList;
            const newData = target.slice(); // copy array
            newData.splice(index, 1); // remove element
            newState = update(this.state, {
                stepsList: {$set: newData}
            });
        }
        this.setState(newState); // update state
    },
    alphaByName(a, b) {
        if (a.value < b.value) {
            return -1;
        }
        if (a.value > b.value) {
            return 1;
        }
        return 0;
    },

    handleSubmit(e) {
        const firebaseRef = base.database().ref('recipes');
        e.preventDefault();
        firebaseRef
            .push({
                title: this.state.recipeTitle,
                ingredientList: this.state.ingredientList,
                stepsList: this.state.stepsList,
                description: this.state.description,
                imgUrl: this.state.imgUrl,
                author: this.state.author,
                source: this.state.source
            })
            .then(()=> {
                this.setState({
                    unitSearchText: '',
                    ingredientSearchText: '',
                    recipeTitle: '',
                    stepsList: [],
                    newStep: '',
                    ingredientList: [],
                    amount: '',
                    unit: '',
                    currentIngredient: {name: '', key: ''},
                    currentUnit: {name: '', key: ''},
                    description: '',
                    imgUrl: '',
                    author: '',
                    source: ''
                });
            })
            .catch((err) => {
                console.log(err);
            });
    },
    render() {
        const masterUnitList = _(this.props.masterUnitList)
            .keys()
            .map((ingredientKey) => {
                const cloned = {'value': _.clone(this.props.masterUnitList[ingredientKey].single)};
                cloned.key = ingredientKey;
                return cloned;
            })
            .value().sort(this.alphaByName);
        const masterIngredientList = _(this.props.masterIngredientList)
            .keys()
            .map((ingredientKey) => {
                const cloned = {'value': _.clone(this.props.masterIngredientList[ingredientKey].name)};
                cloned.key = ingredientKey;
                return cloned;
            })
            .value().sort(this.alphaByName);
        return (
            <div className="recipe-wrapper">
                <Paper className="console-adders">
                    <form onSubmit={this.handleSubmit}>

                        <TextField fullWidth={true}
                                   hintText="Add a recipe title"
                                   type="text"
                                   floatingLabelText="Recipe Title"
                                   value={this.state.recipeTitle}
                                   onChange={this.handleTitleChange}/>
                        <div className="recipe-details">
                            <Tabs>
                                <Tab label="Details">
                                    <TextField hintText="Show off this drink with an image!"
                                               type="url"
                                               floatingLabelText="Image source"
                                               value={this.state.imgUrl}
                                               onChange={this.handleImageChange}
                                    />
                                    <br/>
                                    <TextField hintText="Whose recipe is this?"
                                               type="text"
                                               floatingLabelText="Author name(s)"
                                               value={this.state.author}
                                               onChange={this.handleAuthorChange}
                                    />
                                    <br/>
                                    <TextField hintText="Link to the original source?"
                                               type="url"
                                               floatingLabelText="Recipe source"
                                               value={this.state.source}
                                               onChange={this.handleSourceChange}
                                    />
                                </Tab>
                                <Tab label="Ingredients">
                                    <TextField fullWidth={false}
                                               className="ingredient-amount"
                                               hintText="Amount"
                                               type="number"
                                               value={this.state.amount}
                                               onChange={this.handleAmountChange}/>
                                    <br/>
                                    <AutoComplete
                                        hintText='Unit'
                                        dataSource={masterUnitList}
                                        dataSourceConfig={dataSourceConfig}
                                        searchText={this.state.unitSearchText}
                                        filter={AutoComplete.fuzzyFilter}
                                        onNewRequest={this.handleUnitChange}
                                        onUpdateInput={this.handleUpdateUnitSearch}
                                    />
                                    <br/>

                                    <AutoComplete
                                        className="ingredient-name"
                                        hintText='Ingredient'
                                        dataSource={masterIngredientList}
                                        dataSourceConfig={dataSourceConfig}
                                        searchText={this.state.ingredientSearchText}
                                        filter={AutoComplete.fuzzyFilter}
                                        onNewRequest={this.handleIngredientChange}
                                        onUpdateInput={this.handleUpdateIngredientSearch}
                                    />
                                    <br/>
                                    <RaisedButton className="ingredient-submit-button" label="Add Ingredient"
                                                  primary={true}
                                                  onClick={this.handleNewIngredient}
                                                  disabled={
                                                      this.state.currentIngredient.key === '' ||
                                                      this.state.currentIngredient.name === ''
                                                  }/>
                                </Tab>
                                <Tab label="Steps">
                                    <TextField className="step-text" fullWidth={false}
                                               hintText="Add a step"
                                               type="text"
                                               value={this.state.newStep}
                                               onChange={this.handleStepChange}/>
                                    <br/>
                                    <RaisedButton className="step-submit-button"
                                                  primary={true}
                                                  label="Add step"
                                                  onClick={this.handleNewStep}
                                                  disabled={this.state.newStep === '' }/>
                                </Tab>
                            </Tabs>
                        </div>
                    </form>
                    <RaisedButton label="Submit New Recipe" fullWidth={true}
                                  secondary={true}
                                  onClick={this.handleSubmit}
                                  disabled={this.state.ingredientList.length < 1 ||
                                  this.state.stepsList.length < 1 ||
                                  this.state.recipeTitle === ''}/>

                </Paper>
                <div>
                    <h2>Recipe Preview</h2>
                    <RecipeTemplate title={this.state.recipeTitle} ingredients={this.state.ingredientList}
                                    steps={this.state.stepsList} description={this.state.description} editing={true}
                                    removeItem={this.handleRemoveItem} imgUrl={this.state.imgUrl}
                                    authorName={this.state.author} source={this.state.source}
                                    masterUnits={this.props.masterUnitList}
                                    masterIngredients={this.props.masterIngredientList}
                                    masterTags={this.props.masterTagList}/>
                </div>
            </div>
        );
    }
});

export default RecipeAdder;
