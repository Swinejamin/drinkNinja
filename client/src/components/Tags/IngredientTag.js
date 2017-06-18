import React from 'react';
import Chip from 'material-ui/Chip';
import PropTypes from 'prop-types';
import {cyan500, grey400} from 'material-ui/styles/colors';

const styles = {
    chip: {
        margin: 4,
    },
};

class IngredientTag extends React.Component {

    click() {
        this.props.click(this.props.content);
    }

    removeTag() {
        this.props.remove(this.props.content);
        // firebase.database().ref(`users/${this.props.userRef}/ingredients`).child(this.props.content.key).remove();
    }

    render() {
        return (
            // TODO: add check for featured tags (from db?)
            <Chip style={styles.chip} backgroundColor={this.props.content.value.isFeatured ? cyan500 : grey400}
                  onTouchTap={this.click} onRequestDelete={this.removeTag.bind(this)}>
                {this.props.list[this.props.content.value].name}
            </Chip>
        );
    }
}
IngredientTag.PropTypes = {
    remove: PropTypes.func.isRequired,
    content: PropTypes.object.isRequired,
    click: PropTypes.func.isRequired,
    list: PropTypes.object.isRequired
};
export default IngredientTag;