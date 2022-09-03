import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
// import * as HiIcons from "react-icons/hi";
import * as RiIcons from "react-icons/ri";


export const TablaProductos = () => {
    const [productos, setProductos] = useState( [] )
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [id, setId] = useState();
    const [nombreEditado, setNombreEditado] = useState();
    const [descripcionEditado, setDescripcionEditado] = useState();
    const [p_ventaEditado, setp_ventaEditado] = useState();
    const [p_compraEditado, setp_compraEditado] = useState();
    const [fechaEditado, setfechaEditado] = useState();
    const [cantidadEditado, setcantidadEditado] = useState();
    const [activoEditado, setactivoEditado] = useState();

    const [openAgregar, setopenAgregar] = useState(false);




    const clickOpen = (item) =>{
        setOpen(true);
        setData(item);
        setId(item[0]);
        setNombreEditado(item[1]);
        setDescripcionEditado(item[2]);
        setp_ventaEditado(item[3]);
        setp_compraEditado(item[4]);
        setfechaEditado(item[5]);
        setcantidadEditado(item[6]);
        setactivoEditado(item[7]);
    }

    const clickOpenAgregar = (item) =>{
        setopenAgregar(true);
        setData(item);
        setId(item[0]);
        setNombreEditado(item[1]);
        setDescripcionEditado(item[2]);
        setp_ventaEditado(item[3]);
        setp_compraEditado(item[4]);
        setfechaEditado(item[5]);
        setcantidadEditado(item[6]);
        setactivoEditado(item[7]);

    }

    const clickEditar = async() =>{
        setNombreEditado(data[1]);
        setDescripcionEditado(data[2]);
        setp_ventaEditado(data[3]);
        setp_compraEditado(data[4]);
        setfechaEditado(data[5]);
        setcantidadEditado(data[6]);
        setactivoEditado(data[7]);
        const body = {
            id: id,
            nombre: nombreEditado,
            descripcion: descripcionEditado,
            p_venta: p_ventaEditado,
            p_compra: p_compraEditado,
            fecha: fechaEditado,
            cantidad: cantidadEditado,
            activo: activoEditado
        };
        await axios.post("/rutas/productos_editar", body);
        getData();
        clickClose();
    }

    const clickAgregar = async() =>{
        setNombreEditado(data[1]);
        setDescripcionEditado(data[2]);
        setp_ventaEditado(data[3]);
        setp_compraEditado(data[4]);
        setfechaEditado(data[5]);
        setcantidadEditado(data[6]);
        setactivoEditado(data[7]);
        const body = {
            id: id,
            nombre: nombreEditado,
            descripcion: descripcionEditado,
            p_venta: p_ventaEditado,
            p_compra: p_compraEditado,
            fecha: fechaEditado,
            cantidad: cantidadEditado,
            activo: activoEditado
        };
        await axios.post("/rutas/productos_agregar", body);
        getData();
        clickCloseAgregar();
    }


    const clickClose = () =>{
        setOpen(false);
        setNombreEditado("");
        setDescripcionEditado("");
        setp_ventaEditado("");
        setp_compraEditado("");
        setfechaEditado("");
        setactivoEditado("");
    }

    const clickCloseAgregar = () =>{
        setopenAgregar(false);
        setNombreEditado("");
        setDescripcionEditado("");
        setp_ventaEditado("");
        setp_compraEditado("");
        setfechaEditado("");
        setactivoEditado("");
    }

    const getData = async() => {
        await axios.get("/rutas/productos").then((response) => {
            const data = response.data
            setProductos(data)
        })
    }

    const deleteData = async(item) => {
        const body = {
            id: item
        };
        await axios.post("/rutas/productos_borrar", body);
        getData();
    }

    useEffect( ()=> {
        getData()
    }, [])

    const columnas = [
        {
            name: "producto_id",
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
            name: "p_venta",
            label: "Precio de venta"
        },
        {
            name: "p_compra",
            label: "Precio de compra"
        },
        {
            name: "fecha",
            label: "Fecha"
        },
        {
            name: "cantidad",
            label: "Cantidad"
        },
        {
            name: "activo",
            label: "Activo"
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
                    title= {"Productos"}
                    data = {productos}
                    columns = {columnas}
                    options = {options}
                    />
                    <Button onClick={clickOpenAgregar}>
                        Agregar
                    </Button>
              
                    <Dialog open={openAgregar} onClose={clickCloseAgregar}>
                        <DialogTitle>
                            Agregar
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Ingrese los datos del nuevo Producto
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
                                onChange={(b) => setDescripcionEditado(b.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="p_venta"
                                label="Precio de Venta"
                                fullWidth
                                variant="standard"
                                onChange={(c) => setp_ventaEditado(c.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="p_compra"
                                label="Precio de Compra"
                                fullWidth
                                variant="standard"
                                onChange={(d) => setp_compraEditado(d.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="cantidad"
                                label="Cantidad"
                                fullWidth
                                variant="standard"
                                onChange={(f) => setcantidadEditado(f.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="activo"
                                label="Activo"
                                fullWidth
                                variant="standard"
                                onChange={(g) => setactivoEditado(g.target.value)}
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
                                onChange={(b) => setDescripcionEditado(b.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="p_venta"
                                label="Precio de Venta"
                                defaultValue = {data[3]}
                                fullWidth
                                variant="standard"
                                onChange={(c) => setp_ventaEditado(c.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="p_compra"
                                label="Precio de Compra"
                                defaultValue = {data[4]}
                                fullWidth
                                variant="standard"
                                onChange={(d) => setp_compraEditado(d.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="cantidad"
                                label="Cantidad"
                                defaultValue = {data[6]}
                                fullWidth
                                variant="standard"
                                onChange={(f) => setcantidadEditado(f.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="activo"
                                label="Activo"
                                defaultValue = {data[7]}
                                fullWidth
                                variant="standard"
                                onChange={(g) => setactivoEditado(g.target.value)}
                            />
                        
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={clickClose}>
                                Cancelar
                            </Button>
                            <Button onClick={() => clickEditar()}>
                                Actualilzar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )
}