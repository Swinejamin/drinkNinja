import React from 'react';
import {ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
// import RefreshIndicator from 'material-ui/RefreshIndicator';
// import database from '../../config/database'
import PropTypes from 'prop-types';

class RecipeListItem extends React.Component {
    // constructor(props) {
    //     super(props);
    //
    // }

    handleRemoveItem(e) {
        e.preventDefault();
        this.props.removeItem(this.props.index);
    }

    componentWillMount() {
        this.setState({
            masterIngredients: this.props.masterIngredients,
            masterUnits: this.props.masterUnits
        });


    }

    render() {
        const disabled = this.props.ignore;
        const editing = this.props.editing;
        const rightBtn = (editing ?
                () => (
                    <IconButton
                        touch={true}
                        tooltip="remove"
                        tooltipPosition="bottom-right"
                        onClick={this.handleRemoveItem}
                        disabled={disabled}>
                        <ActionDelete />
                    </IconButton>
                ) :
                () => {

                    return null;
                }
        )()
            const ingredient = this.props.content.ingredient;
        if (this.props.type === 'ingredient') {
            const unit = this.props.content.unit;
            const text = `${this.props.content.amount} ${this.props.content.amount > 1 ? this.props.masterUnits[unit].plural : this.props.masterUnits[unit].single} ${this.state.masterIngredients[ingredient].name}`;
            return (
                <ListItem itemProp="recipeIngredient"
                          primaryText={text}
                          rightIconButton={ rightBtn}>

                </ListItem> );
        } else {
            const text = `${this.props.content.text}`;
            return (
                <ListItem itemProp="recipeInstructions"
                          primaryText={text}
                          rightIconButton={ rightBtn}>

                </ListItem>
            )
                ;
        }
    }
}
RecipeListItem.propTypes = {
    removeItem: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
    ignore: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    // masterIngredients: PropTypes.object.isRequired,
    // masterTags: PropTypes.object.isRequired,
    // masterUnits: PropTypes.object.isRequired,
};


export default RecipeListItem;
