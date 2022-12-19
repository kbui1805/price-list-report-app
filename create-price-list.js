import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fs = require('fs'); 
const date = require('date-and-time');
const path = require('path');
// const pdfDocument = require('pdfkit');
const csv = require('csvtojson');
import { parse } from 'json2csv';

const MYITEMLIST = './data-item-list/My_Items.csv';

// const DATA_P0 = './data-price/P0/PriceList_SC0.csv';
// const DATA_P1 = './data-price/P1/PriceList_AT1.csv';

const RAW_DATA_LIST_PARAM = ['P0'];
const CLI_PARAM = process.argv.slice(2);
CLI_PARAM.forEach(arg_i => {
    RAW_DATA_LIST_PARAM.push(arg_i.toUpperCase());
});

// console.log(getRawPriceFile(RAW_DATA_LIST_PARAM[0]));


//get filename base on global argv
function getRawPriceFile(dirname) {
    let result_path = '';
    const directoryPath = path.join('./data-price', dirname);
    //passsing directoryPath and callback function
    let fileObjs = fs.readdirSync(directoryPath);
    fileObjs.forEach(f => {
        result_path = `./${path.join(directoryPath, f)}`;
    });
    return result_path;
}

async function main(raw_data_list) {

    // const ALL_PRICE_LIST = [];
    // await raw_data_list.forEach( async (needed_list) => {
    //     let fileName = getRawPriceFile(needed_list);
    //     // console.log(fileName);
    //     const list_price_from_csv = createMainItemList(await csv().fromFile(fileName));
    //     // console.log(list_price_from_csv);
    //     ALL_PRICE_LIST.push(list_price_from_csv);
    // })
    // console.log(ALL_PRICE_LIST);

    // async function getAllPriceList() {
    //     // const ALL_PRICE_LIST = [];
    //     await raw_data_list.forEach( async (needed_list) => {
    //         let fileName = getRawPriceFile(needed_list);
    //         // console.log(fileName);
    //         const list_price_from_csv = createMainItemList(await csv().fromFile(fileName));
    //         // console.log(list_price_from_csv);
    //         return list_price_from_csv;
    //     })
    //     // return ALL_PRICE_LIST;
    // }

    // const ALL_P_LIST = await getAllPriceList();

    // read csv from data-price
    // const PRICELIST_P0 = await csv().fromFile(DATA_P0);
    // const PRICELIST_P1 = await csv().fromFile(DATA_P1);
    // let path1 = getRawPriceFile(raw_data_list[0]);
    // let path2 = getRawPriceFile(raw_data_list[1]);

    

    // const list_price_from_csv_1 = createMainItemList(await csv().fromFile(path1));
    // const list_price_from_csv_2 = createMainItemList(await csv().fromFile(path2));

    // // const ALL_P_LIST = [list_price_from_csv_1, list_price_from_csv_2];
    // const ALL_P_LIST = [list_price_from_csv_1];
    // console.log(ALL_P_LIST);
    // //read csv from required items
    

    // create array to hold all product objects
    // const main_list_P0 = createMainItemList(PRICELIST_P0);
    // const main_list_P1 = createMainItemList(PRICELIST_P1);

    // const matching_list = createMatchingPriceList(my_List, ALL_P_LIST);

    // const csvPriceList = createCsvPriceList(matching_list, raw_data_list.length);

    // exportCsv(csvPriceList);
    // console.table(main_list_P0[3]);
    // console.log(matching_list);
    // console.log(csvPriceList);
    const my_List = await csv().fromFile(MYITEMLIST);

    let path0 = getRawPriceFile(raw_data_list[0]);
    let path1;
    let path2;
    let path3;
    let path4;

    let list_price_from_csv_0;
    let list_price_from_csv_1;
    let list_price_from_csv_2;
    let list_price_from_csv_3;
    let list_price_from_csv_4;

    let ALL_P_LIST;
    let matching_list;
    let csvPriceList;
    switch(raw_data_list.length) {
        case 1:
            // path0 = getRawPriceFile(raw_data_list[0]);
            list_price_from_csv_0 = createMainItemList(await csv().fromFile(path0));
            ALL_P_LIST = [list_price_from_csv_0];
            console.log(ALL_P_LIST);

            matching_list = createMatchingPriceList(my_List, ALL_P_LIST);
            csvPriceList = createCsvPriceList(matching_list, raw_data_list.length);
            exportCsv(csvPriceList);
            break;
        case 2:
            path1 = getRawPriceFile(raw_data_list[1]);

            list_price_from_csv_0 = createMainItemList(await csv().fromFile(path0));
            list_price_from_csv_1 = createMainItemList(await csv().fromFile(path1));
            ALL_P_LIST = [list_price_from_csv_0, list_price_from_csv_1];

            matching_list = createMatchingPriceList(my_List, ALL_P_LIST);
            csvPriceList = createCsvPriceList(matching_list, raw_data_list.length);
            exportCsv(csvPriceList);
            break;
        case 3:
            path1 = getRawPriceFile(raw_data_list[1]);
            path2 = getRawPriceFile(raw_data_list[2]);

            list_price_from_csv_0 = createMainItemList(await csv().fromFile(path0));
            list_price_from_csv_1 = createMainItemList(await csv().fromFile(path1));
            list_price_from_csv_2 = createMainItemList(await csv().fromFile(path2));
            ALL_P_LIST = [list_price_from_csv_0, list_price_from_csv_1, list_price_from_csv_2];

            matching_list = createMatchingPriceList(my_List, ALL_P_LIST);
            csvPriceList = createCsvPriceList(matching_list, raw_data_list.length);
            break;
        case 4:
            path1 = getRawPriceFile(raw_data_list[1]);
            path2 = getRawPriceFile(raw_data_list[2]);
            path3 = getRawPriceFile(raw_data_list[3]);

            list_price_from_csv_0 = createMainItemList(await csv().fromFile(path0));
            list_price_from_csv_1 = createMainItemList(await csv().fromFile(path1));
            list_price_from_csv_2 = createMainItemList(await csv().fromFile(path2));
            list_price_from_csv_3 = createMainItemList(await csv().fromFile(path3));
            ALL_P_LIST = [list_price_from_csv_0, list_price_from_csv_1, list_price_from_csv_2, list_price_from_csv_3];

            matching_list = createMatchingPriceList(my_List, ALL_P_LIST);
            csvPriceList = createCsvPriceList(matching_list, raw_data_list.length);
            break;
        case 5:
            path1 = getRawPriceFile(raw_data_list[1]);
            path2 = getRawPriceFile(raw_data_list[2]);
            path3 = getRawPriceFile(raw_data_list[3]);
            path4 = getRawPriceFile(raw_data_list[4]);

            list_price_from_csv_0 = createMainItemList(await csv().fromFile(path0));
            list_price_from_csv_1 = createMainItemList(await csv().fromFile(path1));
            list_price_from_csv_2 = createMainItemList(await csv().fromFile(path2));
            list_price_from_csv_3 = createMainItemList(await csv().fromFile(path3));
            list_price_from_csv_4 = createMainItemList(await csv().fromFile(path4));
            ALL_P_LIST = [list_price_from_csv_0, list_price_from_csv_1, list_price_from_csv_2, list_price_from_csv_3, list_price_from_csv_4];

            matching_list = createMatchingPriceList(my_List, ALL_P_LIST);
            csvPriceList = createCsvPriceList(matching_list, raw_data_list.length);
            break;
        default:
            console.log('Must use less than 6 raw price files');
    }
    
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
            new_item['Price_Break'].push('1');
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
//create csv file from new created matching array of required items
function createCsvPriceList(matching_pList, priceList_quantity) {
    let csvPriceList = [];
    matching_pList.forEach(item => {
        let focus_item = item;
        item['Price_Break'].forEach((p_break, p_break_index) => {
            if(p_break_index > 0) {
                let new_price_break_item = 
                {
                    Item: '',
                    Description: '',
                    Brand: '',
                    Packaging: '',
                    Quantity: p_break
                };
                for (let i = 0; i < priceList_quantity; i ++) {
                    let header = `P${i}`;
                    let current_header = `Price_List_${i}`;
                    new_price_break_item[header] = focus_item[current_header][p_break_index];
                }
                csvPriceList.push(new_price_break_item);
            } else {
                let new_price_break_item = {};
                new_price_break_item.Item = focus_item.Item;
                new_price_break_item.Description = focus_item.Description;
                new_price_break_item.Brand = focus_item.Brand;
                new_price_break_item.Packaging = focus_item.Packaging;
                new_price_break_item.Quantity = 1;

                for (let i = 0; i < priceList_quantity; i ++) {
                    let header = `P${i}`;
                    let current_header = `Price_List_${i}`;
                    // console.log(focus_item);
                    new_price_break_item[header] = focus_item[current_header][p_break_index];
                }
                csvPriceList.push(new_price_break_item);

            }
        });
    });
    const csv = parse(csvPriceList);
    console.table(csvPriceList);
    return csv;

}

//export csv to fs

function exportCsv(csv) {
    //get datetime for file name
    const now = new Date();
    let current_date_time = date.format(now, 'MM-DD-YY_HH-mm');

    const filedir = `./export/csv/Price_List_${current_date_time}.csv`;
    fs.writeFileSync(filedir, csv);
    
}


main(RAW_DATA_LIST_PARAM);