import React, {Component} from 'react';
import {Button, Form, Grid, Header, Input, List, Popup} from "semantic-ui-react";
import {styles} from "./styles";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import {observer} from "mobx-react";
import {observable} from "mobx";
import Category from "../models/Category";
import {Item} from "./ListItem";
import Task from "../models/Task";
import {TaskStore} from "../stores/TaskStore/TaskStore";
import {CategoryStore} from "../stores/CategoryStore/CategoryStore";

interface Props {
  tasks: Task [];
  taskStore: TaskStore,
  categoryStore: CategoryStore,
  activeCategory: Category | null,
}

@observer
class TasksList extends Component<Props> {
  @observable newTaskValue: string = '';
  @observable inputActive: boolean = false;

  componentDidMount() {
    if (this.props.activeCategory) {
      this.props.taskStore.loadTasksByCategory(this.props.activeCategory.id)
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (this.props.activeCategory && prevProps.tasks === this.props.tasks) {
      this.props.taskStore.loadTasksByCategory(this.props.activeCategory.id)
    }
  }

  submit = () => {
    if (this.newTaskValue.length !== 0 && this.props.activeCategory) {
      this.props.taskStore.add(this.newTaskValue, this.props.activeCategory.id);
      this.newTaskValue = '';
    }
    this.inputActive = false;
  };

  removeCategory = () => {
    if (this.props.categoryStore.categories.length > 1) {
      this.props.categoryStore.removeCategory();
    }

  };

  render() {
    return (
      <Grid.Column stretched width={13} style={styles.listColumn}>
        <div className={'header-list'}>
          <Header size={"huge"} style={styles.headerText}>
            {this.props.activeCategory && this.props.activeCategory.name}
          </Header>
          <Popup content='You cannot delete a single category'
                 disabled={this.props.categoryStore.categories.length !== 1}
                 trigger={ <Icon size={"big"} className={'trash'}
                                 onClick={this.removeCategory}
                                 name={'trash alternate outline'}/> }
          />
        </div>
        <List divided verticalAlign={"middle"} style={{ marginTop: 0 }}>
          { this.props.tasks.map((item, index) => {
            return Item(item, index, this.props.taskStore.changeTaskStatus, this.props.taskStore.deleteTask )
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
    );
  }
}

export default TasksList;