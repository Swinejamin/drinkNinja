import React from 'react';
import {ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
// import RefreshIndicator from 'material-ui/RefreshIndicator';
// import database from '../../config/database'
import PropTypes from 'prop-types';

class RecipeListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            loaded: false
        }
    }

    handleRemoveItem(e) {
        e.preventDefault();
        this.props.removeItem(this.props.index);
    }

    componentDidMount() {
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
            let text = '';
            if(this.props.content.amount > 1){
                const amt = this.props.content.amount;
                const pl = this.props.masterUnits[unit].plural;
                const nm = this.props.masterIngredients[ingredient].name;
                text = `${amt} ${pl} ${nm}`;
            } else {
                const amt = this.props.content.amount;
                const pl = this.props.masterUnits[unit].single;
                const nm = this.props.masterIngredients[ingredient].name;
                text = `${amt} ${pl} ${nm}`;
            }
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
    masterIngredients: PropTypes.object.isRequired,
    // masterTags: PropTypes.object.isRequired,
    masterUnits: PropTypes.object.isRequired,
};


export default RecipeListItem;
