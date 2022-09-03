import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import * as RiIcons from "react-icons/ri";


export const TablaUsuarios = () => {
    const [usuarios, setUsuarios] = useState( [] )
    const [open, setOpen] = useState(false);
    const [openAgregar, setopenAgregar] = useState(false);

    const [data, setData] = useState([]);
    const [id, setId] = useState();
    const [nivel_idEditado, setnivel_idEditado] = useState();
    const [passwordEditado, setpasswordEditado] = useState();
    const [usuarioEditado, setusuarioEditado] = useState();



    const clickOpen = (item) =>{
        setOpen(true);
        setData(item);
        setId(item[0]);
        setnivel_idEditado(item[4]);
        setpasswordEditado(item[3]);
        setusuarioEditado(item[2]);
    }

    const clickOpenAgregar = (item) =>{
        setnivel_idEditado("");
        setpasswordEditado("");
        setusuarioEditado("");
        setopenAgregar(true);
    }

    const clickEditar = async() =>{
        setnivel_idEditado(data[1]);
        setpasswordEditado(data[3]);
        setusuarioEditado(data[2]);
        const body = {
            id: id,
            nivel_id: nivel_idEditado,
            password: passwordEditado,
            usuario: usuarioEditado
        };
        await axios.post("/rutas/usuarios_editar", body);
        getData();
        clickClose();
    }

    const clickAgregar = async() =>{
        setnivel_idEditado(data[1]);
        setpasswordEditado(data[3]);
        setusuarioEditado(data[2]);
        const body = {
            nivel_id: nivel_idEditado,
            password: passwordEditado,
            usuario: usuarioEditado
        };
        await axios.post("/rutas/usuarios_agregar", body);
        getData();
        clickCloseAgregar();
    }

    const clickClose = () =>{
        setOpen(false);
        setnivel_idEditado("");
        setpasswordEditado("");
        setusuarioEditado("");
    }

    const clickCloseAgregar = () =>{
        setopenAgregar(false);
        setnivel_idEditado("");
        setpasswordEditado("");
        setusuarioEditado("");
    }

    const getData = async() => {
        await axios.get("/rutas/usuarios").then((response) => {
            const data = response.data
            setUsuarios(data)
        })
    }

    const deleteData = async(item) => {
        const body = {
            id: item
        };
        await axios.post("/rutas/usuarios_borrar", body);
        getData();
    }

    useEffect( ()=> {
        getData()
    }, [])

    const columnas = [
        {
            name: "usuario_id",
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
            name: "usuario",
            label: "Usuario",
            options: {
                filter: false
            }
        },
        {
            name: "password",
            label: "Password",
            options: {
                filter: false
            }
        },
        {
            name: "nivel_id",
            label: "ID",
            options: {
                display: "excluded",
                filter: false
            }
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
        },
    ]

    const options = {
        selectableRows: false,
        tableBodyMaxHeight: '500px',
        
        // <button>preuba</button>
    }


            return (
                <div>
                    <MUIDataTable
                    title= {"Usuarios"}
                    data = {usuarios}
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
                                Ingrese del nuevo usuario
                            </DialogContentText>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel variant="standard" id="Nivel">
                                    Nivel
                                </InputLabel>
                                <Select
                                    labelId="Nivel"
                                    id="nivel_select"
                                    label="Age"
                                    onChange={(a) => setnivel_idEditado(a.target.value)}
                                >
                                    <MenuItem value={1}>Administrador</MenuItem>
                                    <MenuItem value={2}>Gerente</MenuItem>
                                    <MenuItem value={3}>Almacenista</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="usuario"
                                label="Usuario"
                                fullWidth
                                variant="standard"
                                onChange={(b) => setusuarioEditado(b.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="password"
                                label="Password"
                                fullWidth
                                variant="standard"
                                onChange={(c) => setpasswordEditado(c.target.value)}
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
                            <FormControl variant="standard" fullWidth>
                                <InputLabel variant="standard" id="Nivel">
                                    Nivel
                                </InputLabel>
                                <Select
                                    labelId="Nivel"
                                    id="nivel_select"
                                    defaultValue={data[4]}
                                    label="Age"
                                    onChange={(a) => setnivel_idEditado(a.target.value)}
                                >
                                    <MenuItem value={1}>Administrador</MenuItem>
                                    <MenuItem value={2}>Gerente</MenuItem>
                                    <MenuItem value={3}>Almacenista</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="usuario"
                                label="Usuario"
                                defaultValue = {data[2]}
                                fullWidth
                                variant="standard"
                                onChange={(b) => setusuarioEditado(b.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="password"
                                label="Password"
                                defaultValue = {data[3]}
                                fullWidth
                                variant="standard"
                                onChange={(c) => setpasswordEditado(c.target.value)}
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