import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class RecipeBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

    componentDidMount() {
        // this.bindAsArray(this.props.recipes, "recipes");
        this.props.recipes.on('value', (snap) => {
            this.setState({
                masterRecipes: Object.entries(snap.val())
            });
        })
    }

    render() {


        return (
            <GridList cols={2} padding={15} cellHeight={400} style={{paddingTop: 15}}>
                {this.state.masterRecipes.length > 0 ?
                    this.state.masterRecipes.map((recipe, index) => {
                            const featured = 0;
                            const key = recipe[0];
                            const value = recipe[1];
                            return (
                                <GridTile title={value.title}
                                          key={key} titlePosition="top"
                                          containerElement={<Link to={`recipe/${key}`}/>}
                                          rows={featured ? 2 : 1} cols={featured ? 2 : 1}
                                          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
                                    <img alt="" src={value.imgUrl || '/images/dnLogo.png'}/>
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