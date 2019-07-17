import { action, observable, runInAction } from 'mobx';
import {createCategory, deleteCategory, getCategories} from "../../services/CategoryService/CategoryService";
import Category from "../../models/Category";

export class CategoryStore {

  @observable isLoading: boolean = false;
  @observable categories: Category[] = [];
  @observable activeCategory: Category | null = null;

  @action loadCategories = () => {
    this.isLoading = true;
    return getCategories()
      .then((response) => runInAction(() => {
        if (!response.getCategories.length) this.addCategory('Your first list');
        this.categories = response.getCategories;
        this.isLoading = false;
      }))
  };

  @action setActiveCategory = () => {
    if (this.categories.length) this.activeCategory = this.categories[0]
  };

  @action addCategory = (name: string) => {
    this.isLoading = true;
    return createCategory(name)
      .then((response: Category) => runInAction(() => {
        this.loadCategories();
        this.activeCategory = response;
        this.isLoading = false;
      }))
  };

  @action removeCategory = () => {
    this.isLoading = true;

    if (this.activeCategory) {
      return deleteCategory(this.activeCategory.id)
        .then(() => runInAction(() => {
          this.loadCategories()
            .then(() => runInAction(() => {
              this.setActiveCategory()
            }));
          this.isLoading = false;
        }))
    }
  };
}

export default new CategoryStore()