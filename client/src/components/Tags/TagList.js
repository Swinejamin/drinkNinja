import React from 'react';
import PropTypes from 'prop-types';
import IngredientTag from './IngredientTag.js';
import CircularProgress from 'material-ui/CircularProgress';

class TagList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            ingredients: {}
        };
    }

    render() {
        let ingredients = Object.keys(this.props.listSource)
            .map((ingredientKey) => {
                const cloned = {'value': this.props.listSource[ingredientKey]};
                cloned.key = ingredientKey;
                return cloned;
            })
            .value();

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

        const removeTag = this.props.remove;
        const click = this.props.click;
        return (
            <div className="chip-wrapper">
                {this.props.loading ? <CircularProgress size={1}/> : ingredients.map((tagContent, index) => { // TODO: figure out if this loading check is still needed???
                    return (<IngredientTag remove={removeTag} click={click} key={index} content={tagContent}
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
    loading: PropTypes.bool.isRequired
    // listHeader: React.PropTypes.string.isRequired
};
export default TagList;