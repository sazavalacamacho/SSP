import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
// import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
// import * as RIcons from "react-icons/ri";

export const TablaNiveles = () => {
    const [niveles, setNiveles] = useState( [] )


    const getData = async() => {
        await axios.get("/rutas/niveles").then((response) => {
            const data = response.data
            setNiveles(data)
        })
    }

    useEffect( ()=> {
        getData()
    }, [])

    const columnas = [
        {
            name: "nivel_id",
            label: "ID",
            options: {
                display: "excluded",
                filter: false
            }
        },
        {
            name: "nivel",
            label: "Nivel"
        },
        {
            name: "descripcion",
            label: "Descripcion"
        },
        
    ]



    const options = {
        selectableRows: false,
        tableBodyMaxHeight: '500px',
    }


            return (
                <div>
                    <MUIDataTable
                    title= {"Niveles"}
                    data = {niveles}
                    columns = {columnas}
                    options = {options}
                    />
                </div>
            )
}