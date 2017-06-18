import React from'react';
import AutoComplete from 'material-ui/AutoComplete';
import TagList from '../Tags/TagList';
import PropTypes from 'prop-types';
const dataSourceConfig = {
    text: 'value',
    value: 'key',
};
import {database} from '../../config/database';


class IngredientFinder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            ings: {},
            loading: true
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleNewIngredient = this.handleNewIngredient.bind(this);
        // this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdateInput = this.handleUpdateInput.bind(this);
    }

    componentDidMount() {
        this.setState({
            ings: this.props.masterIngredients,
        })
    }

    handleNameChange(e) {
        this.setState({ingredientName: e.target.value});
    }

    handleTypeChange(e) {
        this.setState({ingredientType: e.target.value});
    }

    handleNewIngredient(newIngredient) {
        console.log(newIngredient);
        const key = newIngredient.key;
        const value = newIngredient.value;
        const data = {};
        data[key] = value;
        database.ref(`users/${this.props.uid}/ingredients`).update(data);
        this.setState({
            searchText: ''
        });
    }

    handleAddIngredient(newIngredient) {

    }

    handleDelete(tag) {
        this.props.remove(tag);
    }


    handleUpdateInput(t) {
        this.setState({searchText: t});
    }


    alphaByName(a, b) {
        if (a.value < b.value) {
            return -1;
        }
        if (a.value > b.value) {
            return 1;
        }
        return 0;
    }


    render() {
        let masterList = Object.keys(this.props.masterIngredients);
        masterList = masterList
            .map((ingredientKey) => {
                const cloned = {'value': this.props.masterIngredients[ingredientKey].name};
                cloned.key = ingredientKey;
                return cloned;
            })
            .sort(this.alphaByName);
        // let userList = Object.keys(this.props.userList);

        masterList = masterList.filter((ingredient) => {
            // console.log(userList);
            return this.props.userList.indexOf(ingredient) < 0;
        });
        return (
            <div>
                <AutoComplete
                    hintText={this.props.searchHintText}
                    dataSource={masterList}
                    dataSourceConfig={dataSourceConfig}
                    searchText={this.state.searchText}
                    filter={AutoComplete.fuzzyFilter}
                    onNewRequest={this.handleNewIngredient}
                    onUpdateInput={this.handleUpdateInput}
                />
                {this.state.loadingUser ?
                    '' :
                    <TagList listSource={this.props.userList}
                             click={this.props.click}
                             remove={this.handleDelete} uid={this.props.uid}
                             listHeader={this.props.listHeader} masterList={this.props.masterIngredients}
                             loading={this.props.loadingUser}/>
                }
            </div>
        );
    }
}
IngredientFinder.propTypes = {
    masterIngredients: PropTypes.object.isRequired,
    userList: PropTypes.array.isRequired,
    // addIngredient: PropTypes.func.isRequired,
    searchHintText: PropTypes.string.isRequired,
    // remove: PropTypes.func.isRequired,
    loadingUser: PropTypes.bool.isRequired,
    uid: PropTypes.string.isRequired
};

export default IngredientFinder;
