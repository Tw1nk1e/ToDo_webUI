import * as React from "react";

import Task from "../models/Task";
import {List} from "semantic-ui-react";
import {styles} from "./styles";
import {Statuses} from "../models/Statuses";

export const Item = (item: Task, index: number, onChangeStatus: Function, onDeleteTask: Function) => {
  const isDone: boolean = item.status === Statuses.DONE;

  return (
    <List.Item key={index} style={styles.listItem}>
      <List.Icon
        color={isDone ? 'green' : 'grey'}
        size={"large"}
        onClick={() => onChangeStatus(item.id)}
        name={isDone ? 'check circle outline' : 'circle outline'}
      />
      <List.Content style={styles.task}>
        <List.Description style={isDone ? styles.listItemDone : null}>{item.desc}</List.Description>
        <List.Icon
          color={'red'}
          size={"large"}
          onClick={() => onDeleteTask(item.id)}
          name={'trash alternate outline'}
        />
      </List.Content>
    </List.Item>
  )
};