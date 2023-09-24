import React, { Component } from 'react'
import {
    CButton,
    CInputFile,
} from '@coreui/react'
import XLSX from 'xlsx'
import { saveAs } from 'file-saver';

export default class Diego extends Component {
    constructor(props){
        super(props);
        this.state = {
            list1: [],
            chosenListFile: []
        }
    }

    onUploadList = (e) => {
        this.setState({ 
            chosenListFile: e.target.files[0],
        })
    }

    onCargar = (e) => {
        const file = this.state.chosenListFile; 
        const reader = new FileReader();
        reader.onload = (evt) => {
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            this.processData(data);
        };
        reader.readAsBinaryString(file);
    }
    processData = (dataString) => {
        let list1 = []
        const dataStringLines = dataString.split(/\r\n|\n/);
        for (let i = 0; i<dataStringLines.length-1; i++){
            const row = dataStringLines[i].split(',');
            if(row[0]==='')break 
            list1.push(row);
            for(let j = 0; j<row.length; j++){
                list1[i][j] = parseInt(row[j])
            }
        }   
        this.setState({ list1: list1 })   
        
    }

    exportar = () => {
        this.exportToCSV(this.state.list1, 'problema dual');
    }

    s2ab(s) {
        if (typeof ArrayBuffer !== 'undefined') {
          const buf = new ArrayBuffer(s.length)
          const view = new Uint8Array(buf)
          for (let i = 0; i !== s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xFF
          }
          return buf
        } else {
          const buf = new Array(s.length)
          for (let i = 0; i !== s.length; ++i) {
            buf[i] = s.charCodeAt(i) & 0xFF
          }
          return buf
        }
    }

    exportToCSV = (list, fileName) => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        let cell_ref = 0;
        let count = 0;
        let len = list[0].length
        const ws = XLSX.utils.json_to_sheet([{}]);
        //nombres de variables
        let nombre = []
        for(let i=0; i<len; i++){
            nombre[i] = 'x' + (i+1)
        }
        let varba = []
        for(let i=0; i<list.length-1; i++){
            varba[i] = [nombre[len-list.length+i]]
        }
        while(1){
            let min = 0;
            let fila = -1
            
            for(let i = 1; i<list.length; i++){
                let num = list[i][len-1];
                if(num<min){
                    min = num
                    fila = i
                } 
            }
            console.log(fila)
            if(min >= 0) break
            min = -1000000
            let col = -1
            for(let i = 0; i<len; i++){
                let num = list[0][i]/list[fila][i]
                if(num > min && num < 0){
                    min = num
                    col = i
                }
            }
            
            let result = [['entra columna ' + nombre[col] + ' y sale fila ' + varba[fila-1]]]
            console.log(JSON.stringify(result))
            cell_ref = XLSX.utils.encode_cell({ c: 2, r: count*list.length+3*count });
            XLSX.utils.sheet_add_aoa(ws, [nombre], { origin: cell_ref });
            cell_ref = XLSX.utils.encode_cell({ c: 1, r: count*list.length+3*count+2 });
            XLSX.utils.sheet_add_aoa(ws, varba, { origin: cell_ref });
            cell_ref = XLSX.utils.encode_cell({ c: 2, r: count*list.length+3*count+1 }); 
            XLSX.utils.sheet_add_aoa(ws, list, { origin: cell_ref });
            cell_ref = XLSX.utils.encode_cell({ c: 3+len, r:count*list.length+3*count+1 }); 
            XLSX.utils.sheet_add_aoa(ws, result, { origin: cell_ref });
            const pivot = list[fila][col]
            for(let i = 0; i<len; i++){
                if(list[fila][i] !== 0)
                    list[fila][i] = list[fila][i]/pivot
            }
            for(let i = 0; i<list.length; i++){
                if(i !== fila){
                    let pivot2 = list[i][col]
                    let copia = list[fila].slice()
                    for(let j = 0; j<len; j++){
                        copia[j] = copia[j]*pivot2*-1
                        
                        list[i][j] = list[i][j] + copia[j]
                    }
                }
            }
            count++
            const temp = varba[fila-1][0]
            varba[fila-1][0] = nombre[col]
            nombre[col] = temp
        }
        cell_ref = XLSX.utils.encode_cell({ c: 2, r: count*list.length+3*count });
        XLSX.utils.sheet_add_aoa(ws, [nombre], { origin: cell_ref });
        cell_ref = XLSX.utils.encode_cell({ c: 1, r: count*list.length+3*count+2 });
        XLSX.utils.sheet_add_aoa(ws, varba, { origin: cell_ref });
        cell_ref = XLSX.utils.encode_cell({ c: 2, r: count*list.length+3*count+1 }); 
        XLSX.utils.sheet_add_aoa(ws, list, { origin: cell_ref });

        const wb = { Sheets: { 'Ficha de Medición': ws }, SheetNames: ['Ficha de Medición'] };       
        let excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
        const data = new Blob([this.s2ab(excelBuffer)], {type: fileType});
        saveAs(data, fileName + fileExtension);
    }

    render() {
        return (
            <div>
                <CInputFile onChange={this.onUploadList}>
                </CInputFile>

                <CButton block size="m" className = "m-auto" color="primary" onClick={this.onCargar}>Cargar</CButton>
                <CButton block size="m" className = "m-auto" color="primary" onClick={this.exportar}>descargar</CButton>
            </div>
        )
    }
}
