import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Select, MenuItem, InputLabel, autocompleteClasses} from "@mui/material";
// import * as HiIcons from "react-icons/hi";
// import * as RiIcons from "react-icons/ri";
import "./inicio.css"
import { margin } from "@mui/system";
import { FaCentercode } from "react-icons/fa";


export const TablaInicio = () => {
    const [compras, setCompras] = useState( [] );
    const [productos, setProductos] = useState( [] );
    const [usuarios, setUsuarios] = useState( [] );
    const [data, setData] = useState([]);
    const [producto_idEditado, setproducto_idEditado] = useState();
    const [usuario_idEditado, setusuario_idEditado] = useState();
    const [cantidadEditado, setcantidadEditado] = useState();
    const [proveedorEditado, setproveedorEditado] = useState();
    const [openAgregar, setopenAgregar] = useState(false);



    const getDataUsuarios = async() => {
        await axios.get("/rutas/usuarios").then((response) => {
            const data = response.data
            setUsuarios(data)
        })
    }



    const getData = async() => {
        await axios.get("/rutas/usuarios").then((response) => {
            const data = response.data
            setUsuarios(data)
        })
    }


    useEffect( ()=> {
        getData();
        getDataUsuarios();
    }, [])




    return (
        
        <div>
            <h2 >Inicio de sesion</h2>
     
            <FormControl variant="standard"  fullWidth>
                <InputLabel variant="standard" id="usuarios">
                    Usuarios
                </InputLabel>
                <Select
                    labelId="usuarios"
                    id="usuario_select"
                    onChange={(b) => setUsuarios(b.target.value)}
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
            <Button>
                Inicio de Sesion
            </Button>
        </div>
    )
}
