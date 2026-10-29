import React from "react";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import LogoutIcon from '@mui/icons-material/Logout';
import AndroidIcon from '@mui/icons-material/Android';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import ConstructionIcon from '@mui/icons-material/Construction';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import PaymentIcon from '@mui/icons-material/Payment';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import logo1 from '../img/_19850dc1-c22c-4629-a862-f2e4853ec30e.jpg';
import "../style/vntinforme.css";




function Ventanainforme() {

    const { idUsuario, nombreUsuario, marcaTelUsuario, requerimientoUsuario, estadoEquipoUsuario, accesoriosUsuario, pagoUsuario } = useParams();

    const [comentario, setComentario] = useState('');

    const actualizarComentario = async () => {

        try {
            const response = await fetch(`http://localhost:3200/actualizarComentario/${idUsuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    COMENTARIO: comentario
                })
            });

            const data = await response.json();
            if (response.ok) {

                Swal.fire({
                    icon: "success",
                    title: "Perfecto",
                    text: "Comentario enviado!",
                    footer: 'Puede Seguir Revisando'
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

    const handleSubmit = (event) => {
        event.preventDefault();
        actualizarComentario();
        setTimeout(() => {
        }, 2000);

    };

    return (
        <div className="container-vtInfrorme">
            <Container >
                <Box sx={{ height: '100vh' }}>
                    <div className="header-vtInforme">
                        <h1>Device Doctor</h1>
                        <div className="icon-salir">
                            <Link href="/" className="icon-salir" ><LogoutIcon sx={{ fontSize: 40, color: '#2c4875' }} /></Link>
                        </div>
                        <div className="logo-cabecera">
                            <img src={logo1} alt="" width="400"></img>
                        </div>
                        <br />
                        <br />
                        <div className="nombre-marca">
                            <div className="icono-nombre">
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <AndroidIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="nombreusuario" label="Nombre Cliente" variant="filled" InputProps={{ readOnly: true }}
                                        value={nombreUsuario}
                                        sx={{ input: { color: 'black', width: '200px', height: '10px' } }} />
                                </Box>
                            </div>

                            <div className="icono-tel">
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <PhoneAndroidIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="marcatel" label="Marca Mobile" variant="filled" InputProps={{ readOnly: true }}
                                        value={marcaTelUsuario}
                                        sx={{ input: { color: 'black', width: '200px', height: '10px' } }} />
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className="header-sub">
                        <br />
                        <br />
                        <h2>Progreso de reparacion</h2>
                    </div>
                    <br />
                    <br />
                    <div className="container-datos">
                        <div className="datos-iz">
                            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                                noValidate autoComplete="off">
                                <AppSettingsAltIcon className="icono" style={{ fontSize: 40, color: '#bc5090' }} />
                                <TextField id="requerimiento" label="Requerimiento" multiline={true}
                                    rows={3} variant="filled" InputProps={{ readOnly: true }}
                                    value={requerimientoUsuario}
                                    inputProps={{ style: { color: 'black', textAlign: 'left'} }}
                                />
                            </Box>

                            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
                                noValidate autoComplete="off">
                                <ConstructionIcon className="icono" style={{ fontSize: 40, color: '#bc5090' }} />
                                <TextField id="estado" label="Estado Reparacion" multiline={true}
                                    rows={3} variant="filled" InputProps={{ readOnly: true }}
                                    value={estadoEquipoUsuario}
                                    inputProps={{ style: { color: 'black', } }}
                                />
                            </Box>

                            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
                                noValidate autoComplete="off">
                                <HeadsetMicIcon className="icono" style={{ fontSize: 40, color: '#bc5090' }} />
                                <TextField id="accesorios" label="Accesorios" multiline={true}
                                    rows={3} variant="filled" InputProps={{ readOnly: true }}
                                    value={accesoriosUsuario}
                                    inputProps={{ style: { color: 'black', } }}
                                />
                            </Box>
                        </div>

                        <div className="datos-der">
                            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
                                noValidate autoComplete="off">
                                <PaymentIcon className="icono" style={{ fontSize: 40, color: '#bc5090' }} />
                                <TextField id="pago" label="Informacion Pago" multiline={true}
                                    rows={3} variant="filled" InputProps={{ readOnly: true }}
                                    value={pagoUsuario}
                                    inputProps={{ style: { color: 'black', } }}
                                />
                            </Box>

                            <div className="comentario">
                                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
                                    noValidate autoComplete="off">
                                    <CommentIcon className="icono" style={{ fontSize: 40, color: '#bc5090' }} />
                                    <TextField
                                        id="standard-multiline-static" label="Comentario" multiline={true}
                                        rows={3} variant="filled"
                                        value={comentario} onChange={(e) => setComentario(e.target.value)}
                                        inputProps={{ style: { color: 'black', } }}
                                    />
                                    <Button className="enviarCom" variant="contained" onClick={handleSubmit}><SendIcon /></Button>
                                </Box>
                            </div>
                        </div>
                    </div>
                </Box>
            </Container>
        </div>
    );

}

export default Ventanainforme;