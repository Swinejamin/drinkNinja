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

        if (this.props.type === 'ingredient') {
            const unit = this.props.content.unit;
            const ingredient = this.props.content.ingredient;
            return (
                <ListItem itemProp="recipeIngredient"
                          rightIconButton={ (editing ?
                                  () => (
                                      <IconButton
                                          touch={true}
                                          tooltip="remove"
                                          tooltipPosition="bottom-right"
                                          onClick={this.handleRemoveItem}
                                          disabled={disabled}
                                      >
                                          <ActionDelete />
                                      </IconButton>
                                  ) :
                                  () => {
                                      return;
                                  }
                          )()}>
                    <span>{this.props.content.amount} </span>
                    <span>{this.props.content.amount > 1 ? this.state.masterUnits[unit].plural : this.state.masterUnits[unit].single} </span>
                    <span>{this.state.masterIngredients[ingredient].name}</span>
                </ListItem> );
        } else {
            return (
                <ListItem itemProp="recipeInstructions"
                          rightIconButton={
                              <IconButton
                                  touch={true}
                                  tooltip="remove"
                                  tooltipPosition="bottom-right"
                                  onClick={this.handleRemoveItem}
                                  disabled={disabled}
                              >
                                  <ActionDelete />
                              </IconButton>}>
                    <span>{this.props.content.text} </span>
                </ListItem>
            );
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
