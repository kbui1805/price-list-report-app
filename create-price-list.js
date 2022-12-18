const fs = require('fs');
// const pdfDocument = require('pdfkit');
const csv = require('csvtojson');

const MYITEMLIST = './data-item-list/My_Items.csv';

const DATA_P0 = './data-price/P0/PriceList_SC0.csv';
const DATA_P1 = './data-price/P1/PriceList_AT1.csv';

async function main() {

    // read csv from data-price
    const PRICELIST_P0 = await csv().fromFile(DATA_P0);
    const PRICELIST_P1 = await csv().fromFile(DATA_P1);

    //read csv from required items
    const my_List = await csv().fromFile(MYITEMLIST);

    // create array to hold all product objects
    const main_list_P0 = createMainItemList(PRICELIST_P0);
    const main_list_P1 = createMainItemList(PRICELIST_P1);

    const matching_list = createMatchingPriceList(my_List, [main_list_P0, main_list_P1]);

    // console.table(main_list_P0[3]);
    console.log(matching_list);
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

// read from data item list and create array to hold all item need for price list

function createMatchingPriceList(my_Item_List, data_Price_List) {
    let matching_Price_List = [];
    my_Item_List.map(my_item => {
        // let new_item_list = [];
        let new_item = {};
        //for each matching item, generate an item list
        data_Price_List.forEach((original_price_list, index) => {
            let price_region = `Price_List_${index}`;
            let sorted_list = original_price_list.filter(original_item => original_item['Item'] == my_item['item']);
            sorted_list.map(sorted_list_item => {
                new_item.Item = sorted_list_item.Item;
                new_item.Description = sorted_list_item.Description;
                new_item.Brand = sorted_list_item.Brand;
                new_item.Packaging = sorted_list_item.Packaging;
                new_item.Weight = sorted_list_item.Weight;
                new_item.Volume = sorted_list_item.Volume;
                new_item.Price_Break = sorted_list_item.Price_Break;
                new_item[price_region] = sorted_list_item.Price_List;
            });
        });

        matching_Price_List.push(new_item);
        
    });
    return matching_Price_List;
}
// loop through array item list and create new array to hold all required object items

main();