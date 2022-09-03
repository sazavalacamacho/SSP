import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
// import * as HiIcons from "react-icons/hi";
import * as RiIcons from "react-icons/ri";


export const TablaCategorias = () => {
    const [categorias, setCategorias] = useState( [] )
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [id, setId] = useState();
    const [nombreEditado, setNombreEditado] = useState();
    const [descriEditado, setDescriEditado] = useState();

    const [openAgregar, setopenAgregar] = useState(false);


    const clickOpen = (item) =>{
        setOpen(true);
        setData(item);
        setId(item[0]);
        setNombreEditado(item[1]);
        setDescriEditado(item[2]);
    }

    const clickOpenAgregar = (item) =>{
        setopenAgregar(true);
        setId(item[0]);
        setNombreEditado("");
        setDescriEditado("");
    }

    const clickEditar = async() =>{
        setNombreEditado(data[1]);
        setDescriEditado(data[2]);
        const body = {
            id: id,
            nombre: nombreEditado,
            descripcion: descriEditado
        };
        await axios.post("/rutas/categorias_editar", body);
        getData();
        clickClose();
    }

    const clickAgregar = async() =>{
        setNombreEditado(data[1]);
        setDescriEditado(data[2]);
        const body = {
            nombre: nombreEditado,
            descripcion: descriEditado
        };
        await axios.post("/rutas/categorias_agregar", body);
        getData();
        clickCloseAgregar();
    }

    const clickClose = () =>{
        setOpen(false);
        setNombreEditado("");
        setDescriEditado("");
    }

    const clickCloseAgregar = () =>{
        setopenAgregar(false);
        setNombreEditado("");
        setDescriEditado("");
    }

    const getData = async() => {
        await axios.get("/rutas/categorias").then((response) => {
            const data = response.data
            setCategorias(data)
        })
    }

    const deleteData = async(item) => {
        const body = {
            id: item
        };
        await axios.post("/rutas/categorias_borrar", body);
        getData();
    }

    useEffect( ()=> {
        getData()
    }, [])

    const columnas = [
        {
            name: "categoria_id",
            label: "ID",
            options: {
                display: "excluded",
                filter: false
            }
        },
        {
            name: "nombre",
            label: "Nombre"
        },
        {
            name: "descripcion",
            label: "Descripcion"
        },
        
        {
            name: "borrar",
            label: "Borrar",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Button onClick={() => deleteData(tableMeta.rowData[0])}>
                             <RiIcons.RiDeleteBin6Line></RiIcons.RiDeleteBin6Line>
                        </Button>
                    )
                },
                filter: false,
                viewColumns: false
            }
        },
        {
            name: "editar",
            label: "Editar",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Button onClick={() => clickOpen(tableMeta.rowData)}>
                            <RiIcons.RiEditLine></RiIcons.RiEditLine>
                        </Button>
                    )
                },
                filter: false,
                viewColumns: false
            }
        }
        
    ]



    const options = {
        selectableRows: false,
        tableBodyMaxHeight: '500px',
        
        // <button>preuba</button>
    }


            return (
                <div>
                    <MUIDataTable
                    title= {"Categorias"}
                    data = {categorias}
                    columns = {columnas}
                    options = {options}
                    />
                    <Button onClick = {clickOpenAgregar}>
                        Agregar
                    </Button>

                    <Dialog open={openAgregar} onClose={clickCloseAgregar}>
                        <DialogTitle>
                            Agregar
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Ingrese los datos de la nueva categoria
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="nombre"
                                label="Nombre"
                                fullWidth
                                variant="standard"
                                onChange={(a) => setNombreEditado(a.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="descri"
                                label="Descripcion"
                                fullWidth
                                variant="standard"
                                onChange={(b) => setDescriEditado(b.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={clickCloseAgregar}>
                                Cancelar
                            </Button>
                            <Button onClick={() => clickAgregar()}>
                                Agregar
                            </Button>
                        </DialogActions>
                    </Dialog>

              
                    <Dialog open={open} onClose={clickClose}>
                        <DialogTitle>
                            Editar
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Ingrese los datos a editar
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="nombre"
                                label="Nombre"
                                defaultValue = {data[1]}
                                fullWidth
                                variant="standard"
                                onChange={(a) => setNombreEditado(a.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="descri"
                                label="Descripcion"
                                defaultValue = {data[2]}
                                fullWidth
                                variant="standard"
                                onChange={(b) => setDescriEditado(b.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={clickClose}>
                                Cancelar
                            </Button>
                            <Button onClick={() => clickEditar()}>
                                Actualizar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )
}