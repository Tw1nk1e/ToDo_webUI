import { action, observable, runInAction } from 'mobx';
import {createCategory, deleteCategory, getCategories} from "../../services/CategoryService/CategoryService";
import Category from "../../models/Category";

export class CategoryStore {

  @observable isLoading: boolean = false;
  @observable activeCategory: Category | null = null;
  @observable categories: Category[] = [];

  @action loadCategories = () => {
    this.isLoading = true;
    return getCategories()
      .then((response) => runInAction(() => {
        this.categories = response.getCategories;
        if (this.categories.length) {
          this.activeCategory = this.categories[0];
        } else {
          this.addCategory('Your first list')
        }
        this.isLoading = false;
        return this.categories;
      }))
  };

  @action addCategory = (name: string) => {
    this.isLoading = true;
    return createCategory(name)
      .then(() => runInAction(() => {
        this.loadCategories();
        this.isLoading = false;
      }))
  };

  @action removeCategory = () => {
    this.isLoading = true;

    if (this.activeCategory) {
      return deleteCategory(this.activeCategory.id)
        .then(() => runInAction(() => {
          this.loadCategories();
          this.isLoading = false;
        }))
    }
  };
}

export default new CategoryStore()