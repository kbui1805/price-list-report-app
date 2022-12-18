const fs = require('fs');
// const pdfDocument = require('pdfkit');
const csv = require('csvtojson');

// read csv from data-price

const DATA_P0 = './data-price/P0/PriceList_SC0.csv';
const DATA_P1 = './data-price/P1/PriceList_AT1.csv';

async function readPriceList() {
    const PRICELIST_P0 = await csv().fromFile(DATA_P0);
    const PRICELIST_P1 = await csv().fromFile(DATA_P1);

    const main_list_P0 = createMainItemList(PRICELIST_P0);
    console.log(main_list_P0);
}
// create object for each entry

function createMainItemList(price_list) {
    let main_list = [];
    let appendPriceBreak = (main_item_list, empty_entry) => {
        main_item_list[main_item_list.length - 1]['Price_Break'].push(empty_entry['Qty Break']);
        main_item_list[main_item_list.length - 1]['Price_List'].push(empty_entry['Price']);
    };

    price_list.forEach((item, index) => {
        let new_item = {};
        if(item['Item'].length == 8) {
            new_item = item;
            new_item['Price_Break'] = [];
            new_item['Price_List'] = [];
            new_item['Price_Break'].push(item['Qty Break']);
            new_item['Price_List'].push(item['Price']);
            main_list.push(new_item);
        } 
        else if(item['Item'].length == 0) {
            appendPriceBreak(main_list, item);
        } else {
            return;
        }
        
    });
    return main_list;
}
// create array to hold all product objects
// read from data item list and create array to hold all item need for price list
// loop through array item list and create new array to hold all required object items

readPriceList();