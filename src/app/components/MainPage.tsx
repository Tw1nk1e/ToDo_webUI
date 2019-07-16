import * as React from 'react'
import { observable } from 'mobx';
import { inject, observer } from "mobx-react";
import { Grid, GridRow, Menu, List, Input, Form, Button, Header } from 'semantic-ui-react';

import { CATEGORY_STORE, TASK_STORE } from "../constants/stores";
import { Item } from "./ListItem";
import { styles } from "./styles";
import { TaskStore } from "../stores/TaskStore/TaskStore";
import { CategoryStore } from "../stores/CategoryStore/CategoryStore";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import './styles.css';

interface Props {
  taskStore: TaskStore,
  categoryStore: CategoryStore
}

@inject(TASK_STORE, CATEGORY_STORE)
@observer
class MainPage extends React.Component<Props> {

  @observable inputActive: boolean = false;
  @observable inputListActive: boolean = false;
  @observable newTaskValue: string = '';
  @observable newListValue: string = '';

  componentDidMount(): void {
    this.props.taskStore.loadTasks();
    this.props.categoryStore.loadCategories();
  }

  submit = () => {
    if (this.newTaskValue.length !== 0 && this.props.categoryStore.activeCategory) {
      this.props.taskStore.add(this.newTaskValue, this.props.categoryStore.activeCategory.id);
      this.newTaskValue = '';
    }
    this.inputActive = false;
  };

  addCategory = () => {
    if (this.newListValue.length !== 0) {
      this.props.categoryStore.addCategory(this.newListValue);
      this.newListValue = '';
    }
    this.inputListActive = false;
  };

  render() {
    return (
      <>
        <Grid centered>
          <GridRow style={styles.container}>
            <Grid.Column stretched width={3} style={styles.menuColumn}>
              <Menu fluid vertical pointing secondary>
                {this.props.categoryStore.categories.map((i, index) => {
                  return <Menu.Item name={i.name} key={index}
                                    onClick={() => this.props.categoryStore.activeCategory = i}
                                    active={this.props.categoryStore.activeCategory === i}/>
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

            <Grid.Column stretched width={13} style={styles.listColumn}>
              <div className={'header-list'}>
                <Header size={"huge"} style={styles.headerText}>
                  {this.props.categoryStore.activeCategory && this.props.categoryStore.activeCategory.name}
                </Header>
                <Icon name={'trash alternate outline'} size={"big"} className={'trash'}
                      onClick={() => {}} />
              </div>
              <List divided verticalAlign={"middle"} style={{ marginTop: 0 }}>
                { this.props.taskStore.tasks.map((item, index) => {
                  if (this.props.categoryStore.activeCategory
                    && item.category === this.props.categoryStore.activeCategory.id) {
                    return Item(item, index, this.props.taskStore.changeTaskStatus, this.props.taskStore.deleteTask)
                  }
                  return null
                })}
                <List.Item style={styles.listItem}>
                  {!this.inputActive
                    ? <>
                        <List.Icon color={'blue'} name={'plus circle'} size={"large"}
                                   onClick={() => this.inputActive = true}/>
                        <List.Content>
                          <List.Description>New</List.Description>
                        </List.Content>
                      </>
                    : <List.Content style={{ width: '100%', paddingRight: 10 }}>
                        <Form>
                          <Form.Field inline>
                            <Input fluid={ true } autoFocus transparent={true} value={this.newTaskValue}
                                   style={{ border: 'none'}} maxLength="90"
                                   onBlur={() => {this.inputActive = false; this.newTaskValue = ''}}
                                   onChange={(e, data) => this.newTaskValue = data.value}/>
                            <Button onClick={this.submit} style={{ display: "none" }}/>
                          </Form.Field>
                        </Form>
                      </List.Content>
                  }
                </List.Item>
              </List>
            </Grid.Column>
          </GridRow>
        </Grid>
      </>
    );
  }
}

export default MainPage;
