import * as React from 'react'
import { inject, observer } from "mobx-react";
import { Grid, GridRow } from 'semantic-ui-react';

import { TaskStore } from "../stores/TaskStore/TaskStore";
import { CATEGORY_STORE, TASK_STORE } from "../constants/stores";
import { CategoryStore } from "../stores/CategoryStore/CategoryStore";

import TasksList from "./TasksList";
import CategoryList from "./CategoryList";

import './styles.css';
import { styles } from "./styles";

interface Props {
  taskStore: TaskStore,
  categoryStore: CategoryStore
}

@inject(TASK_STORE, CATEGORY_STORE)
@observer
class MainPage extends React.Component<Props> {

  componentDidMount(): void {
    this.props.categoryStore.loadCategories()
      .then(() => this.props.categoryStore.setActiveCategory());
  }

  render() {
    return (
      <Grid centered>
        <GridRow style={styles.container}>
          <CategoryList
            categoryStore={this.props.categoryStore}
            categoriesList={this.props.categoryStore.categories}/>
          <TasksList
            taskStore={this.props.taskStore}
            tasks={this.props.taskStore.tasks}
            categoryStore={this.props.categoryStore}
            activeCategory={this.props.categoryStore.activeCategory}/>
        </GridRow>
      </Grid>
    );
  }
}

export default MainPage;
