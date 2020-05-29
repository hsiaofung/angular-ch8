import { Component, OnInit } from '@angular/core';
import { Stock } from '../../model/stock';
import { StockService } from '../../services/stock.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css'],
  providers: [MessageService],
})
export class CreateStockComponent {
  public stock: Stock;
  public confirmed = false;
  public message = null;
  public exchanges = ['NYSE', 'NASDAQ', 'OTHER'];
  constructor(
    private stockService: StockService,
    public messageService: MessageService
  ) {
    this.stock = new Stock('', '', 0, 0, 'NASDAQ');
    this.messageService.message = 'Component Level: Helloe Message Service';
  }

  setStockPrice(price) {
    this.stock.price = price;
    this.stock.previousPrice = price;
  }

  createStock(stockForm) {
    if (stockForm.valid) {
      let created = this.stockService.createStocks(this.stock);
      if (created) {
        this.messageService.message =
          'Successfully ceated stock with stock code: ' + this.stock.code;
        this.stock = new Stock('', '', 0, 0, 'NASDAQ');
      } else {
        this.messageService.message =
          'Stock with stock code: ' + this.stock.code + ' already exists';
      }
    } else {
      console.log('Stock form is in an invalid state');
    }
  }
}
