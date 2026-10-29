import { React, useState, useEffect } from "react";
import Container from '@mui/material/Container';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import { FormControl } from "@mui/material";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PasswordIcon from '@mui/icons-material/Password';
import BadgeIcon from '@mui/icons-material/Badge';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HeadphonesBatteryIcon from '@mui/icons-material/HeadphonesBattery';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AndroidIcon from '@mui/icons-material/Android';
import SettingsIcon from '@mui/icons-material/Settings';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Swal from 'sweetalert2';
import ReviewsIcon from '@mui/icons-material/Reviews';
import TextField from '@mui/material/TextField';
import toast, { Toaster } from 'react-hot-toast';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import '../style/vntregistro.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#003f5c',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },

    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const styleM = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 735,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    backgroundColor: '#ffe9c0',
    p: 4,
};

const styleR = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    backgroundColor: '#042940',
    p: 4,
};

const styleE = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    backgroundColor: '#ffe9c0',
    p: 4,
    color: 'white'
};

function Ventanaregistro() {

    const url_datosUsuario = 'http://localhost:3200/usuarios';
    const [datosUsuario, setDatosUsuario] = useState([]);
    const [datosOriginales, setDatosOriginales] = useState([]);

    const apiDatos = async () => {
        const response = await fetch(url_datosUsuario);
        const data_response = await response.json();

        if (data_response.success)
            setDatosUsuario(data_response.data);
        setDatosOriginales(data_response.data);
        console.log(data_response);
    }

    useEffect(() => { apiDatos() }, []);

    const [openNuevo, setOpenNuevo] = useState(false);
    const [openEditar, setOpenEditar] = useState(false);
    const [openConfig, setOpenConfig] = useState(false);
    const [openEliminar, setOpenEliminar] = useState(false);
    const [openComentario, setOpenComentario] = useState(false);
    const [seleccionarDato, setSeleccionarDato] = useState({ ID_USER: 0, USUARIO: "", PASWORD: "", CEDULA: "", NOMBRE: "", CORREO: "", WHATSAPP: "", MARCA_TELEFONO: "" });
    const [seleccionarConfig, setSeleccionarConfig] = useState({ ID_USER: 0, REQUERIMIENTO: "", ACCESORIOS: "", ESTADO_EQUIPO: "", PAGO: "", COMENTARIO: "" });


    const openModal = (datos, tipo) => {
        setSeleccionarDato(datos);
        setSeleccionarConfig(datos);
        (tipo === 'Insertar') && setOpenNuevo(true);
        (tipo === 'Editar') && setOpenEditar(true);
        (tipo === 'Config') && setOpenConfig(true);
        (tipo === 'Eliminar') && setOpenEliminar(true);
        (tipo === 'Comentario') && setOpenComentario(true);
    };

    const [usuario, setUsuario] = useState('');
    const [contra, setContra] = useState('');
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [marca, setMarca] = useState('');
    const [buscar, setBuscar] = useState('');


    const crearCliente = async () => {

        try {
            const response = await fetch('http://localhost:3200/crearCliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    USUARIO: usuario,
                    PASWORD: contra,
                    CEDULA: cedula,
                    NOMBRE: nombre,
                    CORREO: email,
                    WHATSAPP: whatsapp,
                    MARCA_TELEFONO: marca
                })
            });

            const data = await response.json();
            if (response.ok) {

                Swal.fire({
                    icon: "success",
                    title: "Perfecto",
                    text: "Cliente Creado!",
                    footer: 'Credenciales enviadas por correo y whatsapp'
                });
            }
            else if (response.status === 404) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Algo salio mal!",
                    footer: 'Vuelve a Revisar'
                });

            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Sin sistemas!",
                footer: 'Vuelve a Revisar'
            });
        }
    };

    const handleCrearSubmit = (event) => {
        event.preventDefault();

        if (!usuario || !contra || !cedula || !nombre || !email || !whatsapp || !marca) {
            toast.error("Existen campos Vacios.")
            return;
        }
        crearCliente();
        setTimeout(() => {
            window.location.reload();
        }, 2000);
        setOpenNuevo(false);
    };

    const actualizarCliente = async () => {

        const id = seleccionarDato.ID_USER;

        try {
            const response = await fetch(`http://localhost:3200/actualizarCliente/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    USUARIO: seleccionarDato.USUARIO,
                    PASWORD: seleccionarDato.PASWORD,
                    CEDULA: seleccionarDato.CEDULA,
                    NOMBRE: seleccionarDato.NOMBRE,
                    CORREO: seleccionarDato.CORREO,
                    WHATSAPP: seleccionarDato.WHATSAPP,
                    MARCA_TELEFONO: seleccionarDato.MARCA_TELEFONO
                })
            });

            const data = await response.json();
            if (response.ok) {

                Swal.fire({
                    icon: "success",
                    title: "Perfecto",
                    text: "Cliente Actualizado!",
                    footer: 'Espere a actualizar'
                });
            }
            else if (response.status === 404) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Algo salio mal!",
                    footer: 'Vuelve a Revisar'
                });

            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo salio mal!",
                footer: 'Vuelve a Revisar'
            });
        }
    };

    const handleEditarSubmit = (event) => {
        event.preventDefault();
        actualizarCliente();
        setTimeout(() => {
            window.location.reload();
        }, 2000);
        setOpenEditar(false);
    };

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setSeleccionarDato((prevState) => (
            { ...prevState, [name]: value }
        ))

    }

    const actualizarMantenimiento = async () => {

        const id = seleccionarConfig.ID_USER;

        try {
            const response = await fetch(`http://localhost:3200/actualizarMantenimiento/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    REQUERIMIENTO: seleccionarConfig.REQUERIMIENTO,
                    ACCESORIOS: seleccionarConfig.ACCESORIOS,
                    ESTADO_EQUIPO: seleccionarConfig.ESTADO_EQUIPO,
                    PAGO: seleccionarConfig.PAGO,
                })
            });

            const data = await response.json();
            if (response.ok) {

                Swal.fire({
                    icon: "success",
                    title: "Perfecto",
                    text: "Mantenimiento Registrado!",
                    footer: 'Espere a actualizar'
                });
            }
            else if (response.status === 404) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Algo salio mal!",
                    footer: 'Vuelve a Revisar'
                });

            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo salio mal!",
                footer: 'Vuelve a Revisar'
            });
        }
    };

    const handleConfigSubmit = (event) => {
        event.preventDefault();
        actualizarMantenimiento();
        setTimeout(() => {
            window.location.reload();
        }, 2000);
        setOpenConfig(false);
    };

    const handleChangeConfiInput = e => {
        const { name, value } = e.target;
        setSeleccionarConfig((prevState) => (
            { ...prevState, [name]: value }
        ))
    }



    const eliminarCliente = async () => {

        const id = seleccionarDato.ID_USER;

        try {
            const response = await fetch(`http://localhost:3200/eliminarCliente/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "¡Cliente Eliminado!",
                    text: "El cliente ha sido eliminado exitosamente."
                });
            } else if (response.status === 404) {
                Swal.fire({
                    icon: "error",
                    title: "¡Oops!",
                    text: "Algo salió mal. Cliente no encontrado."
                });
            }
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
            Swal.fire({
                icon: "error",
                title: "¡Oops!",
                text: "Algo salió mal. Por favor, vuelve a intentarlo."
            });
        }
    };

    const handleEliminarSubmit = (event) => {
        event.preventDefault();
        eliminarCliente();
        setTimeout(() => {
            window.location.reload();
        }, 2000);
        setOpenEliminar(false);

    };

    const handleSearchChange = (e) => {

        const valor = e.target.value.toLowerCase();
        setBuscar(valor);

        if (valor === '') {
            setDatosUsuario(datosOriginales);
        } else {
            const filtroDatos = datosOriginales.filter(nombreCliente =>
                nombreCliente.NOMBRE.toLowerCase().includes(valor)
            );
            setDatosUsuario(filtroDatos);
        }
    };

    return (
        <div className="cuerpo-registro">
            <Container>
                <Box >
                    <div className="contenido-cabecera">
                        <br />
                        <br />
                        <div className="icono-salir">
                            <a href="/"><LogoutIcon sx={{ fontSize: 35, color: '#ffa600' }} /></a>
                        </div>
                        <div className="name-logo">
                            <h1>Device Doctor</h1>
                        </div>
                    </div>
                    <div className="contenido-subtitulo">
                        <br />
                        <br />
                        <div className="titulo-cliente">
                            <h1>Registro Cliente</h1>
                        </div>
                        <br />
                        <div className="boton-nuevo">
                            <Button className="btn-nuevo"
                                variant="contained"
                                color="success"
                                onClick={() => openModal('', 'Insertar')}
                                endIcon={<CreateNewFolderIcon />}>
                                New
                            </Button>
                        </div>
                        <div className="busqued-new">
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                <PersonSearchIcon className="icono" style={{ fontSize: 40, color: '#ffa600', marginRight: '8px' }} />
                                <TextField id="nombreusuario" label="Busqueda" variant="filled"
                                    value={buscar}
                                    onChange={handleSearchChange}
                                    sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                            </Box>
                        </div>
                    </div>
                    <div className="contenido-tabla">
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">ID</StyledTableCell>
                                        <StyledTableCell align="center">Usuario</StyledTableCell>
                                        <StyledTableCell align="center">Cedula</StyledTableCell>
                                        <StyledTableCell align="center">Nombre</StyledTableCell>
                                        <StyledTableCell align="center">Modelo Tel.</StyledTableCell>
                                        <StyledTableCell align="center">Whatsapp</StyledTableCell>
                                        <StyledTableCell align="center">Correo</StyledTableCell>
                                        <StyledTableCell align="center">Acciones</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        datosUsuario.map((dato, key) => {
                                            return <StyledTableRow key={dato.ID_USER}>
                                                <StyledTableCell align="center">{dato.ID_USER}</StyledTableCell>
                                                <StyledTableCell align="center">{dato.USUARIO}</StyledTableCell>
                                                <StyledTableCell align="center">{dato.CEDULA}</StyledTableCell>
                                                <StyledTableCell align="center">{dato.NOMBRE}</StyledTableCell>
                                                <StyledTableCell align="center">{dato.MARCA_TELEFONO}</StyledTableCell>
                                                <StyledTableCell align="center">{dato.WHATSAPP}</StyledTableCell>
                                                <StyledTableCell align="center">{dato.CORREO}</StyledTableCell>
                                                <StyledTableCell style={{ display: 'none' }}>{dato.REQUERIMIENTO}</StyledTableCell>
                                                <StyledTableCell style={{ display: 'none' }}>{dato.ACCESORIOS}</StyledTableCell>
                                                <StyledTableCell style={{ display: 'none' }}>{dato.ESTADO_EQUIPO}</StyledTableCell>
                                                <StyledTableCell style={{ display: 'none' }}>{dato.PAGO}</StyledTableCell>
                                                <StyledTableCell style={{ display: 'none' }}>{dato.COMENTARIO}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <div className="btn-acciones">
                                                        <Button
                                                            onClick={() => openModal(dato, 'Editar')}> <EditIcon></EditIcon>
                                                        </Button>
                                                        <Button
                                                            onClick={() => openModal(dato, 'Eliminar')} ><DeleteForeverIcon></DeleteForeverIcon>
                                                        </Button>
                                                        <Button
                                                            onClick={() => openModal(dato, 'Config')}> <SettingsIcon></SettingsIcon>
                                                        </Button>
                                                        <Button
                                                            onClick={() => openModal(dato, 'Comentario')}><ReviewsIcon></ReviewsIcon>
                                                        </Button>
                                                    </div>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br />
                    </div>
                </Box>
            </Container>


            {/* Modal registro cliente */}

            <div className="modal-registroN">
                <Modal open={openNuevo}>
                    <Box sx={styleR}>
                        <div className="cabecera-registro">
                            <h2>Nuevo Cliente</h2>
                        </div>
                        <br />
                        <div className="formulario-nuevo">
                            <FormControl>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <AssignmentIndIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="usuario" label="Usuario" variant="filled" value={usuario}
                                        onChange={(e) => setUsuario(e.target.value)}
                                        sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <PasswordIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="contra" label="Contraseña" variant="filled" value={contra}
                                        onChange={(e) => setContra(e.target.value)}
                                        sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <BadgeIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="cedula" label="Cedula" variant="filled" value={cedula}
                                        onChange={(e) => {
                                            const re = /^[0-9\b]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setCedula(e.target.value)
                                            }
                                            else {
                                                toast.error("Solo numeros.")
                                            }
                                        }}
                                        sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <EmojiEmotionsIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="nombre" label="Nombre" variant="filled" value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2, }}>
                                    <AlternateEmailIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="email" label="Email" variant="filled" value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <WhatsAppIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="whatsapp" label="Whatsapp" variant="filled" value={whatsapp}
                                        onChange={(e) => {
                                            const re = /^[0-9\b]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setWhatsapp(e.target.value)
                                            }
                                            else {
                                                toast.error("Solo numeros.")
                                            }
                                        }}
                                        sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <PhoneAndroidIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="marca" label="Modelo Telefono" variant="filled" value={marca}
                                        onChange={(e) => setMarca(e.target.value)}
                                        sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                </Box>
                            </FormControl>
                            <br />
                            <br />
                        </div>
                        <div className="botones-formnuevo">
                            <Button className="btn-registrar" variant="contained" color="success" onClick={handleCrearSubmit}>
                                Ingresar
                            </Button>
                            <Button className="btn-cancelarRegistro" variant="contained" color="info"
                                onClick={() => setOpenNuevo(false)}>
                                Cancelar
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </div>

            {/* Final modal registro cliente */}


            {/* Modal editar cliente */}

            <div className="modal-editar">
                <Modal open={openEditar}>
                    <Box sx={styleR}>
                        <div className="cabecera-editar">
                            <h2>Editar Cliente</h2>
                        </div>
                        <br />
                        <div className="formulario-editar">
                            <FormControl>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <AndroidIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="id_usuario" label="ID" variant="filled" value={seleccionarDato && seleccionarDato.ID_USER} InputProps={{ readOnly: true }}
                                        sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <AssignmentIndIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="usuario" label="Usuario" variant="filled" value={seleccionarDato && seleccionarDato.USUARIO}
                                        name="USUARIO"
                                        onChange={handleChangeInput}
                                        sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <PasswordIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="contra" label="Contraseña" variant="filled" value={seleccionarDato && seleccionarDato.PASWORD}
                                        name="PASWORD"
                                        onChange={handleChangeInput}
                                        sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <BadgeIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="cedula" label="Cedula" variant="filled" value={seleccionarDato && seleccionarDato.CEDULA}
                                        name="CEDULA"
                                        onChange={handleChangeInput}
                                        sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <EmojiEmotionsIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="nombre" label="Nombre" variant="filled" value={seleccionarDato && seleccionarDato.NOMBRE}
                                        name="NOMBRE"
                                        onChange={handleChangeInput}
                                        sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <AlternateEmailIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="email" label="Email" variant="filled" value={seleccionarDato && seleccionarDato.CORREO}
                                        name="CORREO"
                                        onChange={handleChangeInput}
                                        sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <WhatsAppIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="whatsapp" label="Whatsapp" variant="filled" value={seleccionarDato && seleccionarDato.WHATSAPP}
                                        name="WHATSAPP"
                                        onChange={handleChangeInput}
                                        sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <PhoneAndroidIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="marca" label="Modelo Telefono" variant="filled" value={seleccionarDato && seleccionarDato.MARCA_TELEFONO}
                                        name="MARCA_TELEFONO"
                                        onChange={handleChangeInput}
                                        sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                </Box>
                            </FormControl>
                            <br />
                            <br />
                        </div>
                        <div className="botones-formnuevo">
                            <Button className="btn-registrar" variant="contained" color="success" onClick={handleEditarSubmit}>
                                Editar
                            </Button>
                            <Button className="btn-cancelarRegistro" variant="contained" color="info"
                                onClick={() => setOpenEditar(false)}>
                                Cancelar
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </div>

            {/* Final modal editar cliente */}

            {/* Modal registrar mantenimiento */}

            <div className="modal-config">
                <Modal open={openConfig}>
                    <Box sx={styleM}>
                        <div className="cabecera-config">
                            <h2>Mantenimiento</h2>
                        </div>
                        <br />
                        <div className="formulario-mant">
                            <FormControl>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <AndroidIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="id_usuario" label="ID" variant="filled" value={seleccionarDato && seleccionarDato.ID_USER} InputProps={{ readOnly: true }}
                                        sx={{ input: { color: 'black', width: '200px', height: '10px' } }} />
                                </Box>
                                <div className="lado-iz">
                                    <Box component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                                        }}
                                        noValidate
                                        autoComplete="off">
                                        <AppSettingsAltIcon className="icono" style={{ fontSize: 40, color: '#bc5090' }} />
                                        <TextField
                                            id="standard-multiline-static" label="Requerimiento" multiline={true}
                                            rows={3} variant="filled"
                                            value={seleccionarConfig && seleccionarConfig.REQUERIMIENTO}
                                            name="REQUERIMIENTO"
                                            onChange={handleChangeConfiInput}
                                            inputProps={{ style: { color: 'black', } }}
                                        />
                                    </Box>
                                    <Box component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                                        }}
                                        noValidate
                                        autoComplete="off">
                                        <HeadphonesBatteryIcon className="icono" style={{ fontSize: 40, color: '#bc5090' }} />
                                        <TextField
                                            id="standard-multiline-static" label="Accesorios" multiline={true}
                                            rows={3} variant="filled"
                                            value={seleccionarConfig && seleccionarConfig.ACCESORIOS}
                                            name="ACCESORIOS"
                                            onChange={handleChangeConfiInput}
                                            inputProps={{ style: { color: 'black' } }}
                                        />
                                    </Box>
                                </div>
                                <div className="lado-der">
                                    <Box component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                                        }}
                                        noValidate
                                        autoComplete="off">
                                        <EngineeringIcon className="icono" style={{ fontSize: 40, color: '#bc5090' }} />
                                        <TextField
                                            id="standard" label="Estado Equipo" multiline={true}
                                            rows={3} variant="filled"
                                            value={seleccionarConfig && seleccionarConfig.ESTADO_EQUIPO}
                                            name="ESTADO_EQUIPO"
                                            onChange={handleChangeConfiInput}
                                            inputProps={{ style: { color: 'black' } }}
                                        />
                                    </Box>
                                    <Box component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                                        }}
                                        noValidate
                                        autoComplete="off">
                                        <CreditCardIcon className="icono" style={{ fontSize: 40, color: '#bc5090' }} />
                                        <TextField
                                            id="standard-multiline-static" label="Informacion pago" multiline={true}
                                            rows={3} variant="filled"
                                            value={seleccionarConfig && seleccionarConfig.PAGO}
                                            name="PAGO"
                                            onChange={handleChangeConfiInput}
                                            inputProps={{ style: { color: 'black' } }}
                                        />
                                    </Box>
                                </div>
                            </FormControl>
                        </div>
                        <br />
                        <div className="botones-formconfig">
                            <Button className="btn-registrarconfig" variant="contained" color="success" onClick={handleConfigSubmit}>
                                Registrar
                            </Button>
                            <Button className="btn-cancelarconfig" variant="contained" color="info"
                                onClick={() => setOpenConfig(false)}>
                                Cancelar
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </div>

            {/* Final modal registrar mantenimiento */}



            {/* Modal Eliminar */}

            <Modal open={openEliminar}>
                <Box sx={styleE}>
                    <FormControl>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                            <HighlightOffIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                            <TextField id="usuario" label="Eliminar Usuario?" variant="filled" value={seleccionarDato && seleccionarDato.ID_USER} InputProps={{ readOnly: true }}
                                sx={{ input: { color: 'black', width: '200px', height: '10px' } }} />
                        </Box>
                    </FormControl>
                    <div className="botones-formnuevo">
                        <Button className="btn-registrar" variant="contained" color="success" onClick={handleEliminarSubmit}>
                            Si
                        </Button>
                        <Button className="btn-cancelarRegistro" variant="contained" color="info"
                            onClick={() => setOpenEliminar(false)}>
                            No
                        </Button>
                    </div>
                </Box>
            </Modal>

            {/* Final modal eliminar */}



            {/* Modal ver comentario */}

            <Modal open={openComentario}>
                <Box sx={styleE}>
                    <FormControl>
                        <Box component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off">
                            <ReviewsIcon className="icono" style={{ fontSize: 40, color: '#bc5090' }} />
                            <TextField
                                id="standard" label="Comentario" multiline={true} readOnly
                                rows={3} variant="filled"
                                value={seleccionarConfig && seleccionarConfig.COMENTARIO}
                                inputProps={{ style: { color: 'black' } }}
                            />
                        </Box>
                    </FormControl>
                    <div className="botones-formnuevo">
                        <Button className="btn-cancelarRegistro" variant="contained" color="info"
                            onClick={() => setOpenComentario(false)}>
                            Cerrar
                        </Button>
                    </div>
                </Box>
            </Modal>
            <Toaster />

            {/* Final modal ver comentario */}

        </div>
    );

}

export default Ventanaregistro;