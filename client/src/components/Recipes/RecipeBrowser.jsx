import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {database} from '../../config/database'

class RecipeBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {},
            masterRecipes: [],
            potentialRecipes: []
        };
    }

    checkfeatured(recipe) {
        console.log(recipe)
        // const ingredient = recipe.ingredientList.map((ing) => {
        //     return this.props.userIngredients[ing.ingredient].isFeatured;
        // });
        // TODO uncomment when tags are added to recipes
        // const tag = recipe.value.tagList.some((tg)=>{
        //     return tg.isFeatured;
        // });
        // return (ingredient);
    }

    componentWillMount() {
        // this.bindAsArray(this.props.recipes, "recipes");
        const comp = this;
        this.props.recipes.on('value', (snap) => {
            this.setState({
                masterRecipes: Object.entries(snap.val())
            });
        });

        database.ref(`users/${this.props.uid}/ingredients`).on('value', (snap) => {
            const list = snap.val();
            const keys = list ? Object.keys(list) : [];
            let potentials = [];
            keys.map((ingredient) => (
                database.ref(`ingredients/${ingredient}`).on('value', (snap) => {
                    return snap.val().recipes.map((recipe) => (
                        potentials.push(recipe)
                    ))
                })
            ));
            let seen = {};
            potentials = potentials.filter((el, ind, arr) => {
                return seen.hasOwnProperty(el) ? false : (seen[el] = true);
            });
            comp.setState({
                ingredients: list,
                potentialRecipes: potentials
            })
        })
    }

    render() {
        return (
            <GridList cols={2} padding={15} cellHeight={400} style={{paddingTop: 15}}>
                {this.state.potentialRecipes.length > 0 ?
                    this.state.potentialRecipes.map((recipe, index) => {
                            let data;
                            database.ref(`recipes/${recipe}`).on('value', (snap) => {
                                data = snap.val();
                                data.key = recipe;
                                console.log(data);
                            });
                            const featured = 0;
                            const key = recipe.key;

                            return (
                                <GridTile title={data.title}
                                          key={data.key} titlePosition="top"
                                          containerElement={<Link to={`recipe/${data.key}`}/>}
                                          rows={featured ? 2 : 1} cols={featured ? 2 : 1}
                                          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
                                    <img alt="" src={data.imgUrl || '/images/dnLogo.png'}/>
                                </GridTile>
                            );
                        }
                    ) :
                    null
                }
            </GridList>
        );
    }
}
RecipeBrowser.propTypes = {
    recipes: PropTypes.object.isRequired,
    userIngredients: PropTypes.object.isRequired
};
export default RecipeBrowser;