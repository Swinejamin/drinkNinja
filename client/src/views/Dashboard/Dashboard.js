import React from 'react';
import {auth, database} from '../../config/database'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
// import CircularProgress from 'material-ui/CircularProgress';

import IngredientFinder from '../../components/Ingredients/IngredientFinder';
import RecipeBrowser from '../../components/Recipes/RecipeBrowser';
import './dashboard.scss';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            uid: '0',
            ingredients: {},
            masterIngredients: {},
            loadingRecipes: 'loading',
            loading: 'loading',
            loadingUser: true,
            recipes: {},
            featuredTags: []
        };
        this.clickIngredient = this.clickIngredient.bind(this);
        // this.removeTag = this.removeTag.bind(this);
    }

    componentWillMount() {
        const comp = this;
        this.setState({
            uid: auth && auth.currentUser ? auth.currentUser.uid : null
        });
        database.ref('ingredients').on('value', (snap) => {
            comp.setState({
                masterIngredients: snap.val() ? snap.val() : {}
            });
        });


    }

    componentDidMount() {
        const comp = this;
        database.ref(`users/${auth.currentUser.uid}/ingredients`).on('value', (snap) => {
            comp.setState({
                ingredients: snap.val() ? snap.val() : {},
                loadingUser: false
            });
        })
    }

    clickIngredient(ingredient) {
        const target = database.ref(`users/${this.state.uid}/ingredients/${ingredient.key}/isFeatured`);
        target.set(!ingredient.value.isFeatured);
    }







    render() {
        return (
            <main className="dashboard__main">
                <div>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="Your cabinet"/>
                        </ToolbarGroup>
                    </Toolbar>
                    <IngredientFinder id="IngredientFinder" masterIngredients={this.state.masterIngredients}
                                      userList={Object.keys(this.state.ingredients)}
                                      addIngredient={this.handleAddIngredient}
                                      searchHintText="Add ingredients to your cabinet"
                                      listHeader='Your current ingredients' uid={this.state.uid}
                                      click={this.clickIngredient}
                                      remove={this.removeTag} loadingUser={this.state.loadingUser}/>

                </div>
                <div>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="Available recipes"/>
                        </ToolbarGroup>
                    </Toolbar>

                    <RecipeBrowser recipes={database.ref(`recipes`)} featured={this.state.featuredTags}
                                   userIngredients={database.ref(`users/${this.state.uid}/ingredients`)}/>
                </div>
            </main>
        );
    }
}

export default Dashboard;
