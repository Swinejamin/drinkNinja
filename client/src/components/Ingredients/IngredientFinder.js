import React from'react';
import AutoComplete from 'material-ui/AutoComplete';
// import TagList from '../Tags/TagList';
import PropTypes from 'prop-types';
const dataSourceConfig = {
    text: 'value',
    value: 'key',
};

class IngredientFinder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''

        };
    }

    handleNameChange(e) {
        this.setState({ingredientName: e.target.value});
    }

    handleTypeChange(e) {
        this.setState({ingredientType: e.target.value});
    }

    handleNewIngredient(value) {
        this.props.addIngredient(value);
        this.setState({
            searchText: ''
        });
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
        console.dir(masterList);
        let testing = masterList
            // .map((ingredientKey) => {
            //     const cloned = {'value': this.props.masterIngredients[ingredientKey].name};
            //     cloned.key = ingredientKey;
            //     return cloned;
            // })
            // .sort(this.alphaByName);
        console.dir(testing);
        let userList = Object.keys(this.props.userList)
            .map((ingredientKey) => {
                const cloned = {'value': this.props.userList[ingredientKey].name};
                cloned.key = ingredientKey;
                return cloned;
            });

        masterList = masterList.filter((ingredient) => {
            return userList.filter((current_user) => {
                    return current_user.value === ingredient.value && current_user.key === ingredient.key;
                }).length === 0;
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
                {/*<TagListBuilder listSource={this.props.userList}*/}
                {/*click={this.props.click}*/}
                {/*remove={this.handleDelete}*/}
                {/*listHeader={this.props.listHeader} masterList={this.props.masterList}*/}
                {/*loading={this.props.loadingUser}/>*/}
            </div>
        );
    }
}
IngredientFinder.propTypes = {
    masterIngredients: PropTypes.object.isRequired,
    userList: PropTypes.object.isRequired,
    addIngredient: PropTypes.func.isRequired,
    searchHintText: PropTypes.string.isRequired,
    remove: PropTypes.func.isRequired,
    // loadingUser: PropTypes.bool.isRequired
};

export default IngredientFinder;
