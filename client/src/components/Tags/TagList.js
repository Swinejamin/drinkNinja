import React from 'react';
import PropTypes from 'prop-types';
import IngredientTag from './IngredientTag.js';
import CircularProgress from 'material-ui/CircularProgress';
import {database} from '../../config/database';

class TagList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            ingredients: {}
        };
        this.removeTag = this.removeTag.bind(this);
    }

    removeTag(tag) {
        console.log(tag);
        const targetStr = `users/${this.props.uid}/ingredients/${tag.value}`;
        const target = database.ref(targetStr);
        target.remove()
            .then(function() {
                console.log("Remove succeeded.")
            })
            .catch(function(error) {
                console.log("Remove failed: " + error.message)
            });;
    }
    render() {
        let ingredients = Object.keys(this.props.listSource)
            .map((ingredientKey) => {
                const cloned = {'value': this.props.listSource[ingredientKey]};
                cloned.key = ingredientKey;
                return cloned;
            });

        function alphaByName(a, b) {
            if (a.value.name < b.value.name) {
                return -1;
            }
            if (a.value.name > b.value.name) {
                return 1;
            }
            return 0;
        }

        ingredients = ingredients.sort(alphaByName);

        const click = this.props.click;
        return (
            <div className="chip-wrapper">
                {this.props.loading ? <CircularProgress size={5}/> : ingredients.map((tagContent, index) => { // TODO: figure out if this loading check is still needed???
                    return (<IngredientTag remove={this.removeTag} click={click} key={index} content={tagContent}
                                           list={this.props.masterList}/>);
                })}
            </div>
        );
    }
}

TagList.PropTypes = {
    listSource: PropTypes.object.isRequired,
    masterList: PropTypes.object.isRequired,
    remove: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    uid: PropTypes.string.isRequired
    // listHeader: React.PropTypes.string.isRequired
};
export default TagList;