import { element, by, ElementFinder } from 'protractor';

export class OrderComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-order div table .btn-danger'));
  title = element.all(by.css('jhi-order div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class OrderUpdatePage {
  pageTitle = element(by.id('jhi-order-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  orderStateSelect = element(by.id('field_orderState'));
  deliveryTimeInput = element(by.id('field_deliveryTime'));

  restaurantSelect = element(by.id('field_restaurant'));
  userSelect = element(by.id('field_user'));
  paymentSelect = element(by.id('field_payment'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setOrderStateSelect(orderState: string): Promise<void> {
    await this.orderStateSelect.sendKeys(orderState);
  }

  async getOrderStateSelect(): Promise<string> {
    return await this.orderStateSelect.element(by.css('option:checked')).getText();
  }

  async orderStateSelectLastOption(): Promise<void> {
    await this.orderStateSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setDeliveryTimeInput(deliveryTime: string): Promise<void> {
    await this.deliveryTimeInput.sendKeys(deliveryTime);
  }

  async getDeliveryTimeInput(): Promise<string> {
    return await this.deliveryTimeInput.getAttribute('value');
  }

  async restaurantSelectLastOption(): Promise<void> {
    await this.restaurantSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async restaurantSelectOption(option: string): Promise<void> {
    await this.restaurantSelect.sendKeys(option);
  }

  getRestaurantSelect(): ElementFinder {
    return this.restaurantSelect;
  }

  async getRestaurantSelectedOption(): Promise<string> {
    return await this.restaurantSelect.element(by.css('option:checked')).getText();
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
  }

  async paymentSelectLastOption(): Promise<void> {
    await this.paymentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async paymentSelectOption(option: string): Promise<void> {
    await this.paymentSelect.sendKeys(option);
  }

  getPaymentSelect(): ElementFinder {
    return this.paymentSelect;
  }

  async getPaymentSelectedOption(): Promise<string> {
    return await this.paymentSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class OrderDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-order-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-order'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
