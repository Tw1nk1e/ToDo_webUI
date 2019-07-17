import * as React from "react";

import Task from "../models/Task";
import {List} from "semantic-ui-react";
import {styles} from "./styles";
import {Statuses} from "../models/Statuses";
import './styles.css';

export const Item = (
  item: Task,
  index: number,
  onChangeStatus: (task: Task) => void,
  onDeleteTask: (task: Task) => void
) => {
  const isDone: boolean = item.status === Statuses.DONE;

  return (
    <List.Item key={index} style={styles.listItem} className={'task'}>
      <List.Icon
        color={isDone ? 'green' : 'grey'}
        size={"large"}
        onClick={() => onChangeStatus(item)}
        name={isDone ? 'check circle outline' : 'circle outline'}
      />
      <List.Content style={styles.task}>
        <List.Description style={isDone ? styles.listItemDone : null}>{item.desc}</List.Description>
        <List.Icon
          size={"large"}
          className={'task-trash'}
          name={'trash alternate outline'}
          onClick={() => onDeleteTask(item)}
        />
      </List.Content>
    </List.Item>
  )
};