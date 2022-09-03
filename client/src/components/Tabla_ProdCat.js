import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
// import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
// import * as RIcons from "react-icons/ri";

export const TablaProdCat = () => {
    const [prodcat, setProdCat] = useState( [] )

    const getData = async() => {
        await axios.get("/rutas/prodcat").then((response) => {
            const data = response.data
            setProdCat(data)
        })
    }

    useEffect( ()=> {
        getData()
    }, [])

    const columnas = [
        {
            name: "nombre",
            label: "Producto"
        },
        {
            name: "cat",
            label: "Categorias",
        }
        
    ]



    const options = {
        selectableRows: false,
        tableBodyMaxHeight: '500px',
    }


            return (
                <div>
                    <MUIDataTable
                    title= {"ProdCat"}
                    data = {prodcat}
                    columns = {columnas}
                    options = {options}
                    />
                </div>
            )
}