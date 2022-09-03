import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Select, MenuItem, InputLabel} from "@mui/material";
// import * as HiIcons from "react-icons/hi";
// import * as RiIcons from "react-icons/ri";


export const TablaCompras = () => {
    const [compras, setCompras] = useState( [] );
    const [productos, setProductos] = useState( [] );
    const [usuarios, setUsuarios] = useState( [] );
    const [data, setData] = useState([]);
    const [producto_idEditado, setproducto_idEditado] = useState();
    const [usuario_idEditado, setusuario_idEditado] = useState();
    const [cantidadEditado, setcantidadEditado] = useState();
    const [proveedorEditado, setproveedorEditado] = useState();
    const [openAgregar, setopenAgregar] = useState(false);

    const clickOpenAgregar = (item) =>{
        setopenAgregar(true);
        setData(item);
        setproducto_idEditado(item[1]);
        setusuario_idEditado(item[2]);
        setcantidadEditado(item[4]);
        setproveedorEditado(item[5]);
    }

    const getDataProducts = async() => {
        await axios.get("/rutas/compras_productos").then((response) => {
            const data = response.data
            setProductos(data)
        })
    }

    const getDataUsuarios = async() => {
        await axios.get("/rutas/compras_usuarios").then((response) => {
            const data = response.data
            setUsuarios(data)
        })
    }

    const clickAgregar = async() =>{
        setproducto_idEditado(data[1]);
        setusuario_idEditado(data[2]);
        setcantidadEditado(data[4]);
        setproveedorEditado(data[5]);
        const body = {
            producto: producto_idEditado,
            usuario: usuario_idEditado,
            cantidad: cantidadEditado,
            proveedor: proveedorEditado

        };
        await axios.post("/rutas/compras_agregar", body);
        getData();
        clickCloseAgregar();
    }

    const clickCloseAgregar = () =>{
        setopenAgregar(false);
        setproducto_idEditado("");
        setusuario_idEditado("");
        setcantidadEditado("");
        setproveedorEditado("");
    }

    const getData = async() => {
        await axios.get("/rutas/compras").then((response) => {
            const data = response.data
            setCompras(data)
        })
    }


    useEffect( ()=> {
        getData();
        getDataProducts();
        getDataUsuarios();
    }, [])

    const columnas = [
        {
            name: "compra_id",
            label: "ID",
            options: {
                display: "excluded",
                filter: false
            }
        },
        {
            name: "nombre",
            label: "Produto"
        },
        {
            name: "usuario",
            label: "Usuario"
        },
        {
            name: "fecha",
            label: "Fecha de compra"
        },
        {
            name: "cantidad",
            label: "Cantidad"
        },
        {
            name: "proveedor",
            label: "Proveedor"
        },
    ]



    const options = {
        selectableRows: false,
        tableBodyMaxHeight: '500px',
        
    }


            return (
                <div>
                    <MUIDataTable
                    title= {"Compras"}
                    data = {compras}
                    columns = {columnas}
                    options = {options}
                    />
                    <Button onClick={clickOpenAgregar} >
                        agregar
                    </Button>
              
                    <Dialog open={openAgregar} onClose={clickCloseAgregar}>
                        <DialogTitle>
                            Agregar
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Ingrese los datos de la nueva compra
                            </DialogContentText>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel variant="standard" id="productos">
                                    Productos
                                </InputLabel>
                                <Select
                                    labelId="productos"
                                    id="producto_select"
                                    onChange={(a) => setproducto_idEditado(a.target.value)}
                                >
                                    {productos.map((producto) => (
                                        <MenuItem
                                          value={producto.producto_id}
                                        >
                                            {producto.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel variant="standard" id="usuarios">
                                    Usuarios
                                </InputLabel>
                                <Select
                                    labelId="usuarios"
                                    id="usuario_select"
                                    onChange={(b) => setusuario_idEditado(b.target.value)}
                                >
                                    {usuarios.map((usuario) => (
                                        <MenuItem
                                          value={usuario.usuario_id}
                                        >
                                            {usuario.usuario}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="cantidad"
                                label="Cantidad"
                                fullWidth
                                variant="standard"
                                onChange={(b) => setcantidadEditado(b.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="proveedor"
                                label="Proveedor"
                                fullWidth
                                variant="standard"
                                onChange={(b) => setproveedorEditado(b.target.value)}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={clickCloseAgregar}>
                                Cancelar
                            </Button>
                            <Button onClick={clickAgregar}>
                                Agregar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )
}