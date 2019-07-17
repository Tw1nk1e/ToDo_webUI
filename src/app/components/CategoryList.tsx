import React, {Component} from 'react';
import {Button, Form, Grid, Input, Menu} from "semantic-ui-react";
import {styles} from "./styles";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import {observer} from "mobx-react";
import {observable} from "mobx";
import Category from "../models/Category";
import {CategoryStore} from "../stores/CategoryStore/CategoryStore";

interface Props {
  categoriesList: Category [],
  categoryStore: CategoryStore
}

@observer
class CategoryList extends Component<Props> {
  @observable inputListActive: boolean = false;
  @observable newListValue: string = '';

  addCategory = () => {
    if (this.newListValue.length !== 0) {
      this.props.categoryStore.addCategory(this.newListValue);
      this.newListValue = '';
    }
    this.inputListActive = false;
  };

  selectCategories = (category: Category) => {
    this.props.categoryStore.activeCategory = category;
  };

  render() {
    return (
      <Grid.Column stretched width={3} style={styles.menuColumn}>
        <Menu fluid vertical pointing secondary>
          {this.props.categoriesList.map((i, index) => {
            return <Menu.Item name={i.name} key={index} onClick={() => this.selectCategories(i)}
                              active={this.props.categoryStore.activeCategory === i} icon/>
          })}
          {this.inputListActive
            ? <Form>
              <Form.Field inline>
                <Input fluid={ true } transparent={true} autoFocus value={this.newListValue} maxLength="20"
                       style={styles.listInput} onChange={(e, data) => this.newListValue = data.value}
                       onBlur={() => {this.inputListActive = false; this.newListValue = ''}}/>
                <Button onClick={this.addCategory} style={{ display: "none" }}/>
              </Form.Field>
            </Form>
            : <div onClick={() => this.inputListActive = true} style={styles.addListButton}>
              <Icon name={"add"} size={"large"} color={"blue"}/> New list
            </div>}
        </Menu>
      </Grid.Column>
    );
  }
}

export default CategoryList;