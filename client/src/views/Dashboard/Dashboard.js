import React from 'react';
import {auth, database} from '../../config/database'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import CircularProgress from 'material-ui/CircularProgress';

// import IngredientFinder from '../../components/Ingredients/IngredientFinder';
import RecipeBrowser from '../../components/Recipes/RecipeBrowser';
import './dashboard.scss';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            uid: 0,
            ingredients: {},
            masterIngredients: {},
            loadingRecipes: 'loading',
            loading: 'loading',
            recipes: {},
            featuredTags: []
        };
    }

    componentWillMount() {
        this.setState({
            uid: auth && auth.currentUser ? auth.currentUser.uid : null
        });

    }


    clickIngredient(ingredient) {
        const target = database.ref(`users/${this.state.uid}/ingredients/${ingredient.key}/isFeatured`);
        target.set(!ingredient.value.isFeatured);
    }

    handleAddIngredient(newIngredient) {
        console.log(newIngredient);
        const key = newIngredient.key;
        const data = {};
        data[key['name']] = newIngredient.value;
        database.update(`users/${this.state.uid}/ingredients/${key}`, {
                data: {
                    'name': newIngredient.value
                }
            }
        )
        ;
    }


    removeTag(tag) {
        const targetStr = `users/${this.state.uid}/ingredients/${tag.key}`;
        const target = database.ref(targetStr);
        target.remove();
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
                        {this.props.loadingUser ? (<CircularProgress size={5}/>) : (
                                null
                            )}
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
